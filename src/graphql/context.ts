import { PrismaClient, Session, Member, User } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@lib/prisma';

export interface Context {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
  session:
    | (Session & {
        user: User;
      })
    | null;
  member: Member | null;
}

export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}): Promise<Context> {
  const authHeader = req.headers.authorization;
  let session: Context['session'] = null;
  let member: Context['member'] = null;
  if (authHeader !== undefined && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    session = await prisma.session.findUnique({ where: { token }, include: { user: true } });

    if (session && session.teamId)
      member = await prisma.member.findFirst({
        where: { teamId: session.teamId, userId: session.userId },
      });
  }

  return {
    req,
    res,
    prisma,
    session,
    member,
  };
}
