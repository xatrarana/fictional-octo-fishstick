"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {  createFlashNewsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { FormErorr } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SaveFlashNews, UpdateFlashNews } from "@/actions/flash-news";
import { FlashNews } from "@prisma/client";

export const FlashAddDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="px-3 rounded-md py-2 bg-green-800 text-sm hover:bg-green-700 text-white">Add Flash News</DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Flash News</DialogTitle>
        <DialogDescription>Add a new flash news details.</DialogDescription>
        <div>
          <FlashForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};


type FlashFormProps = {
    edit?: boolean;
    editData?: FlashNews;
}
export const FlashForm: React.FC<FlashFormProps> = ({edit,editData}) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof createFlashNewsSchema>>({
    resolver: zodResolver(createFlashNewsSchema),
    defaultValues: {
      message: editData?.message ?? "",
    },
  });

  const onEdit = async (data: z.infer<typeof createFlashNewsSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    setIsPending(true);

    try {

        const response = await UpdateFlashNews(editData?.id!,data);
        if(!!response.success) setSuccess(response.success);

    } catch (error) {
        if(error instanceof Error) setError(error.message);

        setError("Error submitting form. Please try again.");
      
    }finally{
        setIsPending(false);
    }
  }
  const onSubmit = async (data: z.infer<typeof createFlashNewsSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    setIsPending(true);

    try {

       

        const response = await SaveFlashNews(data);
        if(!!response.success) setSuccess(response.success);

    } catch (error) {
        if(error instanceof Error) setError(error.message);

        setError("Error submitting form. Please try again.");
      
    }finally{
        setIsPending(false);
    }
  };

  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(edit ? onEdit: onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            name="message"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Flash News Message"
                    className="h-10 autofill-bg-blue focus-visible:border-green-700 focus-visible:ring-green-700"
                  />
                </FormControl>
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
          ) : (
            edit ? "Update" : "Save"
          )}
        </Button>
      </form>
    </Form>
  );
};

