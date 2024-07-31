import React from 'react'
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonCard from './skeleton-card';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import nothing from '@/public/nothing.svg'


type LoaderProps = {
    len?:number
}
export const CardLoader = ({len = 6}:LoaderProps) => {
  return (
    <div className="space-y-6 my-4">
      <Skeleton className="h-6 w-full" />

      <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-1">
        {Array.from({ length: len }).map((_, i) => (
          <SkeletonCard key={i + 1} />
        ))}
      </div>
    </div>
  )
}
export const CardDetailsLoader = () => {
  return (
    <Card className="space-y-6 my-4 p-4">
      <Skeleton className="h-8 w-full" />

      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[50lvh] w-full rounded-md" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[300px]" />
          <Skeleton className="h-4 w-[280px]" />
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </Card>
  )
}
export const ImageDetailsLoader = () => {
  return (
    <Card className="space-y-6 my-4 p-4">
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-[50lvh] w-full rounded-md" />
      </div>
    </Card>
  )
}

export const VoidLoader = () => {
  return (
    <Card className="space-y-6 my-4 p-4">
     <CardContent className='flex items-center flex-col gap-y-5 justify-center'>
      <Image src={nothing} alt="Image not Found" width={200} height={40} className="rounded-md"/>
      <CardFooter className='text-center'>
      <h1 className="text-muted-foreground">The Resource you are looking does not exits</h1>
     </CardFooter>
     </CardContent>
     
    </Card>
  )
}

