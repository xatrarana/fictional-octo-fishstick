import { db } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const smtp = await db.smtp.findFirst(); 
        return NextResponse.json({success:true,smtp});
    } catch (ex) {
        return NextResponse.json({error: "something went wrong"});
    }
}