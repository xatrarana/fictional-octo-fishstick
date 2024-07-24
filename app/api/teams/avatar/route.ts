import saveFile from "@/actions/_saveFile";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file = data.get("file") as unknown as File;
    const dir = data.get("dir") as string;

    


    if (!file) {
        return new Response(JSON.stringify({ error: "Please provide a Image File" }), {
            status: 400,
        });
    }

    if (!dir) {
        return new Response(JSON.stringify({ error: "Please provide a Directory" }), {
            status: 400,
        });
    }


    try {
        const response = await saveFile(file, dir);
        return new Response(JSON.stringify({ result:response,success: "Image uploaded successfully" }), {
            status: 200,
        });
    } catch (error: unknown) {
        return new Response(JSON.stringify({ error }), {
            status: 500,
        });

    }
}