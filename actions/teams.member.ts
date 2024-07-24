'use server';

import { memberFormSchema, teamFromSchema } from "@/schemas";
import saveFile from "./_saveFile";

import * as z from 'zod';
import { db } from "@/lib/db";




export async function UploadMemberAvatar(file: File,dir:string){
    try {
        
        if(!file){
            throw new Error('Please provide a Image File');
        }

        if(!dir){
            throw new Error('Please provide a Directory');
        }

        const response = await saveFile(file,dir);

        console.log(response);

    } catch (error) {
        console.error('Error saving file:', error);
        throw new Error('File upload failed');
    }
}


export async function SaveMember(values:z.infer<typeof memberFormSchema>){
    try {

        const isValid = memberFormSchema.parse(values);


       
        const member = db.member.create({
            data:{
                name:isValid?.name.trim(),
                avatarUrl:isValid.avatarUrl,
                displayOrder:Number(isValid.displayOrder),
                organizationTeamId:isValid.organizationTeamId,
                positionId:isValid.positionId,
                createdAt:new Date(),
            }
        })


        return {success:'Member added successfully',member};

    } catch (error) {
        if(error instanceof z.ZodError){
            throw new Error(error.message);
        }
        throw new Error('Member save failed');
    }
}

export async function GetMembers() {
    try {
        
        const members = await db.member.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                position: true,
                organizationTeam: true
            }
        })

        return {
            success: 'Members found',
            members
        }
    } catch (error) {
        return {error: 'Something went wrong. Please try again.'}
        
    }
}

export async function GetMembersWithPagination(page: number = 1, limit: number = 10) {
    try {
        if (page <= 0) page = 1;
        if (limit <= 0) limit = 10;

        const skip = (page - 1) * limit;

        const [members, totalCount] = await Promise.all([
            db.member.findMany({
                skip: skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: {
                    position: true,
                    organizationTeam: true
                }
            }),
            db.member.count() 
        ]);

        return {
            success: 'Members found',
            members,
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



export async function DeleteMember(id: string) {
    try {
        const isExist = await db.member.findFirst({
            where: {id}
           
        })

        if(!isExist){
            return {error: 'Member not found!'}
        }

      
        await db.member.delete({
            where: {id:isExist.id}
        })

        return {
            success: 'Member deleted successfully'
        }
    } catch (error) {
        return {error: 'Error removing member. Please try again.'}
    }
}


export async function GetMemberById(id: string) {
    try {
        
        const isExist = await db.member.findFirst({
            where: {id}
        })

        if(!isExist){
            return {error: 'Member not found!'}
        }

        return {
            success: 'Member found',
            member: isExist
        }
    } catch (error) {
        return {error: 'Something went wrong. Please try again.'}
        
    }
}



export async function UpdateMember(id: string, values:z.infer<typeof memberFormSchema>) {

    try {
        const isValid = memberFormSchema.parse(values);

        const isExist = await db.member.findFirst({
            where: {id}
        })

        if(!isExist){
            return {error: 'Member not found!'}
        }

        const member = await db.member.update({
            where: {id:isExist.id},
            data:{
                name:isValid?.name.trim(),
                avatarUrl:isValid.avatarUrl,
                displayOrder:Number(isValid.displayOrder),
                organizationTeamId:isValid.organizationTeamId,
                positionId:isValid.positionId,
                updatedAt:new Date(),
            }
        })

        return {success:'Member updated successfully',member};

    } catch (error) {
        if(error instanceof z.ZodError){
            throw new Error(error.message);
        }
        throw new Error('Member update failed');
    }
}



export async function GetMembersByOrgId(id: string) {
    try {
        const result = await db.member.findMany({
            where: {organizationTeamId: id},
            include:{
                position:true,
                organizationTeam:true
            }
        })


        const members = result.sort((a, b) => {
            const aOrder = a.displayOrder ?? Infinity; 
            const bOrder = b.displayOrder ?? Infinity; 
            return aOrder - bOrder;
        });


        return {
            success: 'Members found',
            members
        }
    } catch (error) {
        return {error: 'Something went wrong. Please try again.',members:[]}
        
    }
}