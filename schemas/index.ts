import * as z from 'zod';

export const LoginSchema = z.object({
    identifier: z.string().email({
        message: "Credentials is Requried"
    }),
    verifier: z.string().min(1,{
        message: "Credentials is Required"
    })
})

export const ForgotSchema = z.object({
    identifier: z.string().email({
        message: "Email is Requried"
    }),
})



export const ResetPasswordSchema = z.object({
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], 
});


export const contactFormSchema = z.object({
  name: z.string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name can't exceed 100 characters" }),
  email: z.string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  subject: z.string()
    .min(1, { message: "Subject is required" })
    .max(150, { message: "Subject can't exceed 150 characters" }),
  message: z.string()
    .min(1, { message: "Message is required" })
    .max(1000, { message: "Message can't exceed 1000 characters" }),
});
