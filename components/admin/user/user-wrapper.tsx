import ErrorBoundary from '@/app/_error-boundary'
import Loading from '@/app/admin/loading'
import { Card } from '@/components/ui/card'
import React, { Suspense } from 'react'
import RegisterWrapper from './user-register-wrapper'
import UserItems from './user-items'

const UserWrapper = () => {
  return (
    <div className="space-y-6">
    <div className="space-y-4 flex flex-col md:flex-row md:justify-between md:items-center">
      <h1 className="font-bold text-slate-800 text-md md:lg:text-xl">
        Organization Users Management
      </h1>
     
       <RegisterWrapper/>
    </div>
    <ErrorBoundary>
      <Card>
        <Suspense fallback={<Loading />}>
        <UserItems/>
        </Suspense>
      </Card>
    </ErrorBoundary>
    </div>
  )
}

export default UserWrapper