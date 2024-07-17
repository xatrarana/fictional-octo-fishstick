import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  type ContactFormWrapperProps = {
    children:React.ReactNode,
    cardTitle: string,
    cardDesc: string
  }
const ContactFormWrapper = ({children,cardTitle,cardDesc}:ContactFormWrapperProps) => {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription className='mt-2'>{cardDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
     
    </Card>
  )
}

export default ContactFormWrapper