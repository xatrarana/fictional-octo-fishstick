"use client";
import { getRoles } from "@/actions/role";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegistrationSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Role, User } from "@/type";
import { Button } from "@/components/ui/button";
import { FormErorr } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { createUser } from "@/actions/user";

const fetchRoles = async () => {
  const response = await getRoles();
  return response;
};



const UserRegisterForm = () => {
  const [roles, setRoles] = React.useState<Role[] | []>([]);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [success, setSuccess] = React.useState<string | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof RegistrationSchema>>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      username: "",
      roleId: '',
    },
  });

  useEffect(() => {
    const loadRoles = async () => {
      const fetchedRoles = await fetchRoles();
      setRoles(fetchedRoles);
    };

    loadRoles();
  }, []);

  const onSubmit = async (data: z.infer<typeof RegistrationSchema>) => {
    setError(undefined)
    setSuccess(undefined)
    setLoading(true)

    if(data.password !== data.confirmPassword){
        form.setError("confirmPassword",{message:"Passwords do not match"})
        setLoading(false)
        return
    }
    try {

        const response = await createUser(data);
        if(response.error){
            setError(response.error)
        }

        if(response.success){
            setSuccess(response.success)
            form.reset()
        }
    } catch (error) {
    }finally{
        setLoading(false)
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-0 md:gap-x-3">
          <div>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" id="name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" id="username" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-0 md:gap-x-3">
          <div>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" id="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              name="roleId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="role">Role</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent id="role">
                        {roles.map((role) => {
                          return (
                            <SelectItem key={role.id}  value={role.id.toString()}>
                              {role.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-0 md:gap-x-3">
          <div>
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" id="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              name="confirmPassword"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" id="confirmPassword" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormErorr message={error}/>
        <FormSuccess message = {success}/>
        <div className="w-full">
            <Button
                type="submit"
                className="px-4 w-full py-2 bg-green-800 hover:bg-green-700 text-white"
            >
                Submit
            </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserRegisterForm;
