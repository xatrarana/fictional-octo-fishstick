'use client';
import { FormErorr } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import instance from "@/lib/axios";
import { imageSchema } from "@/schemas";
import { Gallery } from "@/type";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const ImageForm = () => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [isPending, startTransition] = useTransition();



  
  
    const form = useForm<z.infer<typeof imageSchema>>({
      resolver: zodResolver(imageSchema),
      defaultValues: {
       altText: "",
       url: "",
      },
    });
  
    const onSubmit = async (data: z.infer<typeof imageSchema>) => {
      setError(undefined);
      setSuccess(undefined);
  
      if (!file) {
        setError("Please select a file.");
        return;
      }
  
      try {
        const formData = new FormData();
        formData.append("altText", data.altText || "");
        formData.append("file", file);
  
  
       const response =  await instance.post("/api/upload/image", formData,{
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
              name="altText"
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
              name="url"
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
              <div className="mt-4 flex items-center justify-center">
                <Image src={imagePreview} alt="Image Preview" width={200} height={100} className="object-cover rounded-md" />
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
              "Add Image"
            )}
          </Button>
        </form>
      </Form>
    );
  };
  
  