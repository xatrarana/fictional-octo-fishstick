'use server';

import { db } from "@/lib/db";

export const getAbouts = async () => {
    try {
        const abouts = await db.about.findFirst()
        return abouts
    } catch (error) {
        return null
    }
}