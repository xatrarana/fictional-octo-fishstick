"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { smtpFormSchema } from "@/schemas";
import * as z from "zod";
import { FormField, FormItem, Form, FormControl, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormErorr } from "../form-error";
import { FormSuccess } from "../form-success";
import { smtpSave } from "@/actions/smtp-config";
import instance from "@/lib/axios";
import { SMTPConnection } from "@/type";

type smtpFormProps = {
  data: SMTPConnection | null;
}


type smtpFormType = z.infer<typeof smtpFormSchema>;
const SMTPForm = ({data}:smtpFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const form = useForm<smtpFormType>({
    resolver: zodResolver(smtpFormSchema),
    defaultValues: {
        servername: data?.servername ?? "",
        username:data?.username ?? "",
        password: data?.password ?? "",
        port: data?.port?? '',
        displayname: data?.displayname ?? "",
        fromEmail: data?.from ?? "",
        toEmail: data?.to ?? "",
    },
  });

  const onSubmit = async (data: smtpFormType) => {
    setError(undefined);
    setSuccess(undefined);
    startTransition(async () => {
      try {
        const response = await smtpSave(data);
        setSuccess(response.success);
      } catch (error) {
        if (error instanceof z.ZodError) {
          setError(error.message);
        }
        if (error instanceof Error) {
          setError(error.message);
        }
        setError("Something went wrong");
      }
    });
  };
  return (
    <Form {...form}>
      <FormErorr message={error} />
      <FormSuccess message={success} />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 ">
        <div className="mt-2 gap-3 flex flex-col md:lg:flex-row items-center justify-between">
          <FormField
            control={form.control}
            name="servername"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Server Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={isPending}
                    placeholder="Server Name"
                    {...field}
                    className="h-10 autofill-bg-blue focus-visible:border-green-700 focus-visible:ring-green-700"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="port"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Port</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={isPending}
                    placeholder="Port"
                    {...field}
                    className="h-10 autofill-bg-blue focus-visible:border-green-700 focus-visible:ring-green-700"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fromEmail"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>From Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={isPending}
                    placeholder="Email"
                    {...field}
                    className="h-10 autofill-bg-blue focus-visible:border-green-700 focus-visible:ring-green-700"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="mt-2 gap-3 flex flex-col md:lg:flex-row items-center justify-between">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={isPending}
                    placeholder="Username"
                    {...field}
                    className="h-10 autofill-bg-blue focus-visible:border-green-700 focus-visible:ring-green-700"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={isPending}
                    placeholder="Password"
                    {...field}
                    className="h-10 autofill-bg-blue focus-visible:border-green-700 focus-visible:ring-green-700"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="displayname"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={isPending}
                    placeholder="Display Name"
                    {...field}
                    className="h-10 autofill-bg-blue focus-visible:border-green-700 focus-visible:ring-green-700"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="mt-2">
          <FormField
            control={form.control}
            name="toEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={isPending}
                    placeholder="Email"
                    {...field}
                    className="h-10 autofill-bg-blue focus-visible:border-green-700 focus-visible:ring-green-700"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="mt-2">
          <Button
            type="submit"
            className="w-full bg-green-800 hover:bg-green-700"
            disabled={isPending}
            size={"lg"}
          >
            {isPending ? (
              <span className="loading loading-dots loading-md"></span>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SMTPForm;
