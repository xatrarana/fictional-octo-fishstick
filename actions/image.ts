'use server';

import { db } from "@/lib/db";
import { promises as fs } from 'fs';
import { join } from 'path';

export async function GetImagesWithPagination(page: number = 1, limit: number = 10) {
    try {
        if (page <= 0) page = 1;
        if (limit <= 0) limit = 10;

        const skip = (page - 1) * limit;

        const [Images, totalCount] = await Promise.all([
            db.image.findMany({
                skip: skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
            }),
            db.image.count()
        ]);

        return {
            success: 'Images found',
            Images,
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


export async function deleteImage(id: string) {

    try {

        const image = await db.image.findFirst({
            where:{
                id
            }
        })

        if(!image) throw new Error('Image not found')


        const response = await deleteImageFromDir(image.url)

        if(response.error) throw new Error(response.error)
        

        await db.image.delete({
            where: {
                id,
            },
        });

        return { success: 'Image deleted successfully', image };
    } catch (error) {

        return { error: 'Failed to delete image' };
    }
}


/**
 * Deletes an image from the database and removes its file from the directory.
 * @param id - The ID of the image to delete.
 * @returns An object indicating success or failure.
 */
export async function deleteImageFromDir(url: string): Promise<{ success?: string; error?: string }> {
    try {
     
      const filePath = join(process.cwd(), 'public/', url);
  
      try {
        await fs.unlink(filePath);
      } catch (fsError) {
        console.error(`Error deleting image file: ${fsError}`);
        return { error: 'Failed to delete image file from the filesystem' };
      }
  
      return { success: 'Image deleted successfully' };
    } catch (error) {
      console.error(`Failed to delete image: ${error}`);
      return { error: 'Failed to delete image from the database' };
    }
  }





  export async function getImages() {
    try {
        const Images = await db.image.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return { success: 'Images found', Images };
    } catch (error) {
        return { error: 'Failed to fetch images' };
    }
}