"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {  positionFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { FormErorr } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Position } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { SaveDesignation, UpdateDesignation } from "@/actions/teams.position";

export const PositionAddDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="px-3 rounded-md py-2 bg-green-800 text-sm hover:bg-green-700 text-white">
        Add Designations
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Designations/Roles/Levels</DialogTitle>
        <DialogDescription>Fill below fields with details.</DialogDescription>
        <div>
          <PositionForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

type PositionFormProps = {
  edit?: boolean;
  editData?: Position;
};
export const PositionForm: React.FC<PositionFormProps> = ({ edit, editData }) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof positionFormSchema>>({
    resolver: zodResolver(positionFormSchema),
    defaultValues: {
      name: editData?.name ?? "",
    },
  });

  const onEdit = async (data: z.infer<typeof positionFormSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    setIsPending(true);

    try {
      const response = await UpdateDesignation(editData?.id!, data);
      if (!!response.success) setSuccess(response.success);
      if (!!response.error) setError(response.error);
    } catch (error) {
      if (error instanceof Error) setError(error.message);

      setError("Error submitting form. Please try again.");
    } finally {
      setIsPending(false);
    }
  };
  const onSubmit = async (data: z.infer<typeof positionFormSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    setIsPending(true);

    try {
      const response = await SaveDesignation(data);
      if (!!response.success) setSuccess(response.success);
      if (!!response.error) setError(response.error);
    } catch (error) {
      if (error instanceof Error) setError(error.message);

      setError("Error submitting form. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(edit ? onEdit : onSubmit)}
        className="space-y-6"
      >
        <div className="space-y-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Name of Degination/Role/Level"
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
          ) : edit ? (
            "Update"
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </Form>
  );
};
