import { getNoticeById } from '@/actions/notice'
import ErrorBoundary from '@/app/_error-boundary'
import { NoticeForm } from '@/components/admin/notice/notice-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {  noticeSchema } from '@/schemas'
import Link from 'next/link'
import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { z } from 'zod'

const EditPage = async ({params}:{params:{id:string,edit:boolean}}) => {
        const response = await getNoticeById(params.id)

        if(response.error) return <div>{response.error}</div>
  return (
    
    <div className="space-y-6">
    <Link
      href={"/admin/notice"}
      className=" text-center rounded-md text-slate-900 text-sm"
    >
      <BiArrowBack className="inline-block w-6 h-6 rounded-full bg-gray-300 text-white mr-3" />{" "}
      Back to Notices
    </Link>

  <ErrorBoundary>
    <Card className="space-y-4">
        <CardHeader>
            <CardTitle>Update Notice</CardTitle>
        </CardHeader>
      <CardContent>
        <NoticeForm edit editData={response.notice as z.infer<typeof noticeSchema>} />
      </CardContent>
    </Card>
  </ErrorBoundary>
</div>
  )
}

export default EditPage