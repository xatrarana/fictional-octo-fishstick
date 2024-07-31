
import { dir } from 'console';
import { use } from 'react';
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
  port: z.union([z.string(), z.number(), z.undefined()]),
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
  enabled: z.boolean().default(true).optional(),
});



export const positionFormSchema = z.object({
  name: z.string().min(1, 'Designation or Position name is required'),

})


export const memberFormSchema  = z.object({
  organizationTeamId: z.string().min(1, 'Organization is required'),  
  positionId: z.string().min(1, 'Position is required'),
  name: z.string().min(1, 'Name is required'),
  displayOrder: z.string().optional(),
  avatarUrl: z.string().optional(),
})


export const teamFromSchema = z.object({
  name: z.string().min(1, 'Team name is required'),
  displayOrder: z.string().optional(),
  status: z.boolean().default(true).optional(),
    
})



export const OrganizationSchema = z.object({
  id: z.string().optional(), 
  name: z.string().max(50),
  email: z.string().email().max(255),
  phone: z.string().max(20),
  whatsappNumber: z.string().max(20).optional(),
  landline: z.string().max(20).optional(),
  address: z.string(),
  primaryLogoUrl: z.string().optional(),
  secondaryLogoUrl: z.string().optional(),
  facebookUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  instagramUrl: z.string().optional(),
  youtubeUrl: z.string().optional(),
  description: z.string(),
  paymentLogoUrl: z.string().optional(),
  paymentHeader: z.string().optional(),
  websiteUrl: z.string().optional(),
  contactPersonName: z.string().optional(),
  contactPersonEmail: z.string().email().optional(),
  contactPersonPhone: z.string().optional(),
  mapUrl: z.string().optional(),
  createdAt: z.date().optional().default(new Date()), 
  updatedAt: z.date().optional().default(new Date()),
});



export const CategorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1,"Name of category is required"), 
  slug: z.string().optional(), 
  status: z.boolean().default(true),  
  text: z.string().optional(), 
  categoryImageUrl: z.string().optional(),
});


export const ServiceSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1,"Service name is required"), 
  slug: z.string().optional(), 
  text: z.string().optional(),
  status: z.boolean().default(true),
  imageUrl: z.string().optional(),
  categoryId: z.string().min(1,"Invalid category ID"), 
});


export const noticeSchema = z.object({
  id: z.string().optional(),  
  title: z.string().max(100),
  fileUrl: z.string().optional(),
  status: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});




export const messageSchema = z.object({
  id: z.string().optional(),
  message: z.string().min(1, "Message is required"),
  memberId: z.string().min(1, "Member ID is required"),
  status: z.boolean().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),

});


export const gallerySchema = z.object({
  id: z.string().optional(),
  title: z.string().max(255),
  dir: z.string().optional(),
  slug: z.string().optional(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().default(new Date()),
});

export const imageSchema = z.object({
  id: z.string().optional(),  
  url: z.string().optional(),
  altText: z.string().optional(),
  updatedAt: z.date().optional(),
});


export const useUpdateSchema = z.object({
  id:z.string(),
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  username: z.string().min(1, "Username is required").optional(),
})