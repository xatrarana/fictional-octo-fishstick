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
const SmtpWrapper = () => {
  return (
    <Card className='w-full'>
    <CardHeader>
      <CardTitle>{"SMTP Configuration"}</CardTitle>
    </CardHeader>
    <CardContent>
     <SMTPForm/>
    </CardContent>
   
  </Card>
  )
}

export default SmtpWrapper