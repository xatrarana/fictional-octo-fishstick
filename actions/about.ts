'use server';

import { db } from "@/lib/db";
import { aboutSchema } from "@/schemas";

import * as z from 'zod'
export const getAbouts = async () => {
    try {
        const abouts = await db.about.findFirst()
        return abouts
    } catch (error) {
        return null
    }
}




export const updateAbout = async (values: z.infer<typeof aboutSchema>) => {
    try {
        const validvalues = aboutSchema.parse(values);

        const about = await db.about.findFirst();
        
        if(about){
            await db.about.update({
                where: {
                    id: about.id
                },
                data: validvalues
            })

            return {success: "About updated successfully"}
        }

        await db.about.create({
            data: {
                title: validvalues.title,
                content: validvalues.content,
                mission: validvalues?.mission ?? "",
                vission: validvalues?.vission ?? ""
            }
        })

        return {success: "About updated successfully"}
        
    } catch (error) {
        
        if(error instanceof z.ZodError){
            return {error: error.message}
        }

        return {error: "An error occured "}
    }
}