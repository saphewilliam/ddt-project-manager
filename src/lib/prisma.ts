/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-interface*/

import { PrismaClient } from '@prisma/client';

declare global {
  namespace NodeJS {
    interface Global {}
  }
}

// Prevent multiple instances of Prisma Client in development
declare const global: NodeJS.Global & { prisma?: PrismaClient };

export const prisma = global.prisma || new PrismaClient();
if (process.env.NODE_ENV === 'development') global.prisma = prisma;
