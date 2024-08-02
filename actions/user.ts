'use server';

import { db } from '@/lib/db';
import { hashPassword } from '@/lib/utils';
import { RegistrationSchema, useUpdateSchema } from '@/schemas';
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



export async function createUser(values: z.infer<typeof RegistrationSchema>){
    try {
        const validation = RegistrationSchema.safeParse(values);

        if(!validation.success){
            throw new Error(validation.error.message);
        }

        const {data} = validation;

        const role = await db.role.findFirst({
            where: { 
                id: Number(data.roleId)
            }
        });

        const isExistingUser = await db.user.findFirst({
            where: {
                username: data.username
            }
        });

        if(isExistingUser) throw new Error("Username already exists");

        const hash = await hashPassword(data.password);

        if(!role) throw new Error("Role not found");

        const user = await db.user.create({
            data: {
                email: data.email,
                name: data.name.trim(),
                username: data.username?.trim(),
                passwordHash: hash,
                roleId: role.id,
                createdAt: new Date(),
                
            }
        });


        if(!user) throw new Error("An error occurred while creating user");

        return {success: "User created successfully", data: user};

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

        return {error: "An error occurred while creating user"};
    }
}


export async function GetUsersWithPagination(page: number = 1, limit: number = 10) {
    try {
        if (page <= 0) page = 1;
        if (limit <= 0) limit = 10;

        const skip = (page - 1) * limit;

        const [users, totalCount] = await Promise.all([
            db.user.findMany({
                skip: skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    Role: true
                }
            }),
            db.user.count() 
        ]);

        return {
            success: 'Usersfound',
            users,
            pagination: {
                total: totalCount,
                page,
                limit,
                totalPages: Math.ceil(totalCount / limit),
            },
        };
    } catch (error) {
        return { error: 'Something went wrong. Please try again.' };
    }
}


export async function DeleteUser(id: string) {
    try {
        const user = await db.user.findFirst({
            where: {
                id: id,
            }
        });

        if(!user) throw new Error("User not found");

        const deleteUser = await db.user.delete({
            where: {id: user.id}
        })

        if(!deleteUser) throw new Error("An error occurred while deleting user");

        return {success:"User deleted successfully."};
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

        return {error: "An error occurred while deleting user"};
    }
}



export async function changePasswordByAdmin(values:{id:string,password:string}){
    try {
        const hash = await hashPassword(values.password);

        const user = await db.user.findFirst({
            where: {
                id: values.id
            }
        });

        if(!user) throw new Error("User not found");

        const updateUser = await db.user.update({
            where: {id: user.id},
            data: {
                passwordHash: hash
            }
        });

        if(!updateUser) throw new Error("An error occurred while updating user password");

        return {success:"Password updated successfully."};
    } catch (error) {
        if(error instanceof Error){
            return {error: error.message};
        }

        if(error instanceof PrismaClientKnownRequestError){
            return {error: error.message};
        }

        return {error: "An error occurred while updating user password"};
    }
}