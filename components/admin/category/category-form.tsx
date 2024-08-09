"use client";
import React, { Suspense, useState } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { CategorySchema } from "@/schemas";
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
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import Loading from "@/app/admin/loading";
import { useToast } from "@/components/ui/use-toast";
import instance from "@/lib/axios";
import { AxiosError } from "axios";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { createCategory, updateCategory } from "@/actions/category";

const Editor = dynamic(() => import("@/components/admin/about/editor"), {
  ssr: false,
});

type CategoryFormProps = {
  edit?: boolean;
  editData?: z.infer<typeof CategorySchema>;
};
export const CategoryForm: React.FC<CategoryFormProps> = ({
  edit,
  editData,
}) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, setIsPending] = useState(false);

  const [categoryImageUrl, setCategoryImageUrl] = React.useState<string | null>(
    editData?.categoryImageUrl ?? null
  );

  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const { toast } = useToast();

  const handleCateGoryImageInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setCategoryImageUrl(imageUrl);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("dir", "category");

    setIsUploading(true);

    try {
      const response = await instance.post("/api/file-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const { loaded, total } = progressEvent;
            const percentage = Math.round((loaded * 100) / total);
            setUploadProgress(percentage);
          }
        },
      });

      if (response.data.result.url) {
        form.setValue("categoryImageUrl", response.data.result.url);
        setCategoryImageUrl(response.data.result.url);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          description: error.message,
        });
      }
      if (error instanceof AxiosError) {
        toast({
          description: error.response?.data.error,
        });
      }
    } finally {
      setIsUploading(false);
    }
  };

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: editData?.name ?? "",
      text: editData?.text ?? "",
      status: editData?.status ?? true,
      categoryImageUrl: editData?.categoryImageUrl ?? "",
    },
  });

  const onEdit = async (data: z.infer<typeof CategorySchema>) => {
    setError(undefined);
    setSuccess(undefined);
    setIsPending(true);

    
    try {
      const response = await updateCategory(editData?.id as string,data);

      if (!!response.success) {
        setIsPending(false);

        setSuccess(response.success);
        form.reset();
      }

      if (!!response.error) {
        setIsPending(false);

        setError(response.error);
      }
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
  const onSubmit = async (data: z.infer<typeof CategorySchema>) => {
    setError(undefined);
    setSuccess(undefined);
    setIsPending(true);

    try {
      const response = await createCategory(data);

      if (!!response.success) {
        setIsPending(false);

        setSuccess(response.success);
        form.reset();
      }

      if (!!response.error) {
        setIsPending(false);

        setError(response.error);
      }
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
                <Label htmlFor={field.name}>Category Name</Label>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Name of category"
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
                    <Label htmlFor={field.name}>Category Status</Label>
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
          {isUploading && <Progress value={uploadProgress} />}
          <FormField
            name="categoryImageUrl"
            control={form.control}
            render={() => (
              <FormItem>
                <Label htmlFor="categoryImageUrl">Category Image</Label>
                <FormControl>
                  <Input
                    type="file"
                    onChange={handleCateGoryImageInputChange}
                    className="h-10 autofill-bg-blue focus-visible:border-green-700 focus-visible:ring-green-700"
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          {categoryImageUrl && (
            <div className="mt-4 rounded-sm p-1 flex justify-center">
              {/* eslint-disable-next-line */}
              <img
                height={100}
                width={200}
                src={categoryImageUrl as string}
                alt="Selected"
                className="block w-auto h-auto rounded-sm"
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <FormField
            name="text"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor={field.name}>Category Description</Label>
                <FormControl>
                  <Suspense fallback={<Loading />}>
                    <Editor
                      name={field.name}
                      id={field.name}
                      initialContent={editData?.text}
                      onChange={field.onChange}
                    />
                  </Suspense>
                </FormControl>
                <FormMessage className="text-sm" />
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
            "Save Category"
          ) : (
            "Add Category"
          )}
        </Button>
      </form>
    </Form>
  );
};
