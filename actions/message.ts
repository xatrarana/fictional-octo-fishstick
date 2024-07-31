'use server';
import * as z from 'zod'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { messageSchema } from '@/schemas';
import { db } from '@/lib/db';


export async function getMessageItems() {
    try {
        const Messages = await db.message.findMany();
        if (Messages) return { success: "Messages found", Messages };

        if (!Messages) throw new Error("No Messages found");

    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) return { error: error.message };
        if (error instanceof Error) return { error: error.message };
        return { error: "Something wnent wrong. Please try again." };
    }
}

export async function getActiveMessageItems() {
    try {
        const Messages = await db.message.findMany({
            where: {
                status: true
            }
        });
        if (Messages) return { success: "Messages found", Messages };

        if (!Messages) throw new Error("No Messages found");

    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) return { error: error.message };
        if (error instanceof Error) return { error: error.message };
        return { error: "Something wnent wrong. Please try again." };
    }
}


export async function getMessageById(id: string) {
    try {
        const Message = await db.message.findFirst({
            where: {
                id: id
            }
        });

        if (Message) return { success: "Message found", Message };

        throw new Error("Message not found");

    } catch (error) {

        if (error instanceof PrismaClientKnownRequestError) return { error: error.message };

        if (error instanceof Error) return { error: error.message };

        return { error: "Something went wrong. Please try again." };
    }
}


export async function addMessage(values: z.infer<typeof messageSchema>) {
    try {

        const validateFields = await messageSchema.safeParseAsync(values);

        if (!validateFields.success) throw new Error(validateFields.error.message);
        const { data } = validateFields;


        const messageExist = await db.message.findFirst({
            where: {
                memberId: data.memberId 
            }
        })


        if (messageExist) throw new Error("Message already exist for this member. Please update insted.");

        const Message = await db.message.create({
            data:{
                message: data.message,
                memberId: data.memberId,
                status: data.status,
                createdAt: new Date(),
            }
        })


        if (Message) return { success: "Message added successfully", Message };

        throw new Error("Message could not be added. Please try again.");

    } catch (error) {

        if (error instanceof PrismaClientKnownRequestError) return { error: error.message };

        if (error instanceof Error) return { error: error.message };

        return { error: "Something went wrong. Please try again." };
    }
}



export async function updateMessage(id:string,values: z.infer<typeof messageSchema>) {
    try {

        const validateFields = await messageSchema.safeParseAsync(values);

        if (!validateFields.success) throw new Error(validateFields.error.message);
        const { data } = validateFields;

        const Message = await db.message.update({
            where: {
                id: id
            },
            data: {
               ...data,
               updatedAt: new Date()

            }
        })

        if (Message) return { success: "Message updated successfully", Message };

        throw new Error("Message could not be updated. Please try again.");

    } catch (error) {

        if (error instanceof PrismaClientKnownRequestError) return { error: error.message };

        if (error instanceof Error) return { error: error.message };

        return { error: "Something went wrong. Please try again." };
    }
}


export async function deleteMessage(id: string) {
    try {
        const Message = await db.message.delete({
            where: {
                id: id
            }
        });

        if (Message) return { success: "Message deleted successfully", Message };

        throw new Error("Message could not be deleted. Please try again.");

    } catch (error) {

        if (error instanceof PrismaClientKnownRequestError) return { error: error.message };

        if (error instanceof Error) return { error: error.message };

        return { error: "Something went wrong. Please try again." };
    }
}



export async function toogleStatus(id: string) {
    try {
        const Message = await db.message.findFirst({
            where: {id: id}
        })

        if (!Message) throw new Error("Message not found");

        const status = !Message.status;

        const updatedMessage = await db.message.update({
            where: {
                id: id
            },
            data: {
                status: status
            }
        })

        if (updatedMessage) return { success: "Message status updated successfully", updatedMessage };

        throw new Error("Message status could not be updated. Please try again.");

    } catch (error) {

        if (error instanceof PrismaClientKnownRequestError) return { error: error.message };

        if (error instanceof Error) return { error: error.message };

        return { error: "Something went wrong. Please try again." };
    }
}




export async function GetMessagesWithPagination(page: number = 1, limit: number = 10) {
    try {
        if (page <= 0) page = 1;
        if (limit <= 0) limit = 10;

        const skip = (page - 1) * limit;

        const [Messages, totalCount] = await Promise.all([
            db.message.findMany({
                skip: skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include:{member:{
                    include: {
                        position: true,
                    }
                }}


            }),
            db.message.count()
        ]);

        return {
            success: 'Message found',
            Messages,
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