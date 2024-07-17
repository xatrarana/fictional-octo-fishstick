"use server";
import { DEFAULT_LOGIN_REDIRECT_URL } from '@/route';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import { signIn } from '@/auth';
import * as z from 'zod';
import { getUserByEmail, getUserVerificationMethods } from '@/data/user';

export const login = async (values:z.infer<typeof LoginSchema>) => {
    
    const validatedFields = LoginSchema.safeParse(values);
    if(!validatedFields.success) {
        
        return {error: "Invalid Fields!"};
    }


    const {identifier, verifier} = validatedFields.data;

    const existingUser = await getUserVerificationMethods(identifier);
    if(!existingUser || !existingUser.email || !existingUser.passwordHash) {
        return {error: "No associated account found!"};
    }

    try {

       await signIn("credentials",{
            identifier,
            verifier,
            redirectTo: DEFAULT_LOGIN_REDIRECT_URL,
            redirect: true
        })
        return {success:"Loggedin"}
    } catch (error) {
        if(error instanceof AuthError) {
            switch(error.type){
                case "CredentialsSignin": 
                    return {error: "Invalid Credentials!"};
                case "CallbackRouteError": 
                    return {error: "Unable to Login! Re-check your credentials!"};
                default: 
                    return {error: "Something went wrong!"}
            }
        }
        throw error;
    }
    
}
