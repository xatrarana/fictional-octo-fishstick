"use client";
import { SaveDetails } from "@/actions/org-details";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import instance from "@/lib/axios";
import { OrganizationSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const Editor = dynamic(() => import("@/components/admin/about/editor"), {
  ssr: false,
});

type OrganizationFormProps = {
  data: z.infer<typeof OrganizationSchema> | null;
};

const OrganizationForm = ({ data }: OrganizationFormProps) => {
  const [priLogoUrl, setPriLogoUrl] = React.useState<string | null>(data?.primaryLogoUrl ?? null);
  const [secLogoUrl, setSecLogoUrl] = React.useState<string | null>(data?.secondaryLogoUrl ?? null);
  const [paymentLogoUrl, setPaymentLogoUrl] = React.useState<string | null>(data?.paymentLogoUrl ?? null);

  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const { toast } = useToast();

  const handlePriLogoInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setPriLogoUrl(imageUrl);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("dir", "logo");

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
        form.setValue("primaryLogoUrl", response.data.result.url);
        setPriLogoUrl(response.data.result.url);
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

  const handleSecLogoInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSecLogoUrl(imageUrl);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("dir", "logo");

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
        form.setValue("secondaryLogoUrl", response.data.result.url);
        setSecLogoUrl(response.data.result.url);
        toast({
            description: response.data.success ?? response.data.error,
        })
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
  const handlePaymentLogoInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setPaymentLogoUrl(imageUrl);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("dir", "payment");

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
        form.setValue("paymentLogoUrl", response.data.result.url);
        setPaymentLogoUrl(response.data.result.url);
        toast({
            description: response.data.success ?? response.data.error,
        })
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

  const form = useForm<z.infer<typeof OrganizationSchema>>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues:{
        ...data,
        facebookUrl: data?.facebookUrl ?? "",
        twitterUrl: data?.twitterUrl ?? "",
        instagramUrl: data?.instagramUrl ?? "",
        linkedinUrl: data?.linkedinUrl ?? "",
        youtubeUrl: data?.youtubeUrl ?? "",
        paymentLogoUrl: data?.paymentLogoUrl ?? "",
        primaryLogoUrl: data?.primaryLogoUrl ?? "",
        secondaryLogoUrl: data?.secondaryLogoUrl ?? "",
        mapUrl: data?.mapUrl ?? "",
        
    }
  });

  


  const onSubmit = async (data: z.infer<typeof OrganizationSchema>) => {
    try {
        
        const response = await SaveDetails(data);

        if(response.success){
            toast({
                variant: 'default',
                description: response.message,
            })
        }

        form.reset(response.org as z.infer<typeof OrganizationSchema>);
    } catch (error) {
        
        if (error instanceof Error) {
            toast({
                description: error.message,
            });
        }
      
        toast({
            description: "An error occurred. Please try again later",
        })
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* first section */}
        <Card className="p-2 space-y-4">
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Organization Name</Label>
                  <FormControl>
                    <Input {...field} placeholder="Organization name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Email</Label>
                  <FormControl>
                    <Input {...field} placeholder="Organization email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Phone</Label>
                  <FormControl>
                    <Input {...field} placeholder="Organization phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <FormField
              name="landline"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Landline</Label>
                  <FormControl>
                    <Input {...field} placeholder="Organization landline" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="websiteUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Website Url</Label>
                  <FormControl>
                    <Input {...field} placeholder="Organization website url" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="whatsappNumber"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Whatsapp Number </Label>
                  <FormControl>
                    <Input {...field} placeholder="Whatsapp number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="address"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Address</Label>
                  <FormControl>
                    <Textarea {...field} placeholder="Organization address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Card>
        {/* map section */}
        <Card className="space-y-3">
          <FormField
            name="mapUrl"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label>Map Url</Label>
                <FormControl>
                  <Textarea {...field} placeholder="Google map url" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>
        {/* second section */}
        <Card className="space-y-3">
          {isUploading && <Progress value={uploadProgress} />}
          <div className="p-2 grid grid-cols-1 md:lg:grid-cols-2 gap-3">
            <div className="space-y-4">
              <FormField
                name="primaryLogoUrl"
                control={form.control}
                render={() => (
                  <FormItem>
                    <Label>Primary Logo</Label>
                    <FormControl>
                      <Input type="file" onChange={handlePriLogoInputChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-6 ">
                {priLogoUrl && (
                  <div className="mt-4 rounded-sm p-1 flex justify-center">
                    <Image
                      height={100}
                      width={200}
                      src={priLogoUrl as string}
                      alt="Selected"
                      className="block w-auto h-auto rounded-sm"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <FormField
                name="secondaryLogoUrl"
                control={form.control}
                render={() => (
                  <FormItem>
                    <Label>Secondary Logo</Label>
                    <FormControl>
                      <Input type="file" onChange={handleSecLogoInputChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-6 ">
                {secLogoUrl && (
                  <div className="mt-4 rounded-sm p-1 flex justify-center">
                    <Image
                      height={100}
                      width={200}
                      src={secLogoUrl as string}
                      alt="Selected"
                      className="block w-auto h-auto rounded-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
       
        {/* Third section */}
        <Card className="p-2 space-y-4">
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <FormField
              name="contactPersonName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Contact Person Name</Label>
                  <FormControl>
                    <Input {...field} placeholder="Full name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="contactPersonEmail"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Contact Person Email</Label>
                  <FormControl>
                    <Input {...field} placeholder="Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="contactPersonPhone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Contact person phone</Label>
                  <FormControl>
                    <Input {...field} placeholder="Phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        
        </Card>

       {/* Fourth section */}

        <Card className="p-2 space-y-4">
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <Label>Small Description</Label>
                <FormControl>
                  <Editor
                    onChange={field.onChange}
                    name={field.name}
                    id={field.name}
                    initialContent={data?.description}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

          {/* Fifth section */}
          <Card className="p-2 space-y-4">
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <FormField
              name="facebookUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Facebook link</Label>
                  <FormControl>
                    <Input {...field} placeholder="url" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="twitterUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Twitter link</Label>
                  <FormControl>
                    <Input {...field} placeholder="url" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="instagramUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Instagram link</Label>
                  <FormControl>
                    <Input {...field} placeholder="url" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            <FormField
              name="linkedinUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Linkedin link</Label>
                  <FormControl>
                    <Input {...field} placeholder="url" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="youtubeUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Twitter link</Label>
                  <FormControl>
                    <Input {...field} placeholder="url" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          
          </div>
        
        </Card>

         {/* sixth section */}
         <Card className="space-y-3">
          {isUploading && <Progress value={uploadProgress} />}
          <div className="p-2 grid grid-cols-1 md:lg:grid-cols-2 gap-3">
          
              <FormField
                name="paymentHeader"
                control={form.control}
                render={({field}) => (
                  <FormItem>
                    <Label>Payment Header</Label>
                    <FormControl>
                      <Input {...field} placeholder="Payment title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <div className="space-y-4">
              <FormField
                name="paymentLogoUrl"
                control={form.control}
                render={() => (
                  <FormItem>
                    <Label>Payment QR</Label>
                    <FormControl>
                      <Input type="file" onChange={handlePaymentLogoInputChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-6 ">
                {paymentLogoUrl && (
                  <div className="mt-4 rounded-sm p-1 flex justify-center">
                    <Image
                      height={100}
                      width={200}
                      src={paymentLogoUrl as string}
                      alt="Selected"
                      className="block w-auto h-auto rounded-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>



        <div className="text-end">
                    <Button className="w-full bg-green-800 hover:bg-green-700" type="submit">Save details</Button>
        </div>
      </form>
    </Form>
  );
};

export default OrganizationForm;
