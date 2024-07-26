import ErrorBoundary from '@/app/_error-boundary'
import Loading from '@/app/admin/loading'
import { Card } from '@/components/ui/card'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import React, { Suspense } from 'react'

const CategoryItems = dynamic(()=> import('@/components/admin/category/category-items'),{loading:()=><Loading/>})
const CategoryWrapper = () => {
  return (
    <div className="space-y-6">
    <div className="space-y-4 flex flex-col md:flex-row md:justify-between md:items-center">
      <h1 className="font-bold text-slate-800 text-md md:lg:text-xl">
        Organization Category Services
      </h1>
     
        <Link href="/admin/category/new" className='py-2 text-center px-3 bg-green-800 hover:bg-green-700 rounded-md text-white text-sm'>
            Add New Category
        </Link>
    </div>
    <ErrorBoundary>
      <Card>
        <Suspense fallback={<Loading />}>
        <CategoryItems/>
        </Suspense>
      </Card>
    </ErrorBoundary>
  </div>
  )
}

export default CategoryWrapper