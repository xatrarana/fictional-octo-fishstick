"use client";
import React, { Suspense, useState } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { noticeSchema } from "@/schemas";
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
import instance from "@/lib/axios";
import { AxiosError } from "axios";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { addNotice, updateNotice } from "@/actions/notice";

type NoticeFormProps = {
  edit?: boolean;
  editData?: z.infer<typeof noticeSchema>;
};

export const NoticeForm: React.FC<NoticeFormProps> = ({ edit, editData }) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, setIsPending] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(
    editData?.fileUrl ?? null
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileType, setFileType] = useState<string | null>(null); // New state for file type

  const { toast } = useToast();

  const form = useForm<z.infer<typeof noticeSchema>>({
    resolver: zodResolver(noticeSchema),
    defaultValues: {
      title: editData?.title ?? "",
      status: editData?.status ?? true,
      fileUrl: editData?.fileUrl ?? "",
    },
  });

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setFileUrl(fileUrl);

    const extension = file.name.split(".").pop();
    if (["jpg", "jpeg", "png", "gif"].includes(extension || "")) {
      setFileType("image");
    } else if (["pdf"].includes(extension || "")) {
      setFileType("pdf");
    } else {
      setFileType("other");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("dir", "notice");

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
        form.setValue("fileUrl", response.data.result.url);
        setFileUrl(response.data.result.url);
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

  const onEdit = async (data: z.infer<typeof noticeSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    setIsPending(true);
    try {
      const response = await updateNotice(editData?.id!, data);
      if (!!response.success) {
        setSuccess(response.success);
        form.reset();
        setFileUrl(null);
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

  const onSubmit = async (data: z.infer<typeof noticeSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    setIsPending(true);

    try {
      const response = await addNotice(data);

      if (!!response.success) {
        setSuccess(response.success);
        form.reset();
        setFileUrl(null);

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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(edit ? onEdit : onSubmit)}
        className="space-y-6"
      >
        <div className="space-y-4">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label htmlFor={field.name}>Notice Title</Label>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Title of Notice"
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
                    <Label htmlFor={field.name}>Notice Status</Label>
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
            name="fileUrl"
            control={form.control}
            render={() => (
              <FormItem>
                <Label htmlFor="categoryImageUrl">File</Label>
                <FormControl>
                  <Input
                    type="file"
                    onChange={handleFileInputChange}
                    className="h-10 autofill-bg-blue focus-visible:border-green-700 focus-visible:ring-green-700"
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          {fileUrl && fileType === "image" && (
            <div className="mt-4 rounded-sm p-1 flex justify-center">
              {/* eslint-disable-next-line */}
              <img
                height={100}
                width={200}
                src={fileUrl as string}
                alt="Uploaded Image"
                className="block w-auto h-auto rounded-sm"
              />
            </div>
          )}
          {fileUrl && fileType === "pdf" && (
            <div className="mt-4 rounded-sm p-1 flex justify-center">
              <iframe
                src={fileUrl}
                width="100%"
                height="500"
                className="border rounded-sm"
                title="Uploaded PDF"
              />
            </div>
          )}
          {fileUrl && fileType === "other" && (
            <div className="mt-4 rounded-sm p-1 flex flex-col items-center">
              <p className="text-gray-500">Unsupported file type</p>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-2"
              >
                Download File
              </a>
            </div>
          )}
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
            "Save Notice"
          ) : (
            "Add Notice"
          )}
        </Button>
      </form>
    </Form>
  );
};
