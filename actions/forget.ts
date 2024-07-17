"use server";

import { RestPasswordTemplate } from "@/constant/rest-template";
import { getUserVerificationMethods } from "@/data/user";
import { enc } from "@/lib/enc-dec";
import { sendMail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { ForgotSchema } from "@/schemas";
import * as z from 'zod'

export const forgot = async (values: z.infer<typeof ForgotSchema>) => {

    const validatedFields = ForgotSchema.safeParse(values);
    if (!validatedFields.success) {

        return { error: "Invalid Fields!" };
    }


    const { identifier } = validatedFields.data;

    const existingUser = await getUserVerificationMethods(identifier);
    if (!existingUser || !existingUser.email || !existingUser.passwordHash) {
        return { error: "No associated account found!" };
    }

    try {

        const token = await generateVerificationToken(existingUser.email)
        const cipherToken = enc(token?.token as string)
        const link = `${process.env.NEXT_PUBLIC_URL}/auth/verify?vid=${cipherToken}`
        const html = RestPasswordTemplate(token?.email as string, link, "Trijyoti")

        await sendMail(
            token?.email as string,
            process.env.SMTP_FROM as string,
            "Password Reset Link",
            html
        );
        return { success: "Rest Link send has sent to your account." }

    } catch (error) {
        throw error;
    }

}
