import ErrorBoundary from '@/app/_error-boundary'
import ServiceDetailsWrapper from '@/components/schemes/service-single-wrapper'
import { CardDetailsLoader } from '@/constant/Loader'
import React, { Suspense } from 'react'

const DetailsPage = ({params}:{params:{id:string}}) => {
  return (
   <ErrorBoundary>
    <Suspense fallback={<CardDetailsLoader/>}>
        <ServiceDetailsWrapper sid={params.id} />
    </Suspense>
   </ErrorBoundary>
  )
}

export default DetailsPage