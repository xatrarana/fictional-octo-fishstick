"use client";
import React, { Suspense, useEffect, useState } from "react";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { CategorySchema, ServiceSchema } from "@/schemas";
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
import { createService, updateService } from "@/actions/service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GetCategoryData } from "@/data/category";

const Editor = dynamic(() => import("@/components/admin/about/editor"), {
  ssr: false,
});

type SchemeFormProps = {
  edit?: boolean;
  editData?: z.infer<typeof ServiceSchema>;
  cid?: string;
};
export const SchemeForm: React.FC<SchemeFormProps> = ({
  edit,
  editData,
  cid,
}) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, setIsPending] = useState(false);
  const [categories, setCategories] = useState<
    z.infer<typeof CategorySchema>[] | undefined
  >(undefined);

  const [ImageUrl, setImageUrl] = React.useState<string | null>(
    editData?.imageUrl ?? null
  );

  useEffect(() => {
    async function FetchCategory() {
      const response = await GetCategoryData();
      if (!!response.success && response.categories) {
        setCategories(response.categories as z.infer<typeof CategorySchema>[]);
      }
    }

    FetchCategory();
  }, []);

  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const { toast } = useToast();

  const handleImageInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("dir", "services");

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
        form.setValue("imageUrl", response.data.result.url);
        setImageUrl(response.data.result.url);
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

  const form = useForm<z.infer<typeof ServiceSchema>>({
    resolver: zodResolver(ServiceSchema),
    defaultValues: {
      name: editData?.name ?? "",
      text: editData?.text ?? "",
      status: editData?.status ?? true,
      imageUrl: editData?.imageUrl ?? "",
      categoryId: editData?.categoryId ?? cid,
    },
  });

  const onEdit = async (data: z.infer<typeof ServiceSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    setIsPending(true);

    try {

      console.log("validatedData",data)
      const response = await updateService(editData?.id as string, data);

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
  const onSubmit = async (data: z.infer<typeof ServiceSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    setIsPending(true);

    try {
      const response = await createService(data);

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
                <Label htmlFor={field.name}>Service Name</Label>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Name of service"
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
                    <Label htmlFor={field.name}>Service Status</Label>
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
            name="categoryId"
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
                        <SelectValue placeholder="Select a Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                     {
                        categories && categories.map((category) => (
                          <SelectItem key={category.id} value={category.id as string}>
                            {category.name}
                          </SelectItem>
                        ))
                     }

                  
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          {isUploading && <Progress value={uploadProgress} />}
          <FormField
            name="imageUrl"
            control={form.control}
            render={() => (
              <FormItem>
                <Label htmlFor="categoryImageUrl">Service Image</Label>
                <FormControl>
                  <Input
                    type="file"
                    onChange={handleImageInputChange}
                    className="h-10 autofill-bg-blue focus-visible:border-green-700 focus-visible:ring-green-700"
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          {ImageUrl && (
            <div className="mt-4 rounded-sm p-1 flex justify-center">
              <Image
                height={100}
                width={200}
                src={ImageUrl as string}
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
                <Label htmlFor={field.name}>Service Description</Label>
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
            "Save Service"
          ) : (
            "Add Service"
          )}
        </Button>
      </form>
    </Form>
  );
};
