'use server';

import { db } from '@/lib/db';
import { useUpdateSchema } from '@/schemas';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as z from 'zod';
export async function updateUser(values:z.infer<typeof useUpdateSchema>) {
   
    try {
    const valid = useUpdateSchema.safeParse(values);

        if (!valid.success) {
            throw new Error(valid.error.message);
        }

        const {data} = valid;

        const user = await db.user.findFirst({
            where: {
                id: data.id,
            }
        });

        if(!user) throw new Error("User not found");
        const updateUser = await db.user.update({
            where: {id: user.id},
            data: {
                ...data
            }
        })

        if(!updateUser) throw new Error("An error occurred while updating user");


        return {success:"Profile updated successfully.",data: updateUser};
    } catch (error) {
        
        if(error instanceof Error){
            return {error: error.message};
        }
        if(error instanceof z.ZodError){
            return {error: error.message};
        }

        if(error instanceof PrismaClientKnownRequestError){
            return {error: error.message};
        }

        return {error: "An error occurred while updating user"};
    }
}