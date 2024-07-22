"use client";
import { useForm } from "react-hook-form"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form,FormItem,FormMessage,FormField, FormControl } from "../ui/form"
import { LoginSchema } from "@/schemas"
import * as z from 'zod';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormErorr } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/constant/loading-spinner";

export const LoginForm = () => {
    const searchParams = useSearchParams();
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already in use with different provider!" : "";
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            identifier: "",
            verifier: ""
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        startTransition(async() => {
            login(values).
            then((data) => { 
                if(data && data.error){
                 setError(data.error);
                }
                if(data && data.success){
                    setSuccess(data.success);
                }
               
            })

        })
    }
    return <CardWrapper showHeader headerLabel="Welcome back" backButtonLabel="Forgot Password?" backButtonHref="/auth/forgot">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
                >
                    <div className="space-y-4">
                          <FormField 
                            control={form.control}
                            name="identifier"
                            render={({field}) =>(
                                <FormItem>
                                   <FormControl>
                                   <Input
                                    {...field}
                                    disabled={isPending}
                                    type="email"
                                    placeholder="Email or Username"
                                    className="h-10   autofill-bg-blue focus-visible:border-blue-500   focus-visible:ring-blue-500"
                                    />
                                   </FormControl>
                                   <FormMessage/>
                                </FormItem>
                            )}
                          />  
                          <FormField 
                            control={form.control}
                            name="verifier"
                            render={({field}) =>(
                                <FormItem>
                                   <FormControl>
                                   <Input
                                    {...field}
                                    disabled={isPending}
                                    type="password"
                                    placeholder="Password"
                                    className="h-10 autofill-bg-blue focus-visible:border-blue-500   focus-visible:ring-blue-500"
                                    />
                                   </FormControl>
                                   <FormMessage/>
                                </FormItem>
                            )}
                          />  
                    </div>

                    <FormErorr message={error || urlError}/>
                    <FormSuccess message={success}/>
                    <Button
                    type="submit"
                    className="w-full bg-green-800 hover:bg-green-700"
                    disabled={isPending}
                    size={"lg"}
                    >
                        {
                            isPending ? <LoadingSpinner/> : "Login"
                        }
                    </Button>
            </form>
        </Form>
    </CardWrapper>
}