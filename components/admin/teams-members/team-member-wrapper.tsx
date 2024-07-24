import ErrorBoundary from '@/app/_error-boundary'
import Loading from '@/app/admin/loading'
import { Card } from '@/components/ui/card'
import React, { Suspense } from 'react'
import { MemberAddDialog } from './team-member-form'
import OrgMemberItems from './team-member-items'

const TeamMemberWrapper = () => {
  return (
    <div className="space-y-6">
    <div className="space-y-4 flex justify-between items-center">
      <h1 className="font-bold text-slate-800 text-md md:lg:text-xl">
        Organization Members List
      </h1>
     
        <MemberAddDialog />
    </div>
    <ErrorBoundary>
      <Card>
        <Suspense fallback={<Loading />}>
        <OrgMemberItems/>
        </Suspense>
      </Card>
    </ErrorBoundary>
  </div>
  )
}

export default TeamMemberWrapper