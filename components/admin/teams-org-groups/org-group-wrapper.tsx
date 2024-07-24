import ErrorBoundary from '@/app/_error-boundary'
import Loading from '@/app/admin/loading'
import { Card } from '@/components/ui/card'
import React, { Suspense } from 'react'
import { OrgGroupAddDialog } from './org-group-form'
import OrgGroupItems from './org-group-items'

const OrgGroupWrapper = () => {
  return (
    <div className="space-y-6">
    <div className="space-y-4 flex justify-between items-center">
      <h1 className="font-bold text-slate-800 text-md md:lg:text-xl">
        Organization Groups List
      </h1>
     
        <OrgGroupAddDialog />
    </div>
    <ErrorBoundary>
      <Card>
        <Suspense fallback={<Loading />}>
          <OrgGroupItems />
        </Suspense>
      </Card>
    </ErrorBoundary>
  </div>
  )
}

export default OrgGroupWrapper