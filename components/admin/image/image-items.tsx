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
import { BiSolidTrashAlt } from "react-icons/bi";

import { IImage, Message } from "@/type";
import { deleteImage, GetImagesWithPagination } from "@/actions/image";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Image from "next/image";

const ITEMS_PER_PAGE = 5;

const ImageItems = () => {
  const {toast} = useToast()
  const [images, setImages] = React.useState<IImage[] | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const fetchGroups = async (page?: number, limit?: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await GetImagesWithPagination(page, limit);
      const { Images, pagination } = res;
        setImages(Images as IImage[]);
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



  const onClickDeleteMessage= async (id: string) => {
    try {
      const response = await deleteImage(id)
      if(!!response.success){
        fetchGroups(currentPage, ITEMS_PER_PAGE);
        toast({
          title: 'Message Info',
          description: response.success,
          type: 'foreground'
        })
      }

      if(!!response.error){
        toast({
          variant:"destructive",
          title: 'Message Error',
          description: response.error,
          type: 'foreground'
        })
      }
    } catch (error) {
      
      if(error instanceof Error){
        toast({
          variant:"destructive",
          title: 'Message Error',
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
          <TableHead className="text-center">Caption</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {images &&
          images.map((image, index) => (
            <TableRow key={image.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
          
              <TableCell>
                <HoverCard>
                  <HoverCardTrigger>
                    <Image
                      src={image.url}
                      alt={image.altText || 'Image'}
                      width={100}
                      height={100}
                    />
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <Image
                      src={image.url}
                      alt={image?.altText || 'Image'}
                      className="w-auto h-auto"
                      width={400}
                      height={200}
                    />
                  </HoverCardContent>
                </HoverCard>
              </TableCell>
            <TableCell className="text-center">
         {
            image?.altText
         }
            </TableCell>
         
        

           
              <TableCell className="text-right flex gap-x-5 justify-end">
           
                <Button variant={"outline"} onClick={() => onClickDeleteMessage(image.id!)}>
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

export default ImageItems;
