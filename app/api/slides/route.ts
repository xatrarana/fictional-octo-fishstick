import { db } from "@/lib/db";
import { generateSlug } from "@/lib/utils";
import { writeFile } from "fs/promises";
import { NextRequest } from "next/server";
import { join } from "path";
import { cwd } from "process";

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file = data.get("file") as unknown as File;
    const title = data.get("title") as string;

    const slug = generateSlug(title);

    if (!file) {
        return new Response(JSON.stringify({ error: "Please provide a Image File" }), {
            status: 400,
        });
    }



    try {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const normalizeName = `${Date.now()}-${file.name.split(' ').join('-')}`;

        const path = join(cwd(), 'public', 'uploads', 'slides', normalizeName);

        await writeFile(path, buffer);

        const imageUrl = `/uploads/slides/${normalizeName}`.toString();

        const slide = await db.banner.create({
            data: {
                title,
                imageUrl,
                slug,
                createdAt: new Date(),
            }
        })
        return new Response(JSON.stringify({ path: imageUrl, slide, success: "Image uploaded successfully" }), {
            status: 200,
        });
    } catch (error: unknown) {
        console.error(error);
        return new Response(JSON.stringify({ error }), {
            status: 500,
        });

    }
}



export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);

    if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
        const slides = await db.banner.findMany();
        return new Response(JSON.stringify({slides}), {
            status: 200,
        });
    }
    const offset = (page - 1) * limit;
    try {
        const [slides, totalCount] = await Promise.all([
            db.banner.findMany({
                skip: offset,
                take: limit,
            }),
            db.banner.count(), 
        ]);

        return new Response(
            JSON.stringify({
                slides,
                pagination: {
                    total: totalCount,
                    page,
                    limit,
                    totalPages: Math.ceil(totalCount / limit),
                },
            }),
            {
                status: 200,
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Error fetching data" }),
            {
                status: 500,
            }
        );
    }
}