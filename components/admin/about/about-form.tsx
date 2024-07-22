"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { aboutSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { About } from "@prisma/client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { updateAbout } from "@/actions/about";
import { useToast } from "@/components/ui/use-toast";


const Editor = dynamic(() => import("./editor"), { ssr: false });

type AboutFormProps = {
  data: About | null;
};
const AboutForm: React.FC<AboutFormProps> = ({ data }) => {
  const {toast} = useToast()
  const form = useForm<z.infer<typeof aboutSchema>>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      title: data?.title ?? "",
      content: data?.content ?? "",
      mission: data?.mission ?? "",
      vission: data?.vission ?? "",
    },
  });

  

  const onSubmit = async (data: z.infer<typeof aboutSchema>) => {
      try {
       const response =  await updateAbout(data);

       if(!!response.success){
        toast({
          title: "About Action",
          description: response.success,
        })
       }

       if(!!response.error){
        toast({
          title: "About Error",
          description: response.error,
        })
       }

      } catch (error) {
        toast({
          title: "About Error",
          description: "An error occured",
        })
      }    
  };

  return (
    <div className="space-y-6 p-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-2">
          <div className="space-y-4">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <FormField
              name="content"
              control={form.control}
              render={({ field:{onChange} }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Editor
                      onChange={onChange}
                      name="content"
                      id="content"
                      key={data?.id}
                      initialContent={data?.content}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <FormField
              name="vission"
              control={form.control}
              render={({ field:{onChange} }) => (
                <FormItem>
                  <FormLabel>Vision</FormLabel>
                  <FormControl>
                  <Editor
                      onChange={onChange}
                      name="vission"
                      id="vission"
                      key={data?.id}
                      initialContent={data?.vission}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <FormField
              name="mission"
              control={form.control}
              render={({ field:{onChange} }) => (
                <FormItem>
                  <FormLabel>Mission</FormLabel>
                  <FormControl>
                  <Editor
                      onChange={onChange}
                      name="mission"
                      id="mission"
                      key={data?.id}
                      initialContent={data?.mission}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <Button className="w-full bg-green-800 hover:bg-green-700" type="submit">Save Details</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AboutForm;
