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
import { BiSolidTrashAlt } from "react-icons/bi";
import { MemberForm } from "./team-member-form";
import { DeleteMember, GetMembersWithPagination } from "@/actions/teams.member";
import Image from "next/image";
import { Member } from "@/type";

const ITEMS_PER_PAGE = 7;

const OrgMemberItems = () => {
  const {toast} = useToast()
  const [members, setMembers] = React.useState<Member[] | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const fetchGroups = async (page?: number, limit?: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await GetMembersWithPagination(page, limit);
      const { members, pagination } = res;
      setMembers(members);
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



  const onClickDeleteMember = async (id: string) => {
    try {
      const response = await DeleteMember(id)
      if(!!response.success){
        fetchGroups(currentPage, ITEMS_PER_PAGE);
        toast({
          title: 'Org Members Info',
          description: response.success,
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
          <TableHead className="text-center">Designation</TableHead>
          <TableHead className="text-center">Org Group</TableHead>
          <TableHead className="text-center">Display Order</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members &&
          members.map((member, index) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>
            {
              member.avatarUrl && <Image src={member.avatarUrl} alt="avatar" width={40} height={40} className="rounded-full"/>
            }
            {
              !member.avatarUrl && <Image src="/user.png" alt="avatar" width={40} height={40} className="rounded-full"/>
            }
            </TableCell>
            <TableCell >
            {
                    member.name
                }
            </TableCell>
            <TableCell className="text-center">
            {
                    member.position.name
                }
            </TableCell>
            <TableCell className="text-center">
                {
                    member.organizationTeam.name
                }
            </TableCell>
             <TableCell className="text-center">
                {member.displayOrder}
            </TableCell>

           
              <TableCell className="text-right flex gap-x-5 justify-end">
                <EditButton  className="max-w-3xl" descriptionText="update the item here." headerText={`Update ${member.name} details.`} >
                   <MemberForm editData={member} edit/>
                </EditButton>


                <Button variant={"outline"} onClick={() => onClickDeleteMember(member.id)}>
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

export default OrgMemberItems;
