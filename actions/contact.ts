'use server';
import { db } from '@/lib/db';
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
        return {success: "Your enquiry has been submitted"};
    } catch (ex) {
        if(ex instanceof zod.ZodError) return {error: ex.message};
        return {error: "An error occurred"};
    }
}