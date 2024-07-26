import { CardDetailsLoader, CardLoader } from '@/constant/Loader'
import dynamic from 'next/dynamic'
import React, { Suspense } from 'react'


const SchemeDetailsWrapper = dynamic(() => import('@/components/schemes/scheme-single-wrapper'))
const SchemeDetailsPage = ({params}:{params:{id:string}}) => {
  return (
    <Suspense fallback={<CardDetailsLoader/>}>
        <SchemeDetailsWrapper sid={params.id} />
    </Suspense>
  )
}

export default SchemeDetailsPage