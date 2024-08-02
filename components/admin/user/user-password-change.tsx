"use client";
import React, { useRef } from "react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BiSolidLockAlt } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { changePasswordByAdmin } from "@/actions/user";
import { FormErorr } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

type PasswordChangeFormAdminProps = {
  id: string;
};
const PasswordChangeFormAdmin = ({ id }: PasswordChangeFormAdminProps) => {
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [success, setSuccess] = React.useState<string | undefined>(undefined);

  const handlePassworChange = async () => {
    if (!passwordRef.current?.value) return setError("Password is required");
    const userId = id;
    if (!userId) return setError("A valid user is required!");
    try {
      const response = await changePasswordByAdmin({
        id: id,
        password: passwordRef.current?.value,
      });

      if (!!response.success) {
        setSuccess(response.success);
      }

      if (!!response.error) {
        setError(response.error);
      }
    } catch (error) {
      setError("An error occurred while changing password");
    }
  };
  return (
    <Sheet>
      <SheetTrigger>
        <BiSolidLockAlt />
      </SheetTrigger>
      <SheetContent className="space-y-6">
        <SheetHeader>
          <SheetTitle>Change Password</SheetTitle>
          <SheetDescription>
            Admin are allowed to change password
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="md:text-right">
              Password
            </Label>
            <Input ref={passwordRef} id="password" className="col-span-3" />
          </div>
        </div>
        <FormErorr message={error} />
        <FormSuccess message={success} />
        <SheetFooter>
          <SheetClose asChild>
            <Button variant={"outline"}>Close</Button>
          </SheetClose>
          <Button onClick={handlePassworChange}>Change Password</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default PasswordChangeFormAdmin;
