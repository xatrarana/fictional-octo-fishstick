"use client";
import { useForm } from "react-hook-form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormItem, FormMessage, FormField, FormControl } from "../ui/form";
import { ForgotSchema } from "@/schemas";
import * as z from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormErorr } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useState, useTransition, useEffect } from "react";
import { forgot } from "@/actions/forget";
import { useSearchParams } from "next/navigation";

export const ForgotForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const [isDisabled, setIsDisabled] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);

    const form = useForm<z.infer<typeof ForgotSchema>>({
        resolver: zodResolver(ForgotSchema),
        defaultValues: {
            identifier: "",
        }
    });

    useEffect(() => {
        if (remainingTime > 0) {
            const timer = setTimeout(() => setRemainingTime(remainingTime - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setIsDisabled(false);
        }
    }, [remainingTime]);

    const onSubmit = (values: z.infer<typeof ForgotSchema>) => {
        setError("");
        setSuccess("");
        setIsDisabled(true);
       

        startTransition(() => {
            forgot(values).then((data) => {
                if (data && data.error) {
                    setError(data.error);
                }
                if (data && data.success) {
                    setSuccess(data.success);
                    setRemainingTime(60); // 1 minute countdown
                }
            });
        });
    };

    return (
        <CardWrapper showHeader={false} headerLabel="Forgot Password" backButtonLabel="Back to Login?" backButtonHref="/auth/login">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="identifier"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending || isDisabled}
                                            type="text"
                                            placeholder="Email or Username"
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

                    {isDisabled && (
                        <div className="text-red-500">
                            Please wait {remainingTime} seconds before resubmitting.
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-green-800 hover:bg-green-700"
                        disabled={isPending || isDisabled}
                        size={"lg"}
                    >
                        {isPending ? <span className="loading loading-dots loading-md"></span> : "Request Reset"}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    );
};
