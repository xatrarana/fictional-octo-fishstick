'use server';
import { getFirstSmtpConnection } from '@/data/smtp';
import { db } from '@/lib/db';
import { sendMail } from '@/lib/mail';
import { contactFormSchema } from '@/schemas';
import * as zod from 'zod';
export async function submitEnquiry(values: zod.infer<typeof contactFormSchema>){
    const validValues = contactFormSchema.parse(values);
    try {
        const enquiry = await db.enquiry.create({
            data: {
                name: validValues.name,
                email: validValues.email,
                subject: validValues.subject,
                message: validValues.message,
                createdAt: new Date().toISOString()
            }
        })

        const connection = await getFirstSmtpConnection();
        
        await sendMail(
            connection?.to ?? "",
            enquiry.email,
            enquiry.subject,
            enquiry.message,
        )

        return {success: "Your enquiry has been submitted"};
    } catch (ex) {
        if(ex instanceof zod.ZodError) return {error: ex.message};
        return {error: "An error occurred. Please try again later."};
    }
}