import { PrismaClient, Session } from '@prisma/client';
import { randomBytes } from 'crypto';
import { hash, compare } from 'bcrypt';

export async function hashPw(plaintext: string): Promise<string> {
  return await hash(plaintext, 10);
}

export async function isValidSesssion(session: Session | null): Promise<boolean | Error> {
  if (session === null)
    return Error('Please supply a valid session token in the Authorization header');

  if (session.expiresAt && session.expiresAt < new Date()) return Error('Session expired');

  return true;
}

export async function generateUniqueRandomId(prisma: PrismaClient): Promise<string> {
  let unique = false;
  let token = '';

  while (!unique) {
    token = randomBytes(32).toString('hex');
    const found = await prisma.session.findUnique({ where: { token } });
    unique = found === null;
  }

  return token;
}

export async function loginUser(
  email: string,
  password: string,
  isPermanent: boolean,
  prisma: PrismaClient,
): Promise<Session> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw Error('Invalid username or password');
  if (!user.password)
    throw Error(
      `'${user.displayName}' does not have an active account. Please contact an admin to activate your account`,
    );

  const match = await compare(password, user.password);
  if (!match) throw Error('Invalid username or password');

  const numDays = 2;
  const d = new Date();
  d.setDate(d.getDate() + numDays);
  const expiresAt = isPermanent ? null : d;

  return await prisma.session.create({
    data: {
      expiresAt,
      token: await generateUniqueRandomId(prisma),
      user: { connect: { id: user.id } },
    },
  });
}

export async function setSessionTeam(
  token: string,
  teamId: string,
  prisma: PrismaClient,
): Promise<Session> {
  const session = await prisma.session.findUnique({ where: { token }, include: { user: true } });
  if (!session) throw Error('Invalid token');

  const team = await prisma.team.findUnique({ where: { id: teamId }, include: { members: true } });
  if (!team) throw Error('Invalid team ID');

  const member = team.members.find((member) => member.userId === session.user.id);
  if (!member) throw Error(`'${session.user.displayName}' is not a member of this team`);

  return await prisma.session.update({
    where: { id: session.id },
    data: { team: { connect: { id: team.id } } },
  });
}

export async function logoutUser(token: string, prisma: PrismaClient): Promise<Session> {
  const session = await prisma.session.findUnique({ where: { token } });
  if (!session) throw Error('Invalid token');

  const d = new Date();
  if (session.expiresAt && session.expiresAt < d) throw Error('User is already signed out');

  return await prisma.session.update({
    where: { id: session.id },
    data: { expiresAt: d },
  });
}
