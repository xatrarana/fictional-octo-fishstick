"use server";
import { db } from "@/lib/db";
import { smtpFormSchema } from "@/schemas";
import * as z from "zod";
export async function smtpSave(values:z.infer<typeof smtpFormSchema>) {

    try {
        const isValidFields = smtpFormSchema.parse(values);

        
       const newSmtp =  await db.smtp.upsert({
            where: { username: isValidFields?.username},
          
              update: {
                username: isValidFields.username,
                password: isValidFields.password,
                servername: isValidFields.servername,
                port: isValidFields.port,
                fromEmail: isValidFields.fromEmail,
                toEmail: isValidFields.toEmail,
                displayname: isValidFields.displayname
              },
              create: {
                username: isValidFields.username,
                password: isValidFields.password,
                servername: isValidFields.servername,
                port: isValidFields.port,
                fromEmail: isValidFields.fromEmail,
                toEmail: isValidFields.toEmail,
                displayname: isValidFields.displayname
              }
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