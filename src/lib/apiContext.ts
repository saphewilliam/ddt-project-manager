import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export interface ApiContext {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
}

export function createApiContext(req: NextApiRequest, res: NextApiResponse): ApiContext {
  return {
    req,
    res,
    prisma,
  };
}
