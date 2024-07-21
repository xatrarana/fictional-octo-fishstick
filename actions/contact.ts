'use server';
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
        await sendMail(
            validValues.email,
            "no-reply@tri-jyoit.coop.np",
            'Your enquiry has been submitted',
            `Thank you for your enquiry. We will get back to you as soon as possible.`,
        )

        return {success: "Your enquiry has been submitted"};
    } catch (ex) {
        if(ex instanceof zod.ZodError) return {error: ex.message};
        return {error: "An error occurred"};
    }
}