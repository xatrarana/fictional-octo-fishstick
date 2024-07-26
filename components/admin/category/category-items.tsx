"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import EditButton from "@/components/edit-button";
import { BiSolidEditAlt, BiSolidTrashAlt } from "react-icons/bi";
import Image from "next/image";
import { CategoryForm } from "./category-form";
import { CategorySchema } from "@/schemas";

import * as z from "zod";
import { deleteCategory, GetCategoriesWithPagination } from "@/actions/category";
import { EnableIndicator } from "@/constant/active-indicator";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ITEMS_PER_PAGE = 7;

const CategoryItems = () => {
  const {toast} = useToast()
  const [categories, setCategory] = React.useState<z.infer<typeof CategorySchema>[] | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()


  const fetchGroups = async (page?: number, limit?: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await GetCategoriesWithPagination(page, limit);
      const { categories, pagination } = res;
      setCategory(categories as z.infer<typeof CategorySchema>[]);
      if(pagination){
      setTotalPages(pagination.totalPages);
      setCurrentPage(pagination.page);}
    } catch (err) {
      setError('Failed to fetch data.');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchGroups(currentPage, ITEMS_PER_PAGE);
  }, [currentPage]);



  const onClickDeleteCategory= async (id: string) => {
    try {
      const response = await deleteCategory(id)
      if(!!response.success){
        fetchGroups(currentPage, ITEMS_PER_PAGE);
        toast({
          title: 'Category Info',
          description: response.success,
          type: 'foreground'
        })
      }

      if(!!response.error){
        toast({
          variant:"destructive",
          title: 'Category Error',
          description: response.error,
          type: 'foreground'
        })
      }
    } catch (error) {
      
      if(error instanceof Error){
        toast({
          variant:"destructive",
          title: 'Org Members Error',
          description: error.message,
          type: 'foreground'
        })
      }
    }
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
   <div>
     <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">SN</TableHead>
          <TableHead></TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="text-center">Schemes</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories &&
          categories.map((category, index) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>
            {
              category.categoryImageUrl && <Image src={category.categoryImageUrl} alt="avatar" width={40} height={40} className="rounded-md"/>
            }
            {
              !category.categoryImageUrl && <Image src="/image-not-found.jpg" alt="Image not Found" width={40} height={40} className="rounded-md"/>
            }
            </TableCell>
            <TableCell >
            {
                    category.name
                }
            </TableCell>
            <TableCell className="text-center">
            {
                <Link className="underline text-blue-600" href={`/admin/category/schemes/${category.id}`}>Go To </Link>
                }
            </TableCell>
         
             <TableCell className="text-center">
                <EnableIndicator isEnabled={category.status} />
            </TableCell>

           
              <TableCell className="text-right flex gap-x-5 justify-end">
                <Button variant={"outline"} onClick={() => router.push(`/admin/category/edit/${category.id}?edit=true`)}>
                    <BiSolidEditAlt/>
                </Button>
                <Button variant={"outline"} onClick={() => onClickDeleteCategory(category.id!)}>
                    <BiSolidTrashAlt/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
   
    </Table>
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(index + 1);
                }}
                className={index + 1 === currentPage ? 'active' : ''}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {totalPages > 5 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      </div>
   </div>
  );
};

export default CategoryItems;
