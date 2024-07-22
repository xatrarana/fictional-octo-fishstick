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


import instance from "@/lib/axios";
import {  FlashNews } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { DeleteFlashNews } from "@/actions/flash-news";
import { TruncateWords } from "@/constant/truncate-component";
import EditButton from "@/components/edit-button";
import { FlashForm } from "./flash-form";
import { BiSolidTrashAlt } from "react-icons/bi";
import { EnableIndicator } from "@/constant/active-indicator";

const ITEMS_PER_PAGE = 5;

const FlashItems = () => {
  const {toast} = useToast()
  const [flashNews, setFlashNews] = React.useState<FlashNews[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const fetchSliders = async (page?: number, limit?: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await instance.get(`/api/flash-news?page=${page}&limit=${limit}`);
      const { flashNews, pagination } = res.data;
      setFlashNews(flashNews);
      setTotalPages(pagination.totalPages);
    } catch (err) {
      setError('Failed to fetch data.');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchSliders(currentPage, ITEMS_PER_PAGE);
  }, [currentPage]);



  const onClickDeleteBanner = async (id: number) => {
    try {
      const response = await DeleteFlashNews(id)
      if(!!response.success){
        fetchSliders(currentPage, ITEMS_PER_PAGE);
        toast({
          title: 'FlashNews Info',
          description: response.success,
          type: 'foreground'
        })
      }
    } catch (error) {
      
      if(error instanceof Error){
        toast({
          variant:"destructive",
          title: 'FlashNews Error',
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
          <TableHead>Message</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {flashNews &&
          flashNews.map((news, index) => (
            <TableRow key={news.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>

              <TableCell>
                <TruncateWords text={news.message} maxWords={10} />
              </TableCell>

              <TableCell>
                <EnableIndicator isEnabled={true}/>
              </TableCell>
              <TableCell className="text-right flex gap-x-5 justify-end">
                <EditButton descriptionText="update the item here." headerText="Update Flash News" >
                   <FlashForm editData={news}  edit/>
                </EditButton>
                <Button variant={"outline"} onClick={() => onClickDeleteBanner(news.id)}>
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

export default FlashItems;
