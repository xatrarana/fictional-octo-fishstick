import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb";
import ErrorBoundary from '@/app/_error-boundary';
import NoticeCard from './notice-card';
import { getActiveNoticeItems } from '@/actions/notice';
import { noticeSchema } from '@/schemas';

import * as z from 'zod'
const NoticePagesiteWrapper = async () => {

    const data =await getActiveNoticeItems()
  return (
    <div className='space-y-6 h-screen'>
        <Breadcrumb className="p-1">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/notices/`}>
              notices
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>


      <div className='space-y-4 my-3'>
        <ErrorBoundary>
         <div className='grid grid-cols-1 md:lg:grid-cols-3  gap-y-3 md:lg:gap-x-5'>
             
          {
            data && data.success && data.notices && data.notices.map((notice) => {
              return <NoticeCard notice={notice as z.infer<typeof noticeSchema>} key={notice.id}/>
            })
          }
         </div>
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default NoticePagesiteWrapper