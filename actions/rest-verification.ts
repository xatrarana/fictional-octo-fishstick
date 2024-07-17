"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";
import { db } from "@/lib/db";
import { dec, enc } from "@/lib/enc-dec";

export async function resetTokenVerification(token:string) {
    const decryptToken = dec(token);
    try {
        const isValidToken = await getVerificationTokenByToken(decryptToken);
        if(!isValidToken) return {error:"Invalid Link!"}

        const hasExpired = new Date(isValidToken.expires) < new Date();

        if(hasExpired) return {error:"Link has been expired1"};


        const user = await getUserByEmail(isValidToken.email);

        if(!user) return {error: "Forbidden!!"}


        await db.verificationToken.delete({
            where: {id: isValidToken.id}
        })

        const emailCipher = enc(user.email);
        return {success: "Verification successfull.",action:true,sid:emailCipher}
    } catch (error) {
        console.error({error,component:"RestVerificationToken"})
        return {error: "Something went wrong!"}
    }
}