import React, { Suspense } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import SmtpTestContianer from './smtp-test'

const SmtpFormLazy = React.lazy(() => import('./smtp-form'))
const SmtpWrapper = () => {
  return (
    <Card className='w-full'>
    <CardHeader>
      <CardTitle>{"SMTP Configuration"}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className='flex justify-end my-2'>
        <SmtpTestContianer/>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <SmtpFormLazy/>
      </Suspense>
    </CardContent>
   
  </Card>
  )
}

export default SmtpWrapper