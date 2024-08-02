"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { memberFormSchema, teamFromSchema } from "@/schemas";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GetOrgGroups } from "@/actions/teams.group";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GetDesignations } from "@/actions/teams.position";
import Image from "next/image";
import { SaveMember, UpdateMember } from "@/actions/teams.member";
import instance from "@/lib/axios";
import { Progress } from "@/components/ui/progress";
import { AxiosError } from "axios";
import { Member, OrganizationTeam, Position } from "@/type";

export const MemberAddDialog = () => {
  return (
    <Dialog modal>
      <DialogTrigger className="px-3 rounded-md py-2 bg-green-800 text-sm hover:bg-green-700 text-white">
        Add Member
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogTitle>Add Organizational Member</DialogTitle>
        <DialogDescription>Fill below fields with details.</DialogDescription>
        <div>
          <MemberForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

type MemberFormProps = {
  edit?: boolean;
  editData?: Member;
};
export const MemberForm: React.FC<MemberFormProps> = ({ edit, editData }) => {

  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, setIsPending] = useState(false);

  const [teams, setTeams] = useState<OrganizationTeam[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(editData?.avatarUrl ?? null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const form = useForm<z.infer<typeof memberFormSchema>>({
    resolver: zodResolver(memberFormSchema),
    defaultValues: {
      name: editData?.name ?? "",
      displayOrder: editData?.displayOrder?.toString() ?? "",
      organizationTeamId: editData?.organizationTeamId ?? "",
      avatarUrl: editData?.avatarUrl ?? "",
      positionId: editData?.positionId ?? "",
    },
  });

  useEffect(() => {
    async function FetchGroup() {
      const response = await GetOrgGroups();
      if (!!response.success && response.group) {
        setTeams(response.group);
      }
    }

    FetchGroup();

    async function FetchDesignation() {
      const response = await GetDesignations();
      if (!!response.success && response.designations) {
        setPositions(response.designations);
      }
    }

    FetchDesignation();
  }, []);

  const onEdit = async (data: z.infer<typeof memberFormSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    setIsPending(true);

    try {
        const response = await UpdateMember(editData?.id!, data);
        if (!!response.success) setSuccess(response.success);
        if (!!response.error) setError(response.error);
    } catch (error) {
      if (error instanceof Error) setError(error.message);

      setError("Error submitting form. Please try again.");
    } finally {
      setIsPending(false);
    }
  };
  const onSubmit = async (data: z.infer<typeof memberFormSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    setIsPending(true);

    try {
        const response = await SaveMember(data);
        if (!!response.success) setSuccess(response.success);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      setError("Error submitting form. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

 

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(null);
      return;
    }

    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedImage(imageUrl);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("dir", "avatar");

    setIsUploading(true);

    try {
      const response = await instance.post("/api/teams/avatar", formData, {
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

      if(response.data.result.url){
        form.setValue("avatarUrl",response.data.result.url);
        setSelectedImage(response.data.result.url);
      }
    } catch (error) {
      if(error instanceof Error){
        setError(error.message);
      }
      if(error instanceof AxiosError){
        setError(error.response?.data.error);
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(edit ? onEdit : onSubmit)}
        className="space-y-6 grid grid-cols-1 md:lg:grid-cols-2 gap-6"
      >
        <div className="space-y-5">
          <div className="space-y-4">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Full Name"
                      className="h-10 autofill-bg-blue focus-visible:border-green-700 focus-visible:ring-green-700"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <FormField
              name="positionId"
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
                          <SelectValue placeholder="Select a Designation" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {positions.map((position) => {
                          return (
                            <SelectItem key={position.id} value={position.id}>
                              {position.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-4">
            <FormField
              name="organizationTeamId"
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
                          <SelectValue placeholder="Select a Group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {teams.map((team) => {
                          return (
                            <SelectItem key={team.id} value={team.id}>
                              {team.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormErorr message={error} />
          <FormSuccess message={success} />
        </div>
        <div>
          <div className="space-y-4">
            <FormField
              name="avatarUrl"
              control={form.control}
              render={() => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="file"
                      id="avatarUrl"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </FormControl>
                  <Label
                    htmlFor="avatarUrl"
                    className="flex items-center justify-center w-full cursor-pointer text-center h-16 text-muted-foreground border rounded-md  focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
                  >
                    Select Member Image
                  </Label>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-6 ">
            {selectedImage && (
              <div className="mt-4 rounded-sm p-1 flex justify-center">
                <Image
                  height={100}
                  width={200}
                  src={selectedImage}
                  alt="Selected"
                  className="block w-auto h-auto rounded-sm"
                />
              </div>
            )}

            {isUploading && <Progress value={uploadProgress} />}
          </div>
        </div>

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
