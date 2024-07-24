'use server';
import { db } from '@/lib/db';
import { generateSlug } from '@/lib/utils';
import { positionFormSchema } from '@/schemas';
import exp from 'constants';
import * as z from 'zod';

export async function SaveDesignation(data: z.infer<typeof positionFormSchema>) {
  
    try {
        const isValid = positionFormSchema.parse(data);
        const slug = generateSlug(isValid.name);


        const isExist = await db.position.findFirst({
            where: {slug}
        })

        if(isExist){
            return {error: 'Designation already exists'}
        }

        const designation = await db.position.create({
            data: {
                name: isValid.name,
                slug
            }
        
        })

        return {
            success: 'Designation added successfully',
            designation
        }
    } catch (error) {
        if(error instanceof z.ZodError){
            return {
                error: error.message
            }
        }

        return {error: 'Error submitting form. Please try again.'}
    }
}



export async function UpdateDesignation(id: string, data: z.infer<typeof positionFormSchema>) {
    try {
        
        const isValid = positionFormSchema.parse(data);
        const slug = generateSlug(isValid.name);

        const isExist = await db.position.findFirst({
            where: {id}
        })

        if(!isExist){
            return {error: 'Designation not found!'}
        }

        const designation = await db.position.update({
            where: {id:isExist.id},
            data: {
                name: isValid.name,
                slug
            }
        })

        return {
            success: 'Designation updated successfully',
            designation
        }
    } catch (error) {
        if(error instanceof z.ZodError){
            return {
                error: error.message
            }
        }

        return {error: 'Error submitting form. Please try again.'}
    }
}


export async function DeleteDesignation(id: string) {
    try {
        const isExist = await db.position.findFirst({
            where: {id},
            include: {
                members: true
            }
        })

        if(!isExist){
            return {error: 'Designation not found!'}
        }

        if(isExist.members.length > 0){
            return {error: 'Designation has members. Please remove members before deleting designation.'}
        }

        await db.position.delete({
            where: {id:isExist.id}
        })

        return {
            success: 'Designation deleted successfully'
        }
    } catch (error) {
        return {error: 'Error submitting form. Please try again.'}
    }
}


export async function GetDesignationById(id: string) {
    try {
        
        const isExist = await db.position.findFirst({
            where: {id}
        })

        if(!isExist){
            return {error: 'Designation not found!'}
        }

        return {
            success: 'Designation found',
            designation: isExist
        }
    } catch (error) {
        return {error: 'Something went wrong. Please try again.'}
        
    }
}


export async function GetDesignations() {
    try {
        
        const designations = await db.position.findMany()

        return {
            success: 'Designations found',
            designations
        }
    } catch (error) {
        return {error: 'Something went wrong. Please try again.'}
        
    }
}

export async function GetDesignationsWithPagination(page: number = 1, limit: number = 10) {
    try {
        if (page <= 0) page = 1;
        if (limit <= 0) limit = 10;

        const skip = (page - 1) * limit;

        const [designations, totalCount] = await Promise.all([
            db.position.findMany({
                skip: skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            db.position.count() 
        ]);

        return {
            success: 'Designations found',
            designations,
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