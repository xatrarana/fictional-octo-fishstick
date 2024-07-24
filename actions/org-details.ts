'use server';
import { db } from "@/lib/db";
import { OrganizationSchema } from "@/schemas";
import * as z from 'zod'

export async function SaveDetails(values:z.infer<typeof OrganizationSchema>) {
    try {

        const isvalid = OrganizationSchema.parse(values);

        const firstValue = await db.organization.findFirst()

        if(!firstValue) {
            const org = await db.organization.create({
                data: isvalid
            })

            return {success: true, message: "Organization details saved successfully", org}
        }

        const org = await db.organization.update({
            where: {id: firstValue.id},
            data: {
                ...isvalid
            }
        })


        return {success: true, message: "Organization details updated successfully", org}
        
    } catch (error) {
        console.error(error);   
        if(error instanceof z.ZodError){
            throw error.message;
        }



        throw new Error("Something went wrong! Please try again later.");
    }
}


export async function GetDetails() {
    try {
        const details = await db.organization.findFirst()

        return details;
    } catch (error) {
        console.error(error);   
        throw new Error("Something went wrong! Please try again later.");
        
    }
}