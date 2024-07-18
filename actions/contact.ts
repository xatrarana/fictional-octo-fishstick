'use server';
import { contactFormSchema } from '@/schemas';
import * as zod from 'zod';
export async function submitEnquiry(values: zod.infer<typeof contactFormSchema>){
    const validValues = contactFormSchema.parse(values);
    console.log(validValues);
    try {
        return {success: "Your enquiry has been submitted"};
    } catch (ex) {
        if(ex instanceof zod.ZodError) return {error: ex.message};
        return {error: "An error occurred"};
    }
}