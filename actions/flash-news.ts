'use server';

import { db } from "@/lib/db";
import { createFlashNewsSchema } from "@/schemas";
import * as z from "zod";


export async function SaveFlashNews(values:z.infer<typeof createFlashNewsSchema>) {
    try {
        const isValid = createFlashNewsSchema.parse(values);

        const {message} = isValid;

        const flashNews = await db.flashNews.create({
            data: {
                message,
                createdAt: new Date(),
            }
        });


        return {success:"Flash news added successfully.", flashNews};
    } catch (error) {
        if(error instanceof z.ZodError) throw new Error(error.errors[0].message);

        throw new Error("Error submitting form. Please try again.");
    }
}

export async function GetFlashNews() {
    const flashNews = await db.flashNews.findMany({
        orderBy: {createdAt: "desc"}
    });

    if(!flashNews) return [];

    return flashNews;

}


export async function DeleteFlashNews(id:number) {
    const flashNews = await db.flashNews.delete({
        where: {id}
    });

    if(!flashNews) throw new Error("Flash news not found.");

    return {success:"Flash news deleted successfully.", flashNews};
}

export async function UpdateFlashNews(id:number, values:z.infer<typeof createFlashNewsSchema>) {
    try {
        const isValid = createFlashNewsSchema.parse(values);

        const {message} = isValid;

        const flashNews = await db.flashNews.update({
            where: {id},
            data: {
                message,
                updatedAt: new Date(),
            }
        });

        if(!flashNews) throw new Error("Flash news not found.");

        return {success:"Flash news updated successfully.", flashNews};
    } catch (error) {
        if(error instanceof z.ZodError) throw new Error(error.errors[0].message);

        throw new Error("Error submitting form. Please try again.");
    }
}