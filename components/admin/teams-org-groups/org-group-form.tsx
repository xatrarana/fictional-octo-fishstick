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
import {   teamFromSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { FormErorr } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { OrganizationTeam } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SaveGroup, UpdateOrgGroup } from "@/actions/teams.group";

export const OrgGroupAddDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="px-3 rounded-md py-2 bg-green-800 text-sm hover:bg-green-700 text-white">
        Add Organizationl Group
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Organizational Groups</DialogTitle>
        <DialogDescription>Fill below fields with details.</DialogDescription>
        <div>
          <OrgGroupForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

type OrgGroupFormProps = {
  edit?: boolean;
  editData?: OrganizationTeam;
};
export const OrgGroupForm: React.FC<OrgGroupFormProps> = ({ edit, editData }) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof teamFromSchema>>({
    resolver: zodResolver(teamFromSchema),
    defaultValues: {
      name: editData?.name ?? "",
      displayOrder: editData?.displayOrder?.toString() ?? '',
      status: editData?.status ?? true,
    },
  });

  const onEdit = async (data: z.infer<typeof teamFromSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    setIsPending(true);

    try {
      const response = await UpdateOrgGroup(editData?.id!, data);
      if (!!response.success) setSuccess(response.success);
      if (!!response.error) setError(response.error);
    } catch (error) {
      if (error instanceof Error) setError(error.message);

      setError("Error submitting form. Please try again.");
    } finally {
      setIsPending(false);
    }
  };
  const onSubmit = async (data: z.infer<typeof teamFromSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    setIsPending(true);

    try {
      const response = await SaveGroup(data);
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
                    placeholder="Name of Organization Group"
                    className="h-10 autofill-bg-blue focus-visible:border-green-700 focus-visible:ring-green-700"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <FormField
            name="displayOrder"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Order to display"
                    className="h-10 autofill-bg-blue focus-visible:border-green-700 focus-visible:ring-green-700"
                  />
                </FormControl>
                <FormMessage/>
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
                      <Switch onCheckedChange={field.onChange}  id={field.name} checked={field.value} />
                      <Label htmlFor={field.name}>Group Status</Label>
                    </div>
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
