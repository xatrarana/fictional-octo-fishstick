import { RestPasswordTemplate } from '@/constant/rest-template';
import { SocketAddress } from 'net';
import { serverHooks } from 'next/dist/server/app-render/entry-base';
import { Port_Lligat_Sans } from 'next/font/google';
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



export const smtpFormSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  servername: z.string().min(1, 'Servername is required'),
  displayname: z.string().min(1, 'Displayname is required'),
  port: z.number().positive('Port must be a positive number'),
  fromEmail: z.string().email('Invalid email format for fromEmail'),
  toEmail: z.string().email('Invalid email format for toEmail').optional(),
});


export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "New password must be at least 8 characters long"),
  confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters long"),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "New password and confirm password must match",
  path: ["confirmPassword"],
});

export const bannerSchema = z.object({
  title: z.string().min(1, "Title is required"),
  imageUrl: z.string().optional(),
});



export const aboutSchema = z.object({
  title: z.string(),
  content: z.string(),
  mission: z.string().optional(),
  vission: z.string().optional(),
});




export const createFlashNewsSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty'),
});