import { PrismaClient } from "@prisma/client";

// Add the prisma variable to the global window
declare global {
  var prisma: PrismaClient | undefined;
};

const prismadb = globalThis.prisma || new PrismaClient();

// Edge case: still in development
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;