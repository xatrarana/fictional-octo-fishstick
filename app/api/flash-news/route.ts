import { db } from '@/lib/db';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);

    if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
        try {
            const flashNews = await db.flashNews.findMany({
                orderBy: { createdAt: 'desc' }, 
            });
            return new Response(JSON.stringify({ flashNews }), {
                status: 200,
            });
        } catch (error) {
            return new Response(
                JSON.stringify({ error: "Error fetching data" }),
                {
                    status: 500,
                }
            );
        }
    }

    const offset = (page - 1) * limit;
    try {
        const [flashNews, totalCount] = await Promise.all([
            db.flashNews.findMany({
                skip: offset,
                take: limit,
                orderBy: { createdAt: 'desc' }, 
            }),
            db.flashNews.count(),
        ]);

        return new Response(
            JSON.stringify({
                flashNews,
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
