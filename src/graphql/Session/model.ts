import { booleanArg, extendType, stringArg } from 'nexus';
import { Session } from 'nexus-prisma';
import {
  authorizeSession,
  isValidSession,
  loginUser,
  logoutUser,
  setSessionTeam,
} from '@lib/authHelpers';
import { nexusModel } from '@lib/nexusHelpers';

export const sessionModel = nexusModel(Session, {
  hideFields: ['token'],
  extend(t) {
    t.nullable.field('member', {
      type: 'Member',
      resolve(root, __, ctx) {
        if (root.teamId === null) return null;
        else
          return ctx.prisma.member.findFirst({
            where: { teamId: root.teamId, userId: root.userId },
          });
      },
    });
  },
});

export const sessionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('session', {
      type: 'Session',
      description: 'Get session by its token',
      args: {
        token: stringArg(),
      },
      resolve: (_, args, ctx) => ctx.prisma.session.findUnique({ where: { token: args.token } }),
    });
  },
});

export const sessionMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('login', {
      type: 'String',
      description: 'Generate a new session for a user with an active account',
      args: {
        email: stringArg(),
        password: stringArg(),
        isPermanent: booleanArg(),
      },
      resolve: (_, args, ctx) => loginUser(args.email, args.password, args.isPermanent, ctx.prisma),
    });
    t.field('setSessionTeam', {
      type: 'Session',
      description: 'Set the `team` field of an active session',
      authorize: (_, __, ctx) => isValidSession(ctx.session, true),
      args: {
        teamId: stringArg(),
      },
      resolve: (_, args, ctx) => setSessionTeam(ctx.session?.token ?? '', args.teamId, ctx.prisma),
    });
    t.field('logout', {
      type: 'Session',
      description: 'Invalidate an active session',
      authorize: authorizeSession,
      resolve: (_, __, ctx) => logoutUser(ctx.session?.token ?? '', ctx.prisma),
    });
  },
});
