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

import { EnableIndicator } from "@/constant/active-indicator";
import { useRouter } from "next/navigation";
import { deleteMessage, GetMessagesWithPagination } from "@/actions/message";
import EditButton from "@/components/edit-button";
import MessageForm from "./message-form";
import { Message } from "@/type";

const ITEMS_PER_PAGE = 7;

const MessageItems = () => {
  const {toast} = useToast()
  const [messages, setMessages] = React.useState<Message[] | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()


  const fetchGroups = async (page?: number, limit?: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await GetMessagesWithPagination(page, limit);
      const { Messages, pagination } = res;
      setMessages(Messages as Message[]);
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
      const response = await deleteMessage(id)
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
          <TableHead>Name</TableHead>
          <TableHead className="text-center">Designation</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {messages &&
          messages.map((message, index) => (
            <TableRow key={message.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
          
            <TableCell >
            {
                    message?.member?.name                }
            </TableCell>
            <TableCell className="text-center">
         {
            message?.member?.position?.name
         }
            </TableCell>
         
             <TableCell className="text-center">
                <EnableIndicator isEnabled={message.status} />
            </TableCell>

           
              <TableCell className="text-right flex gap-x-5 justify-end">
               <EditButton>
                <MessageForm edit editData={message}/>
               </EditButton>
                <Button variant={"outline"} onClick={() => onClickDeleteMessage(message.id!)}>
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

export default MessageItems;
