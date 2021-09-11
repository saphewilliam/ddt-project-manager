import { PrismaClient, Session } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@lib/prisma';

export interface ApiContext {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
  session: Session | null;
}

export async function createApiContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}): Promise<ApiContext> {
  const authHeader = req.headers.authorization;
  let session: Session | null = null;
  if (authHeader !== undefined && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    session = await prisma.session.findUnique({ where: { token } });
  }

  return {
    req,
    res,
    prisma,
    session,
  };
}
