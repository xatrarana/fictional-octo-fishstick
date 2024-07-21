import React from 'react'
import SMTPForm from './smtp-form'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Button } from '../ui/button'
import SmtpTestContianer from './smtp-test'
const SmtpWrapper = () => {
  return (
    <Card className='w-full'>
    <CardHeader>
      <CardTitle>{"SMTP Configuration"}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className='flex justify-end'>
        <SmtpTestContianer/>
      </div>
     <SMTPForm/>
    </CardContent>
   
  </Card>
  )
}

export default SmtpWrapper