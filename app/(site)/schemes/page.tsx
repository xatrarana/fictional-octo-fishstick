import { CardLoader } from '@/constant/Loader'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'
const SchemeWrapper = dynamic(() => import('@/components/schemes/scheme-wrapper'))
const SchemeListPage = ({params}:{params:{id:string}}) => {
  return (
    <Suspense fallback={<CardLoader/>}>
        <SchemeWrapper sid={params.id} />
    </Suspense>
  )
}

export default SchemeListPage