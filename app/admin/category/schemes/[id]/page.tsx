import ErrorBoundary from '@/app/_error-boundary'
import SchemeWrapper from '@/components/admin/schemes/schemes-wrapper'
import Link from 'next/link'
import React from 'react'
import { BiArrowBack } from 'react-icons/bi'

const Schemespage = ({params}:{params:{id:string}}) => {
  console.log(params.id);
  return (

   <div className="space-y-6">
    <Link
      href={"/admin/category/"}
      className=" text-center rounded-md text-slate-900 group"
    >
      <BiArrowBack className="inline-block w-6 h-6 rounded-full bg-gray-300 text-white mr-3" />{" "}
      <span className='font-semibold text-sm group:hover:bg-slate-700 text-muted-foreground'>Back</span>
    </Link>

  <ErrorBoundary>
  <SchemeWrapper id={params.id}/>
  </ErrorBoundary>
</div>
  )
}

export default Schemespage