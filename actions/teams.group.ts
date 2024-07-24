'use server';
import { db } from '@/lib/db';
import { generateSlug } from '@/lib/utils';
import { positionFormSchema, teamFromSchema } from '@/schemas';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as z from 'zod';

export async function SaveGroup(data: z.infer<typeof teamFromSchema>) {
  
    try {
        const isValid = teamFromSchema.parse(data);
        const slug = isValid.name.trim().split(' ').join('-').toLowerCase();


        const isExist = await db.organizationTeam.findFirst({
            where: {slug}
        })

        if(isExist){
            return {error: 'Group already exists'}
        }

        const group = await db.organizationTeam.create({
            data: {
                name: isValid.name,
                slug,
                displayOrder: Number(isValid.displayOrder),
                status: isValid.status,
            }
        
        })

        return {
            success: 'Group added successfully',
            group
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



export async function UpdateOrgGroup(id: string, data: z.infer<typeof teamFromSchema>) {
    try {
        
        const isValid = teamFromSchema.parse(data);
        const slug = isValid.name.trim().split(' ').join('-').toLowerCase();

        const isExist = await db.organizationTeam.findFirst({
            where: {id}
        })

        if(!isExist){
            return {error: 'Org Group not found!'}
        }

        const displayOrder = Number(isValid.displayOrder);

        const group = await db.organizationTeam.update({
            where: {id:isExist.id},
            data: {
                name: isValid.name,
                status: isValid.status,
                displayOrder: displayOrder,
                slug,
                updatedAt: new Date()
            }
        })

        return {
            success: 'Org Group updated successfully',
            group
        }
    } catch (error) {
        console.log(error)
        if(error instanceof z.ZodError){
            return {
                error: error.message
            }
        }

        if(error instanceof PrismaClientKnownRequestError){
            return {
                error: error.message
            }
        }

        return {error: 'Error updating the group. Please try again.'}
    }
}


export async function DeleteOrgGroup(id: string) {
    try {
        const isExist = await db.organizationTeam.findFirst({
            where: {id},
            include: {
                members: true
            }
        })

        if(!isExist){
            return {error: 'Org Group not found!'}
        }

        if(isExist.members.length > 0){
            return {error: 'Org Group has members. Please remove members before deleting Group.'}
        }

        await db.organizationTeam.delete({
            where: {id:isExist.id}
        })

        return {
            success: 'Group deleted successfully'
        }
    } catch (error) {
        return {error: 'Error deleting org group. Please try again.'}
    }
}


export async function GetGroupById(id: string) {
    try {
        
        const isExist = await db.organizationTeam.findFirst({
            where: {id}
        })

        if(!isExist){
            return {error: 'Org Group not found!'}
        }

        return {
            success: 'Org Group found',
            group: isExist
        }
    } catch (error) {
        return {error: 'Something went wrong. Please try again.'}
        
    }
}


export async function GetOrgGroups() {
    try {
        
        const group = await db.organizationTeam.findMany()

        return {
            success: 'Org Group found',
            group
        }
    } catch (error) {
        return {error: 'Something went wrong. Please try again.'}
        
    }
}

export async function GetOrgGroupWithPagination(page: number = 1, limit: number = 10) {
    try {
        if (page <= 0) page = 1;
        if (limit <= 0) limit = 10;

        const skip = (page - 1) * limit;

        const [groups, totalCount] = await Promise.all([
            db.organizationTeam.findMany({
                skip: skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            db.position.count() 
        ]);

        return {
            success: 'Org Groups found',
            groups,
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