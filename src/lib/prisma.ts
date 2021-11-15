/* eslint-disable @typescript-eslint/no-namespace, @typescript-eslint/no-empty-interface*/

import { PrismaClient } from '@prisma/client';

declare global {
  namespace NodeJS {
    interface Global {}
  }
}

declare const global: NodeJS.Global & { prisma?: PrismaClient };

let prisma: PrismaClient;

// Prevent multiple instances of Prisma Client in development
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;

// TODO: Remove?
// export const prisma = global.prisma ?? new PrismaClient();
// if (environment.env === 'DEVELOP') global.prisma = prisma;
