'use server';

import { testTemplate } from "@/constant/test-template";
import { sendMail } from "@/lib/mail";

export async function testMail(email: string){ 
        try {
            await sendMail(
                email,
                "Test Mail",
                "This is a test mail from the SMTP configuration",
                testTemplate
            );
            return {success:`Mail sent to ${email}`}
        } catch (error) {
            if(error instanceof Error) return {error: error.message}
            return {error: "Error sending email!. Please check your SMTP configuration"}
        }
}