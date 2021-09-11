/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-interface*/

import { PrismaClient } from '@prisma/client';
import { environment } from './environment';

declare global {
  namespace NodeJS {
    interface Global {}
  }
}

declare const global: NodeJS.Global & { prisma?: PrismaClient };

// Prevent multiple instances of Prisma Client in development
export const prisma = global.prisma || new PrismaClient();
if (environment.env === 'DEVELOP') global.prisma = prisma;
