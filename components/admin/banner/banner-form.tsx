"use client";
import React, { startTransition, useState, useTransition } from "react";
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
import { bannerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormErorr } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import instance from "@/lib/axios";
import { useRouter } from "next/navigation";

export const BannerAddDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className="px-3 rounded-md py-2 bg-green-800 hover:bg-green-700 text-white">Add Banner</DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Banner</DialogTitle>
        <DialogDescription>Add a new banner</DialogDescription>
        <div>
          <BannerForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};



const BannerForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  const form = useForm<z.infer<typeof bannerSchema>>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      title: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof bannerSchema>) => {
    setError(undefined);
    setSuccess(undefined);

    if (!file) {
      setError("Please select a file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("file", file);


     const response =  await instance.post("/api/slides", formData,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const result = response.data;
      if(result.success){ 
        setSuccess(result.success)
        setFile(null);
        form.reset();
        window.location.reload()
      };
      if(result.error) setError(result.error);
    } catch (error) {
      setError("Error submitting form. Please try again.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
    
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Name or Caption for Image"
                    className="h-10 autofill-bg-blue focus-visible:border-green-700 focus-visible:ring-green-700"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="imageUrl"
            control={form.control}
            render={() => (
              <FormItem>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="file-input file-input-bordered file-input-accent w-full autofill-bg-blue focus-visible:border-green-700 focus-visible:ring-green-700"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          {imagePreview && (
            <div className="mt-4">
              {/* eslint-disable-next-line */}
              <img src={imagePreview} alt="Image Preview" width={100} height={100} className="object-cover w-full rounded-md" />
            </div>
          )}
        </div>
        <FormErorr message={error} />
        <FormSuccess message={success} />

        <Button
          type="submit"
          className="w-full bg-green-800 hover:bg-green-700"
          disabled={isPending}
          size={"lg"}
        >
          {isPending ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            "Add Banner Image"
          )}
        </Button>
      </form>
    </Form>
  );
};

