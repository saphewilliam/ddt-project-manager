import { nexusModel } from '@lib/nexusHelpers';
import { Session } from 'nexus-prisma';
import { ApiContext } from '@lib/apiContext';
import { loginUser, logoutUser } from '@lib/authHelpers';
import { booleanArg, extendType, stringArg } from 'nexus';

export const SessionModel = nexusModel(Session);

// export const SessionQuery = extendType({
//   type: 'Query',
//   definition(t) {
//     t.field('session', {
//       type: 'Session',
//       description: 'Get session by its token',
//       args: {
//         token: stringArg(),
//       },
//       resolve: (_, args, ctx: ApiContext) =>
//         ctx.prisma.session.findUnique({ where: { token: args.token } }),
//     });
//   },
// });

export const SessionMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('login', {
      type: 'Session',
      description: 'Generate a new session for a user with an active account',
      args: {
        email: stringArg(),
        password: stringArg(),
        isPermanent: booleanArg(),
        teamId: stringArg(),
      },
      resolve: (_, args, ctx: ApiContext) =>
        loginUser(args.email, args.password, args.isPermanent, args.teamId, ctx.prisma),
    });
    t.nonNull.field('logout', {
      type: 'Session',
      description: 'Invalidate an active session',
      args: {
        token: stringArg(),
      },
      resolve: (_, args, ctx: ApiContext) => logoutUser(args.token, ctx.prisma),
    });
  },
});
