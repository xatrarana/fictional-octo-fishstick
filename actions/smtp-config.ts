"use server";
import { db } from "@/lib/db";
import { smtpFormSchema } from "@/schemas";
import * as z from "zod";
export async function smtpSave(values:z.infer<typeof smtpFormSchema>) {

    try {
        const isValidFields = smtpFormSchema.parse(values);

        const defaultSmtp = await db.smtp.findFirst();
        
        if(defaultSmtp){
            await db.smtp.update({
                where:{
                    id:defaultSmtp.id
                },
                data:isValidFields
            })

            return { success: "SMTP updated Successfully" }
        }

        await db.smtp.create({
            data:isValidFields
        })

        return { success: "SMTP Configured Successfully" }
    } catch (error) {
        if(error instanceof z.ZodError) return {error: error.message};
        return {error:"Something went wrong while saving credentials."}
    }
}


export async function getSmtpConfig() {
    try {
        const configuration = await db.smtp.findFirst();
        return configuration;
    } catch (error) {
        throw new Error("Something went wrong");
    }
}