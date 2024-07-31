'use client';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useRef, useState } from "react";
import { BiSolidUser } from "react-icons/bi"
import { FormErorr } from "../form-error";
import { FormSuccess } from "../form-success";
import { useCurrentUser } from "@/hooks/use-current-user";
import { updateUser } from "@/actions/user";

 function UserProfile() {
  const nameRef = useRef<HTMLInputElement>(null)
  const usernameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const [error,setError]= useState<string | undefined>(undefined)
  const [success,setSuccess]  = useState<string | undefined>(undefined)


  const user = useCurrentUser()

  

  const handleSubmit = async () => {
    try {
      
      if(!user?.id) throw new Error("User not found");

      const response = await updateUser({
        id: user.id,
        name: nameRef.current?.value,
        username: usernameRef.current?.value,
        email: emailRef.current?.value
      })


    } catch (error) {
      if(error instanceof Error){
        setError(error.message)
      }

      setError("An error occurred while updating user")
    }
  }


  return (
    <Sheet>
      <SheetTrigger className="w-full hover:text-primary flex gap-x-3 text-sm items-center text-muted-foreground">
          <BiSolidUser className="h-5 w-5 text-green-800" />
          Edit Profile
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <FormErorr message={error}/>
        <FormSuccess message={success}/>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input ref={nameRef} id="name" value={user?.name || ""} className="col-span-3" />
          </div>
          {/* <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input ref={usernameRef} id="username" value={user.username} className="col-span-3" />
          </div> */}
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              email
            </Label>
            <Input ref={emailRef} id="email" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button className="bg-green-800 hover:bg-green-700" onClick={handleSubmit} >Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default UserProfile