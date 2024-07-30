import ErrorBoundary from '@/app/_error-boundary'
import Loading from '@/app/admin/loading'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import React, { Suspense } from 'react'
import NoticeItems from './notice-items'

const NoticeWrapper = () => {
  return (
    <div className="space-y-6">
    <div className="space-y-4 flex flex-col md:flex-row md:justify-between md:items-center">
      <h1 className="font-bold text-slate-800 text-md md:lg:text-xl">
        Organization Notices
      </h1>
     
        <Link href={`/admin/notice/new`} className='py-2 text-center px-3 bg-green-800 hover:bg-green-700 rounded-md text-white text-sm'>
            Add New Notice
        </Link>
    </div>
    <ErrorBoundary>
      <Card>
        <Suspense fallback={<Loading />}>
        <NoticeItems/>
        </Suspense>
      </Card>
    </ErrorBoundary>
  </div>
  )
}

export default NoticeWrapper