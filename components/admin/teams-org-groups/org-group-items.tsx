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


import {  OrganizationTeam } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import EditButton from "@/components/edit-button";
import { BiSolidTrashAlt } from "react-icons/bi";
import { EnableIndicator } from "@/constant/active-indicator";
import { OrgGroupForm } from "./org-group-form";
import { DeleteOrgGroup, GetOrgGroupWithPagination } from "@/actions/teams.group";

const ITEMS_PER_PAGE = 5;

const OrgGroupItems = () => {
  const {toast} = useToast()
  const [positions, setPositions] = React.useState<OrganizationTeam[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const fetchGroups = async (page?: number, limit?: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await GetOrgGroupWithPagination(page, limit);
      const { groups, pagination } = res;
      setPositions(groups as OrganizationTeam[]);
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



  const onClickDeleteOrgGroup = async (id: string) => {
    try {
      const response = await DeleteOrgGroup(id)
      if(!!response.success){
        fetchGroups(currentPage, ITEMS_PER_PAGE);
        toast({
          title: 'Org Group Info',
          description: response.success,
          type: 'foreground'
        })
      }
    } catch (error) {
      
      if(error instanceof Error){
        toast({
          variant:"destructive",
          title: 'Org Group Error',
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
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Order</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {positions &&
          positions.map((group, index) => (
            <TableRow key={group.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>
                {group.name}
            </TableCell>
            <TableCell>
                {group.slug}
            </TableCell>
            <TableCell>
                <EnableIndicator isEnabled={group.status}/>
            </TableCell>
             <TableCell className="text-center">
                {group.displayOrder}
            </TableCell>

           
              <TableCell className="text-right flex gap-x-5 justify-end">
                <EditButton descriptionText="update the item here." headerText="Update Flash News" >
                   <OrgGroupForm editData={group} edit/>
                </EditButton>


                <Button variant={"outline"} onClick={() => onClickDeleteOrgGroup(group.id)}>
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

export default OrgGroupItems;
