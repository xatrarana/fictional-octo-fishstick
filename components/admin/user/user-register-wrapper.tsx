import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
import UserRegisterForm from './user-register';
const RegisterWrapper = () => {
  return (
    <Dialog>
      <DialogTrigger className="px-3 rounded-md py-2 bg-green-800 hover:bg-green-700 text-white">Add User</DialogTrigger>
      <DialogContent className='max-w-3xl mx-auto w-full'>
        <DialogTitle>Add User</DialogTitle>
        <DialogDescription>Add a new user</DialogDescription>
        <div>
          <UserRegisterForm />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default RegisterWrapper