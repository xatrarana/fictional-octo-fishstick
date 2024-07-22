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
import { Textarea } from "@/components/ui/textarea";
import { Editor } from "@tinymce/tinymce-react";

type AboutFormProps = {
  data: About | null;
};
const AboutForm: React.FC<AboutFormProps> = ({ data }) => {
    const contentRef = useRef<Editor | null>(null);
    const missionRef = useRef<Editor | null>(null);
  const [success, setForm] = React.useState<string | undefined>(undefined);
  const [error, setError] = React.useState<string | undefined>(undefined);
  const form = useForm<z.infer<typeof aboutSchema>>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      title: "",
      content: "",
      mission: "",
      vission: "",
    },
  });

  if (data) {
    form.reset(data);
  }

  useEffect(() =>{
    if(data){
        //@ts-ignore
        contentRef.current.setContent(data?.content || '');
    }

    if(contentRef.current){
        //@ts-ignore
        form.setValue('content', contentRef.current.getContent());
    }
  } ,[contentRef, missionRef]);

  const onSubmit = (data: z.infer<typeof aboutSchema>) => {

    console.log(data);
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Editor
                      apiKey="5ufnn6gw2zkk2cznypfqjx3cdowlv1pcbgxx9y7p8yee4ixn"
                      onInit={(evt, editor) => ((contentRef.current as any) = editor)}
                      init={{
                        plugins:
                          "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
                        toolbar:
                          "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                        tinycomments_mode: "embedded",
                        tinycomments_author: "Author name",
                        mergetags_list: [
                          { value: "First.Name", title: "First Name" },
                          { value: "Email", title: "Email" },
                        ],
                        ai_request: (request: any, respondWith: any) =>
                          respondWith.string(() =>
                            Promise.reject("See docs to implement AI Assistant")
                          ),
                      }}
                      initialValue="Welcome to TinyMCE!"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AboutForm;
