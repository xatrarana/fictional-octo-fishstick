'use server';
import { testInquiryTemplate } from '@/constant/test-template';
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

     const data =    {
            name: enquiry.name,
            email: enquiry.email,
            subject: enquiry.subject,
            message: enquiry.message
        }

        const connection = await getFirstSmtpConnection();
        const mail = testInquiryTemplate(data);
        await sendMail(
            connection?.to ?? process.env.SMTP_TO_EMAIL as string,
            enquiry.email,
            `Enquiry Mail - ${enquiry.subject}`,
            mail,
        )

        return {success: "Your enquiry has been submitted"};
    } catch (ex) {
        if(ex instanceof zod.ZodError) return {error: ex.message};
        return {error: "An error occurred. Please try again later."};
    }
}