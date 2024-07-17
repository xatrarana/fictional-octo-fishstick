import credentials from "next-auth/providers/credentials"
import { LoginSchema } from "@/schemas"
import {  getUserVerificationMethods } from "@/data/user"
import type { NextAuthConfig } from "next-auth"
import { verifyPasswordhash } from "./lib/utils"

export default { 
    providers: [
        credentials({
        async authorize(credentials){
            try {
                const validatedFields =  LoginSchema.safeParse(credentials);

                if(!validatedFields.success) return null;

                const user = await getUserVerificationMethods(validatedFields.data.identifier);
                if(!user || !user.passwordHash)return null;


                const isValidPassword = await verifyPasswordhash(validatedFields.data.verifier,user.passwordHash);
                if(!isValidPassword) return null;

                return user;
            } catch (error) {
                return null;
            }
        }
    }),
] 
} satisfies NextAuthConfig


