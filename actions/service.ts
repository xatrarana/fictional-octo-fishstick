"use server";

import { db } from '@/lib/db';
import { generateSlug } from '@/lib/utils';
import { ServiceSchema } from '@/schemas';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as z from 'zod';

async function createService(data: z.infer<typeof ServiceSchema>) {
    try {
        const validatedData = ServiceSchema.parse(data);
        const slug = validatedData.name.split(' ').join('-').toLowerCase();

        const service = await db.service.create({
            data: {
                name: validatedData.name,
                slug,
                status: validatedData.status,
                text: validatedData.text,
                imageUrl: validatedData.imageUrl,
                categoryId: validatedData.categoryId,
            },
        });
        return {success:"Service created successfully",service};

    } catch (error) {
        if (error instanceof z.ZodError) {
            return { error: `Validation error: ${error.errors.map(e => e.message).join(', ')}` };
        }
        if (error instanceof PrismaClientKnownRequestError) {
            return { error: `Database error: ${error.message}` };
        }
        return { error: 'Could not create service' };
    }
}

async function getServiceById(id: string) {
    try {
        const service = await db.service.findUnique({
            where: { id },
        });
        if (!service) throw new Error('Service not found');
        return {success:true,service};
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'Could not retrieve service' };
    }
}

async function updateService(id: string, data: z.infer<typeof ServiceSchema>) {
    try {
        const validatedData = ServiceSchema.parse(data);
        const slug = validatedData.name.split(' ').join('-').toLowerCase();



        const service = await db.service.update({
            where: { id },
            data: {
                name: validatedData.name,
                slug,
                text: validatedData.text,
                status: validatedData.status,
                imageUrl: validatedData.imageUrl,
                categoryId: validatedData.categoryId,
            },
        });
        return {success:"Service updated successfully",service};
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { error: `Validation error: ${error.errors.map(e => e.message).join(', ')}` };
        }
        if (error instanceof PrismaClientKnownRequestError) {
            return { error: `Database error: ${error.message}` };
        }
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'Could not update service' };
    }
}

async function deleteService(id: string) {
    try {
        const service = await db.service.delete({
            where: { id },
        });
        return {success:true,message:"Service deleted successfully",service};
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return { error: `Database error: ${error.message}` };
        }
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'Could not delete service' };
    }
}

async function GetServicesWithPagination(page: number = 1, limit: number = 10,categoryId:string) {
    try {
        if (page <= 0) page = 1;
        if (limit <= 0) limit = 10;

        const skip = (page - 1) * limit;

        const [schems, totalCount] = await Promise.all([
            db.service.findMany({
                where: { categoryId },
                skip: skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
               
            }),
            db.member.count() 
        ]);

        return {
            success: 'Schemes found',
            schems,
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

export { createService, getServiceById, updateService, deleteService,GetServicesWithPagination };
