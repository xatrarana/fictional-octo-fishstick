"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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
import { Banner } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { deleteBanner } from "@/actions/banner";
import { useToast } from "@/components/ui/use-toast";

const ITEMS_PER_PAGE = 5;

const BannerItems = () => {
  const {toast} = useToast()
  const [banners, setBanners] = React.useState<Banner[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const fetchSliders = async (page?: number, limit?: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await instance.get(`/api/slides?page=${page}&limit=${limit}`);
      const { slides, pagination } = res.data;
      setBanners(slides);
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



  const onClickDeleteBanner = async (id: string) => {
    try {
      const response = await deleteBanner(id)
      if(response.success){
        fetchSliders(currentPage, ITEMS_PER_PAGE);
        toast({
          title: 'Banner Info',
          description: response.message,
          type: 'foreground'
        })
      }
    } catch (error) {
      
      if(error instanceof Error){
        toast({
          variant:"destructive",
          title: 'Banner Error',
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
          <TableHead>Caption</TableHead>
          <TableHead>Slug</TableHead>

          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {banners &&
          banners.map((banner, index) => (
            <TableRow key={banner.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>
                <HoverCard>
                  <HoverCardTrigger>
                    <Image
                      src={banner.imageUrl}
                      alt={banner.title}
                      width={100}
                      height={100}
                    />
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <Image
                      src={banner.imageUrl}
                      alt={banner.title}
                      className="w-auto h-auto"
                      width={400}
                      height={200}
                    />
                  </HoverCardContent>
                </HoverCard>
              </TableCell>
              <TableCell>{banner.title}</TableCell>
              <TableCell>{banner.slug}</TableCell>
              <TableCell className="text-right flex gap-x-5 justify-end">
                <Button variant={"destructive"} onClick={() => onClickDeleteBanner(banner.id)}>Delete</Button>
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

export default BannerItems;
