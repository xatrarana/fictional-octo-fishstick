"use client";
import { useForm } from "react-hook-form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormItem, FormMessage, FormField, FormControl } from "@/components/ui/form";
import { ForgotSchema, ResetPasswordSchema } from "@/schemas";
import * as z from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormErorr } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useState, useTransition } from "react";
import { changePassword } from "@/actions/change-password";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export const RestForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const [isDisabled, setIsDisabled] = useState(false);
    const searchParams =  useSearchParams();
    const sid = searchParams.get("sid") as string;
    const router = useRouter()

    const form = useForm<z.infer<typeof ResetPasswordSchema>>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword:""
        }
    });

  
    const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
        setError("");
        setSuccess("");
        setIsDisabled(true);
       
        startTransition(() => {
            changePassword(values,sid).then((data) => {
                if (data && data.error) {
                    setError(data.error);
                    setIsDisabled(false)
                }
                if (data && data.success) {
                    setSuccess(data.success);
                    router.replace("/auth/login")
                }
            });
        });
    };

    return (
        <CardWrapper showHeader headerLabel="New Password" backButtonLabel="Back to Login?" backButtonHref="/auth/login">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending || isDisabled}
                                            type="password"
                                            placeholder="password"
                                            className="h-10 autofill-bg-blue focus-visible:border-blue-500 focus-visible:ring-blue-500"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                          <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending || isDisabled}
                                            type="password"
                                            placeholder="confirm password"
                                            className="h-10 autofill-bg-blue focus-visible:border-blue-500 focus-visible:ring-blue-500"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormErorr message={error} />
                    <FormSuccess message={success} />


                    <Button
                        type="submit"
                        className="w-full bg-green-800 hover:bg-green-700"
                        disabled={isPending || isDisabled}
                        size={"lg"}
                    >
                        {isPending ? <span className="loading loading-dots loading-md"></span> : "Change Password"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
