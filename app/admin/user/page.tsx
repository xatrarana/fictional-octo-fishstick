import ErrorBoundary from '@/app/_error-boundary'
import UserWrapper from '@/components/admin/user/user-wrapper'
import React from 'react'

const page = () => {
  return (
    <ErrorBoundary>
        <UserWrapper/>
    </ErrorBoundary>
  )
}

export default page