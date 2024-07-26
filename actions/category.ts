"use server";

import { db } from '@/lib/db';
import { generateSlug } from '@/lib/utils';
import { CategorySchema } from '@/schemas';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as z from 'zod';

async function createCategory(data: z.infer<typeof CategorySchema>) {
    try {
        const validatedData = CategorySchema.parse(data);
        const slug = validatedData.name.split(' ').join('-').toLowerCase();

        const category = await db.category.create({
            data: {
                name: validatedData.name,
                slug,
                status: validatedData.status,
                text: validatedData.text,
                categoryImageUrl: validatedData.categoryImageUrl,
            },
        });
        return { success: "Category created successfully.", category };
    } catch (error) {
        if (error instanceof z.ZodError) {
            return { error: `Validation error: ${error.errors.map(e => e.message).join(', ')}` };
        }
        if (error instanceof PrismaClientKnownRequestError) {
            return { error: `Database error: ${error.message}` };
        }
        return { error: 'Could not create category' };
    }
}

async function getCategoryById(id: string) {
    try {
        const category = await db.category.findUnique({
            where: { id },
        });
        if (!category) throw new Error('Category not found');
        return { success: "Category found", category };
    } catch (error) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'Could not retrieve category' };
    }
}

async function updateCategory(id: string, data: z.infer<typeof CategorySchema>) {
    try {
        const validatedData = CategorySchema.parse(data);
        const slug = validatedData.name.split(' ').join('-').toLowerCase();

        const category = await db.category.update({
            where: { id },
            data: {
                name: validatedData.name,
                slug,
                status: validatedData.status,
                text: validatedData.text,
                categoryImageUrl: validatedData.categoryImageUrl,
            },
        });
        return { success: "Category updated successfully.", category };
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
        return { error: 'Could not update category' };
    }
}

async function deleteCategory(id: string) {
    try {
        const category = await db.category.findUnique({ where: { id }, include: { services: true } });
        if (!category) throw new Error('Category not found')

        if (category.services.length > 0) {
            return { error: "Category has services. Please delete services first." }
        }
        await db.category.delete({
            where: { id },
        });
        return { success: 'Category deleted successfully', category };
    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
            return { error: `Database error: ${error.message}` };
        }
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: 'Could not delete category' };
    }
}

async function GetCategoriesWithPagination(page: number = 1, limit: number = 10) {
    try {
        if (page <= 0) page = 1;
        if (limit <= 0) limit = 10;

        const skip = (page - 1) * limit;

        const [categories, totalCount] = await Promise.all([
            db.category.findMany({
                skip: skip,
                take: limit,
                orderBy: { createdAt: 'desc' },

            }),
            db.member.count()
        ]);

        return {
            success: 'Categories found',
            categories,
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


async function getCategories() {
    try {

        const categories = await db.category.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return { success: "Categories found", categories };

    } catch (error) {
        console.error('Error fetching groups:', error);
        return { error: "Error fetching groups", categories: [] }

    }

}


async function getServicesRelatedToCategory(id:string){
    try {

        const services = await db.service.findMany({
            orderBy: { createdAt: 'desc' },
            where: {
                categoryId: id
            },
            include:{category:true}
        });
        return { success: "Services found", services };

    } catch (error) {
        console.error('Error fetching services:', error);
        return { error: "Error fetching services", services: [] }

    }
}

export { getServicesRelatedToCategory,createCategory, getCategoryById, updateCategory, deleteCategory, getCategories, GetCategoriesWithPagination };
