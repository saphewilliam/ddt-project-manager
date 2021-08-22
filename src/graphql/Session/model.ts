import { nexusModel } from '@lib/nexusModel';
import { Session } from 'nexus-prisma';
import { ApiContext } from '@lib/apiContext';
import { loginUser, logoutUser, setSessionTeam } from '@lib/authHelpers';
import { booleanArg, extendType, stringArg } from 'nexus';

export const SessionModel = nexusModel(Session, {
  // hideFields: ['token'],
  extend(t) {
    t.nullable.field('member', {
      type: 'Member',
      resolve: (root, __, ctx: ApiContext) => {
        if (root.teamId === null) return null;
        else
          return ctx.prisma.member.findFirst({
            where: {
              teamId: root.teamId,
              userId: root.userId,
            },
          });
      },
    });
  },
});

export const SessionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('session', {
      type: 'Session',
      description: 'Get session by its token',
      args: {
        token: stringArg(),
      },
      resolve: (_, args, ctx: ApiContext) =>
        ctx.prisma.session.findUnique({ where: { token: args.token } }),
    });
  },
});

export const SessionMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('login', {
      type: 'Session',
      description: 'Generate a new session for a user with an active account',
      args: {
        email: stringArg(),
        password: stringArg(),
        isPermanent: booleanArg(),
      },
      resolve: (_, args, ctx: ApiContext) =>
        loginUser(args.email, args.password, args.isPermanent, ctx.prisma),
    });
    t.field('setSessionTeam', {
      type: 'Session',
      description: 'Set the `team` field of an active session',
      args: {
        token: stringArg(),
        teamId: stringArg(),
      },
      resolve: (_, args, ctx: ApiContext) => setSessionTeam(args.token, args.teamId, ctx.prisma),
    });
    t.field('logout', {
      type: 'Session',
      description: 'Invalidate an active session',
      args: {
        token: stringArg(),
      },
      resolve: (_, args, ctx: ApiContext) => logoutUser(args.token, ctx.prisma),
    });
  },
});
