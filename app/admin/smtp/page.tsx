import ErrorBoundary from '@/app/_error-boundary'
import SmtpWrapper from '@/components/smtp/smpt-wrapper'
import React, { Suspense } from 'react'
import Loading from '../loading'

const SmtpConfigPage = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading/>}>
        <SmtpWrapper/>
      </Suspense>
    </ErrorBoundary>
  )
}

export default SmtpConfigPage