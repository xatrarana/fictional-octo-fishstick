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
import {  FlashNews, Position } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { DeleteFlashNews } from "@/actions/flash-news";
import { TruncateWords } from "@/constant/truncate-component";
import EditButton from "@/components/edit-button";
import { BiSolidTrashAlt } from "react-icons/bi";
import { EnableIndicator } from "@/constant/active-indicator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DeleteDesignation, GetDesignationsWithPagination } from "@/actions/teams.position";
import { PositionForm } from "./position-form";

const ITEMS_PER_PAGE = 5;

const PositionItems = () => {
  const {toast} = useToast()
  const [positions, setPositions] = React.useState<Position[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const fetchSliders = async (page?: number, limit?: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await GetDesignationsWithPagination(page, limit);
      const { designations, pagination } = res;
      setPositions(designations as Position[]);
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
    fetchSliders(currentPage, ITEMS_PER_PAGE);
  }, [currentPage]);



  const onClickDeletePosition = async (id: string) => {
    try {
      const response = await DeleteDesignation(id)
      if(!!response.success){
        fetchSliders(currentPage, ITEMS_PER_PAGE);
        toast({
          title: 'Positions Info',
          description: response.success,
          type: 'foreground'
        })
      }
    } catch (error) {
      
      if(error instanceof Error){
        toast({
          variant:"destructive",
          title: 'Positions Error',
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
          <TableHead className="text-center">Slug</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {positions &&
          positions.map((position, index) => (
            <TableRow key={position.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>
                {position.name}
            </TableCell>
            <TableCell>
                {position.slug}
            </TableCell>
             

           
              <TableCell className="text-right flex gap-x-5 justify-end">
                <EditButton descriptionText="update the item here." headerText="Update Flash News" >
                   <PositionForm editData={position}  edit/>
                </EditButton>


                <Button variant={"outline"} onClick={() => onClickDeletePosition(position.id)}>
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

export default PositionItems;
