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
import { getFirstSmtpConnection } from '@/data/smtp'

const SmtpFormLazy = React.lazy(() => import('./smtp-form'))
const SmtpWrapper = async () => {
  const data = await getFirstSmtpConnection()
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
        <SmtpFormLazy data={data}/>
      </Suspense>
    </CardContent>
   
  </Card>
  )
}

export default SmtpWrapper