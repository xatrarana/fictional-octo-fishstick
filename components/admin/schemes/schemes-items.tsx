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
import { BiSolidEditAlt, BiSolidTrashAlt } from "react-icons/bi";
import Image from "next/image";
import { ServiceSchema } from "@/schemas";

import * as z from "zod";
import { EnableIndicator } from "@/constant/active-indicator";
import { useRouter } from "next/navigation";
import { deleteService, GetServicesWithPagination } from "@/actions/service";

const ITEMS_PER_PAGE = 7;

const SchemesItems = ({categoryId}:{categoryId:string}) => {
  const {toast} = useToast()
  const [services, setServices] = React.useState<z.infer<typeof ServiceSchema>[] | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()


  const fetchGroups = async (page?: number, limit?: number,cid?:string) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("categoryId",categoryId)
      const res = await GetServicesWithPagination(page, limit,cid!);
      const { schems, pagination } = res;
      setServices(schems as z.infer<typeof ServiceSchema>[]);
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
    fetchGroups(currentPage, ITEMS_PER_PAGE,categoryId);
  }, [currentPage,router,categoryId]);



  const onClickDeleteService= async (id: string) => {
    try {
      const response = await deleteService(id)
      if(!!response.success){
        fetchGroups(currentPage, ITEMS_PER_PAGE);
        toast({
          title: 'Services Info',
          description: response.success,
          type: 'foreground'
        })
      }
    } catch (error) {
      
      if(error instanceof Error){
        toast({
          variant:"destructive",
          title: 'Services Error',
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
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services &&
          services.map((service, index) => (
            <TableRow key={service.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>
            {
              service.imageUrl && <Image src={service.imageUrl} alt="avatar" width={40} height={40} className="rounded-md"/>
            }
            {
              !service.imageUrl && <Image src="/image-not-found.jpg" alt="Image not found" width={40} height={40} className="rounded-md"/>
            }
            </TableCell>
            <TableCell >
            {
                    service.name
                }
            </TableCell>
         
         
             <TableCell className="text-center">
                <EnableIndicator isEnabled={service.status} />
            </TableCell>

           
              <TableCell className="text-right flex gap-x-5 justify-end">
                <Button variant={"outline"} onClick={() => router.push(`/admin/category/schemes/${categoryId}/edit/${service.id}`)}>
                    <BiSolidEditAlt/>
                </Button>
                <Button variant={"outline"} onClick={() => onClickDeleteService(service.id!)}>
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

export default SchemesItems;
