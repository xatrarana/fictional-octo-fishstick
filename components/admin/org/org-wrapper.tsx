import React, { Suspense } from 'react'
import OrganizationForm from './org-form'
import ErrorBoundary from '@/app/_error-boundary'
import Loading from '@/app/admin/loading'
import { GetDetailsData } from '@/data/org'
import { Organization } from '@prisma/client'
import { OrganizationSchema } from '@/schemas'
import * as z from 'zod'

const OrganizationWrapper = async () => {
    const data = await GetDetailsData()
  return (
    <div className="space-y-6">
    <div className="space-y-4 flex justify-between items-center">
      <h1 className="font-bold text-slate-800 text-md md:lg:text-xl">
        Organization Details
      </h1>
     
    
    </div>
    <ErrorBoundary>
        <Suspense fallback={<Loading/>}>
        <OrganizationForm data={data as z.infer<typeof OrganizationSchema>}/>
        </Suspense>
    </ErrorBoundary>
  </div>
  )
}

export default OrganizationWrapper