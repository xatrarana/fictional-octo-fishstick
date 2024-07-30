'use server';
import * as z from 'zod'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { noticeSchema } from '@/schemas';
import { db } from '@/lib/db';


export async function getNoticeItems() {
    try {
        const notices = await db.notice.findMany();
        if (notices) return { success: "Notices found", notices };

        if (!notices) throw new Error("No notices found");

    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) return { error: error.message };
        if (error instanceof Error) return { error: error.message };
        return { error: "Something wnent wrong. Please try again." };
    }
}

export async function getActiveNoticeItems() {
    try {
        const notices = await db.notice.findMany({
            where: {
                status: true
            }
        });
        if (notices) return { success: "Notices found", notices };

        if (!notices) throw new Error("No notices found");

    } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) return { error: error.message };
        if (error instanceof Error) return { error: error.message };
        return { error: "Something wnent wrong. Please try again." };
    }
}


export async function getNoticeById(id: string) {
    try {
        const notice = await db.notice.findFirst({
            where: {
                id: id
            }
        });

        if (notice) return { success: "Notice found", notice };

        throw new Error("Notice not found");

    } catch (error) {

        if (error instanceof PrismaClientKnownRequestError) return { error: error.message };

        if (error instanceof Error) return { error: error.message };

        return { error: "Something went wrong. Please try again." };
    }
}


export async function addNotice(values: z.infer<typeof noticeSchema>) {
    try {

        const validateFields = await noticeSchema.safeParseAsync(values);

        if (!validateFields.success) throw new Error(validateFields.error.message);
        const { data } = validateFields;

        const notice = await db.notice.create({
            data: {
                title: data.title,
                status: data.status,
                fileUrl: data.fileUrl,
                createdAt: new Date(),

            }
        })


        if (notice) return { success: "Notice added successfully", notice };

        throw new Error("Notice could not be added. Please try again.");

    } catch (error) {

        if (error instanceof PrismaClientKnownRequestError) return { error: error.message };

        if (error instanceof Error) return { error: error.message };

        return { error: "Something went wrong. Please try again." };
    }
}



export async function updateNotice(id:string,values: z.infer<typeof noticeSchema>) {
    try {

        const validateFields = await noticeSchema.safeParseAsync(values);

        if (!validateFields.success) throw new Error(validateFields.error.message);
        const { data } = validateFields;

        const notice = await db.notice.update({
            where: {
                id: id
            },
            data: {
                title: data.title,
                status: data.status,
                fileUrl: data.fileUrl,
                updatedAt: new Date(),

            }
        })

        if (notice) return { success: "Notice updated successfully", notice };

        throw new Error("Notice could not be updated. Please try again.");

    } catch (error) {

        if (error instanceof PrismaClientKnownRequestError) return { error: error.message };

        if (error instanceof Error) return { error: error.message };

        return { error: "Something went wrong. Please try again." };
    }
}


export async function deleteNotice(id: string) {
    try {
        const notice = await db.notice.delete({
            where: {
                id: id
            }
        });

        if (notice) return { success: "Notice deleted successfully", notice };

        throw new Error("Notice could not be deleted. Please try again.");

    } catch (error) {

        if (error instanceof PrismaClientKnownRequestError) return { error: error.message };

        if (error instanceof Error) return { error: error.message };

        return { error: "Something went wrong. Please try again." };
    }
}



export async function toogleStatus(id: string) {
    try {
        const notice = await db.notice.findFirst({
            where: {id: id}
        })

        if (!notice) throw new Error("Notice not found");

        const status = !notice.status;

        const updatedNotice = await db.notice.update({
            where: {
                id: id
            },
            data: {
                status: status
            }
        })

        if (updatedNotice) return { success: "Notice status updated successfully", updatedNotice };

        throw new Error("Notice status could not be updated. Please try again.");

    } catch (error) {

        if (error instanceof PrismaClientKnownRequestError) return { error: error.message };

        if (error instanceof Error) return { error: error.message };

        return { error: "Something went wrong. Please try again." };
    }
}




export async function GetNoticesWithPagination(page: number = 1, limit: number = 10) {
    try {
        if (page <= 0) page = 1;
        if (limit <= 0) limit = 10;

        const skip = (page - 1) * limit;

        const [notices, totalCount] = await Promise.all([
            db.notice.findMany({
                skip: skip,
                take: limit,
                orderBy: { createdAt: 'desc' },

            }),
            db.notice.count()
        ]);

        return {
            success: 'Notice found',
            notices,
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