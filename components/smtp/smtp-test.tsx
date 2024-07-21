'use client';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from "../ui/button"
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import { FormErorr } from "../form-error";
import { sendMail } from "@/lib/mail";
import { testTemplate } from "@/constant/test-template";
import { testMail } from "@/actions/test-mail";
import { FormSuccess } from "../form-success";
  
  const SmtpTestContianer = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState<string | undefined>(undefined);
    const [success, setSuccess] = useState<string | undefined>(undefined);
    const handleConfigurationCheck = async () => {
        if(!emailRef.current?.value){
            emailRef.current?.focus();
            setError("Email is required");
        }

        if(emailRef.current?.value && !emailRef.current?.value.includes("@")){
            emailRef.current?.focus();
            setError("Email is invalid");
        }

        try {
                const response = await testMail(emailRef.current?.value as string);
                if(response.error) setError(response.error);
                if(response.success) setSuccess(response.success);
        } catch (error) {
            if(error instanceof Error) setError(error.message);
            else setError("Error sending email!. Please check your SMTP configuration");
        }

    }
    return (
        <Drawer>
        <DrawerTrigger className="bg-green-800 text-white py-1.5 px-3 rounded-md hover:bg-green-700">Test Mail</DrawerTrigger>
        <DrawerContent>
         <div className="mx-auto w-full max-w-md mt-4">
         <DrawerTitle>Test Configuration</DrawerTitle>
         <DrawerDescription className="mt-1">Enter the email address to test the SMTP configuration</DrawerDescription>
         <div className="flex flex-col gap-y-2 mt-3">
            <Input ref={emailRef} placeholder="Test Email" />
            <FormErorr message={error}/>
            <FormSuccess message={success}/>
         </div>
         <DrawerFooter className="flex-row float-right">
            <Button onClick={handleConfigurationCheck}>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
         </div>
        </DrawerContent>
      </Drawer>
      
    )
  }
  
  export default SmtpTestContianer