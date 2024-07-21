import { ForgotForm } from '@/components/auth/forgot-form'
import React, { Suspense } from 'react'

const ForgotPage = () => {
  // seedData()
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotForm/>
    </Suspense>
  )
}

export default ForgotPage