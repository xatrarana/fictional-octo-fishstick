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
import { CategorySchema, noticeSchema } from "@/schemas";

import * as z from "zod";
import { EnableIndicator } from "@/constant/active-indicator";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { deleteNotice, GetNoticesWithPagination } from "@/actions/notice";

const ITEMS_PER_PAGE = 7;

const NoticeItems = () => {
  const {toast} = useToast()
  const [notices, setNotices] = React.useState<z.infer<typeof noticeSchema>[] | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()


  const fetchGroups = async (page?: number, limit?: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await GetNoticesWithPagination(page, limit);
      const { notices, pagination } = res;
      setNotices(notices as z.infer<typeof noticeSchema>[]);
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



  const onClickDeleteNotice= async (id: string) => {
    try {
      const response = await deleteNotice(id)
      if(!!response.success){
        fetchGroups(currentPage, ITEMS_PER_PAGE);
        toast({
          title: 'Notice Info',
          description: response.success,
          type: 'foreground'
        })
      }

      if(!!response.error){
        toast({
          variant:"destructive",
          title: 'Notice Error',
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
          <TableHead>Title</TableHead>
          <TableHead className="text-center">Url</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notices &&
          notices.map((notice, index) => (
            <TableRow key={notice.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
          
            <TableCell >
            {
                    notice.title                }
            </TableCell>
            <TableCell className="text-center">
            {
                <Link className="underline text-blue-600" href={notice.fileUrl as string}>Go To </Link>
                }
            </TableCell>
         
             <TableCell className="text-center">
                <EnableIndicator isEnabled={notice.status} />
            </TableCell>

           
              <TableCell className="text-right flex gap-x-5 justify-end">
                <Button variant={"outline"} onClick={() => router.push(`/admin/notice/edit/${notice.id}?edit=true`)}>
                    <BiSolidEditAlt/>
                </Button>
                <Button variant={"outline"} onClick={() => onClickDeleteNotice(notice.id!)}>
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

export default NoticeItems;
