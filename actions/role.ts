'use server';

import { db } from "@/lib/db";

export async function getRoles(){
    try {
        const roles = await db.role.findMany()
        if(!roles) return []
        return roles
    } catch (error) {
        return []
    }
}