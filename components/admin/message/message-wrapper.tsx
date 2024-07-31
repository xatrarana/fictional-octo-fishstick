import ErrorBoundary from '@/app/_error-boundary'
import Loading from '@/app/admin/loading'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import React, { Suspense } from 'react'
import MessageItems from './message-items'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import MessageForm from './message-form'
const MessageWrapper = () => {
  return (
    <div className="space-y-6">
    <div className="space-y-4 flex flex-col md:flex-row md:justify-between md:items-center">
      <h1 className="font-bold text-slate-800 text-md md:lg:text-xl">
        Messages Center
      </h1>
     
      <Dialog>
      <DialogTrigger className="px-3 rounded-md py-2 bg-green-800 hover:bg-green-700 text-white">Add Message</DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Message</DialogTitle>
        <DialogDescription>Add a new message</DialogDescription>
        <div>
          <MessageForm />
        </div>
      </DialogContent>
    </Dialog>
    </div>
    <ErrorBoundary>
      <Card>
        <Suspense fallback={<Loading />}>
        <MessageItems/>
        </Suspense>
      </Card>
    </ErrorBoundary>
  </div>
  )
}

export default MessageWrapper