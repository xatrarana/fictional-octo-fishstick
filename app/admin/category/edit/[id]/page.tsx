import { getCategoryById } from '@/actions/category'
import ErrorBoundary from '@/app/_error-boundary'
import { CategoryForm } from '@/components/admin/category/category-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CategorySchema } from '@/schemas'
import Link from 'next/link'
import React from 'react'
import { BiArrowBack } from 'react-icons/bi'
import { z } from 'zod'

const EditPage = async ({params}:{params:{id:string,edit:boolean}}) => {
        const response = await getCategoryById(params.id)

        if(response.error) return <div>{response.error}</div>
  return (
    
    <div className="space-y-6">
    <Link
      href={"/admin/category"}
      className=" text-center rounded-md text-slate-900 text-sm"
    >
      <BiArrowBack className="inline-block w-6 h-6 rounded-full bg-gray-300 text-white mr-3" />{" "}
      Back to Categories
    </Link>

  <ErrorBoundary>
    <Card className="space-y-4">
        <CardHeader>
            <CardTitle>Update New Category</CardTitle>
        </CardHeader>
      <CardContent>
        <CategoryForm edit editData={response.category as z.infer<typeof CategorySchema>} />
      </CardContent>
    </Card>
  </ErrorBoundary>
</div>
  )
}

export default EditPage