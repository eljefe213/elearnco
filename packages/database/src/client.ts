import { PrismaClient } from "@prisma/client";

declare const global: Global & { prisma?: PrismaClient };

export const prisma = global.prisma || new PrismaClient({ log: ["info"] });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export * from "@prisma/client";
