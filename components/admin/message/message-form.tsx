"use client";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { messageSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { FormErorr } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { Member, Message } from "@/type";
import { addMessage, updateMessage } from "@/actions/message";
import { Textarea } from "@/components/ui/textarea";
import { GetMembers } from "@/actions/teams.member";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type NoticeFormProps = {
  edit?: boolean;
  editData?: Message;
};

export  const MessageForm: React.FC<NoticeFormProps> = ({ edit, editData }) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [members,setMembers] = useState<Member[] | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: editData?.message ?? "",
      status: editData?.status ?? true,
      memberId: editData?.memberId ?? "",
    },
  });

  
    

  const onEdit = async (data: z.infer<typeof messageSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    setIsPending(true);
    try {
      const response = await updateMessage(editData?.id!, data);
      if (!!response.success) {
        setSuccess(response.success);
        form.reset();
        setIsPending(false);
      }
      if (!!response.error) {
        setError(response.error);
      }


      setIsPending(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      if (error instanceof AxiosError) {
        setError(error.response?.data.error);
      }
      setIsPending(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    setIsPending(true);

    try {
      const response = await addMessage(data);

      if (!!response.success) {
        setSuccess(response.success);
        form.reset();

      }

      if (!!response.error) {
        setError(response.error);
      }
      setIsPending(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      if (error instanceof AxiosError) {
        setError(error.response?.data.error);
      }
      setIsPending(false);
    }
  };

  useEffect(() => {
    async function FetchMembers() {
      const response = await GetMembers();
      if (!!response.success && response.members) {
        setMembers(response.members);
      }
    }

    FetchMembers();


  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(edit ? onEdit : onSubmit)}
        className="space-y-6"
      >
        <div className="space-y-4">
          <FormField
            name="message"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor={field.name}>Message</Label>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Message"
                    className="h-10 autofill-bg-blue focus-visible:border-green-700 focus-visible:ring-green-700"
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormField
            name="status"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor={field.name}>Message status </Label>
                    <Switch
                      onCheckedChange={field.onChange}
                      id={field.name}
                      checked={field.value}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
            <FormField
              name="memberId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a Member" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {members && members.map((member) => {
                          return (
                            <SelectItem key={member.id} value={member.id}>
                              {member.name}
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

        <FormErorr message={error} />
        <FormSuccess message={success} />

        <Button
          type="submit"
          className="w-full bg-green-800 hover:bg-green-700"
          size={"lg"}
        >
          {isPending ? (
            <span className="loading loading-dots loading-md"></span>
          ) : edit ? (
            "Save Message"
          ) : (
            "Add Message"
          )}
        </Button>
      </form>
    </Form>
  );
};


export default MessageForm