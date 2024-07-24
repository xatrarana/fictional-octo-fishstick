import ErrorBoundary from '@/app/_error-boundary'
import Loading from '@/app/admin/loading'
import React, { Suspense } from 'react'
import { Card } from 'react-bootstrap'
import { PositionAddDialog } from './position-form'
import PositionItems from './position-items'

const PositionWrapper = () => {
  return (
    <div className="space-y-6">
    <div className="space-y-4 flex justify-between items-center">
      <h1 className="font-bold text-slate-800 text-md md:lg:text-xl">
        Organization Designations
      </h1>
     
        <PositionAddDialog />
    </div>
    <ErrorBoundary>
      <Card>
        <Suspense fallback={<Loading />}>
          <PositionItems />
        </Suspense>
      </Card>
    </ErrorBoundary>
  </div>
  )
}

export default PositionWrapper