import { PrismaClient, Session, Role } from '@prisma/client';
import { hash, compare } from 'bcrypt';
import { GraphQLError } from 'graphql';
import { nanoid } from 'nanoid';
import { Authorized, AuthChecker } from 'type-graphql';
import { Context } from '@graphql/context';

export type AuthCheck = 'ADMIN' | 'CAPTAIN';

/** Wrapper for the type-graphql Authorized decorator to ensure type-safety */
export const Auth = (auth?: AuthCheck) => Authorized(auth);

// TODO
//   if (session.teamId === null && !teamMayBeNull) return Error('Please select a team');
export const authChecker: AuthChecker<Context, AuthCheck> = ({ context }, authCheck) => {
  const prefix = '[AUTH] Access denied! ';
  if (authCheck.length > 1)
    throw new GraphQLError(
      'Something went wrong during auth checking, please use @Auth instead of @Authorized',
    );

  // Validate session
  const session = context.session;
  if (session === null)
    throw new GraphQLError(`${prefix}You need to be logged in to perform this action.`);

  if (session.expiresAt && session.expiresAt < new Date())
    throw new GraphQLError(`${prefix}Your session has expired.`);

  // Check if the user has the required permissions
  const auth = authCheck[0];
  if (auth === 'ADMIN' && !session.user.isAdmin)
    throw new GraphQLError(`${prefix}You need to be an admin to perform this action.`);

  if (auth === 'CAPTAIN' && context.member?.role !== Role.CAPTAIN)
    throw new GraphQLError(
      `${prefix}You need to be logged in as a team captain to perform this action.`,
    );

  return true;
};

export async function hashPw(plaintext: string): Promise<string> {
  return await hash(plaintext, 10);
}

export async function generateUniqueRandomId(prisma: PrismaClient): Promise<string> {
  let unique = false;
  let token = '';

  while (!unique) {
    token = nanoid(64);
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
): Promise<string> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new GraphQLError('Invalid username or password');
  if (!user.password)
    throw new GraphQLError(
      `'${user.displayName}' does not have an active account. Please contact an admin to activate your account`,
    );

  const match = await compare(password, user.password);
  if (!match) throw new GraphQLError('Invalid username or password');

  const numDays = 2;
  const d = new Date();
  d.setDate(d.getDate() + numDays);
  const expiresAt = isPermanent ? null : d;

  const session = await prisma.session.create({
    data: {
      expiresAt,
      token: await generateUniqueRandomId(prisma),
      user: { connect: { id: user.id } },
    },
  });

  return session.token;
}

export async function setSessionTeam(
  token: string,
  teamId: string,
  prisma: PrismaClient,
): Promise<Session> {
  const session = await prisma.session.findUnique({ where: { token }, include: { user: true } });
  if (!session) throw new GraphQLError('Invalid token');

  const team = await prisma.team.findUnique({ where: { id: teamId }, include: { members: true } });
  if (!team) throw new GraphQLError('Invalid team ID');

  const member = team.members.find((member) => member.userId === session.user.id);
  if (!member) throw new GraphQLError(`'${session.user.displayName}' is not a member of this team`);

  return await prisma.session.update({
    where: { id: session.id },
    data: { team: { connect: { id: team.id } } },
  });
}

export async function logoutUser(token: string, prisma: PrismaClient): Promise<Session> {
  const session = await prisma.session.findUnique({ where: { token } });
  if (!session) throw new GraphQLError('Invalid token');

  const d = new Date();
  if (session.expiresAt && session.expiresAt < d)
    throw new GraphQLError('User is already signed out');

  return await prisma.session.update({
    where: { id: session.id },
    data: { expiresAt: d },
  });
}
