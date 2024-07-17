"use server";
import { getUserByEmail } from '@/data/user';
import { db } from '@/lib/db';
import { dec } from '@/lib/enc-dec';
import { hashPassword } from '@/lib/utils';
import { ResetPasswordSchema } from '@/schemas';
import * as z from 'zod'
export const changePassword = async (values: z.infer<typeof ResetPasswordSchema>, emailCipher: string) => {

    const email = dec(emailCipher);
    try {
        const isValidFields = ResetPasswordSchema.parse(values);

        if (isValidFields.password !== isValidFields.confirmPassword) return { error: "Password and Confirm Password did not match" }
        const user = await getUserByEmail(email);
        if (!user) return { error: "Forbidden!!" }

        const hashPass = await hashPassword(isValidFields.password);

        await db.user.update({
            where: { id: user.id },
            data: {
                passwordHash: hashPass
            }
        })

        return { success: "password changed successfully,." }

    } catch (ex) {
        console.error(ex)
        if (ex instanceof z.ZodError) {
            return { error: ex.message }
        }

        return { error: "something went wrong!!" }
    }
}