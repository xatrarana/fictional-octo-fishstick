'use server';
import { db } from "@/lib/db"

export const deleteBanner = async (id: string) => {
    const slider = await db.banner.findUnique({
        where: {id: id}
    })
    if (!slider) {
        throw new Error('Slider not found')
    }

    await db.banner.delete({
        where: {id: slider.id}
    })

    return {success: true,message: 'Slider deleted successfully'}
}


export const getBanners = async () => {
    try {
        const sliders = await db.banner.findMany()
        return sliders;
    } catch (error) {
        return null;
    }
}