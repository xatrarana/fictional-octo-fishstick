import { PrismaClient } from "@prisma/client";
import { env } from "process";

declare global {
    var prisma: PrismaClient
}

export const db = globalThis.prisma || new PrismaClient();

if(env.NODE_ENV !== 'production') globalThis.prisma = db;