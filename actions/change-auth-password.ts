"use server";
import { auth } from '@/auth';
import { seedData } from '@/data/seed';
import { db } from '@/lib/db';
import { hashPassword } from '@/lib/utils';
import { changePasswordSchema } from '@/schemas';
import * as z from 'zod';

export async function changeAuthPassword(values: z.infer<typeof changePasswordSchema>){
    const session = await auth();
    if(!session) return { error: "Unauthorized!!" };

    if(values.newPassword !== values.confirmPassword) return { error: "Password and Confirm Password did not match" }
    try {
        const password = await hashPassword(values.newPassword);

        await db.user.update({
            where: { id: session.user?.id },
            data:{
                passwordHash: password
            }
        })

        return { success: "Password changed successfully" }
    } catch (error) {
        console.error(error)
        return { error: "Something went wrong" }
    }
}