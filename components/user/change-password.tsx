"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { useRef, useState } from "react";
import { BiSolidLockAlt } from "react-icons/bi";
import { FormErorr } from "../form-error";
import { changePasswordSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl, FormLabel } from "../ui/form";
import { changeAuthPassword } from "@/actions/change-auth-password";
import { FormSuccess } from "../form-success";
export function ChangePasswordField() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof changePasswordSchema>) => {
    try {
        const response = await changeAuthPassword(data);
        if(response.error) return setError(response.error);
        setSuccess(response.success);
        form.reset();
    } catch (error) {
        setError("Error while changing password. Please try again later.");
    }
  };

  return (
    <Sheet>
      <SheetTrigger className="w-full hover:text-primary flex gap-x-3 text-sm items-center text-muted-foreground">
          <BiSolidLockAlt className="h-5 w-5 text-green-800" />
          Change Password
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetHeader>
          <SheetTitle>Change Password</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <div className="grid gap-4 py-4 space-y-4">
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <FormLabel className="text-muted-foreground" htmlFor="currentPassword">
                        Current Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="currentPassword"
                          type="password"
                          className="col-span-3"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <FormLabel className="text-muted-foreground" htmlFor="newPassword">New Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="newPassword"
                          type="text"
                          className="col-span-3"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                      <FormLabel className="text-muted-foreground" htmlFor="confirmPassword">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="confirmPassword"
                          type="text"
                          className="col-span-3"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                  <FormErorr message={error} />
                  <FormSuccess message={success} />
            </div>
            <SheetFooter className="flex flex-col gap-y-3">
              <SheetClose asChild>
                <Button variant={"destructive"}>Close</Button>
              </SheetClose>
              <Button className="bg-green-800 hover:bg-green-700" type="submit">
                Change Password
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
