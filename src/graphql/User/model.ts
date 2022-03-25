import { extendType, stringArg } from 'nexus';
import { User } from 'nexus-prisma';
import { authorizeSession } from '@lib/authHelpers';
import { nexusModel } from '@lib/nexusHelpers';

export const userModel = nexusModel(User, {
  hide: ['password'],
  extend: async (t) => {
    t.int('stoneAmount', {
      description: 'The number of dominoes this user posesses',
      authorize: authorizeSession,
      resolve: async (root, __, ctx) => {
        const result = await ctx.prisma.stoneList.aggregate({
          _sum: { amount: true },
          where: { userId: root.id, stone: { stoneType: { teamId: ctx.session?.teamId ?? '' } } },
        });
        return result._sum.amount ?? 0;
      },
    });
  },
});

export const userQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('user', {
      type: 'User',
      description: 'Find user by its slug',
      args: {
        userSlug: stringArg(),
      },
      authorize: authorizeSession,
      resolve: (_, args, ctx) =>
        ctx.prisma.user.findFirst({
          where: { teams: { some: { teamId: ctx.session?.teamId ?? '' } }, slug: args.userSlug },
        }),
    });
    t.list.field('users', {
      type: 'User',
      description: 'Find all users of this team',
      authorize: authorizeSession,
      resolve: (_, __, ctx) =>
        ctx.prisma.user.findMany({
          where: { teams: { some: { teamId: ctx.session?.teamId ?? '' } } },
          orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
        }),
    });
    t.list.field('stoneListUsers', {
      type: 'User',
      description: 'Find all users of this team that have a nonzero stonelist in this team',
      authorize: authorizeSession,
      resolve: (_, __, ctx) =>
        ctx.prisma.user.findMany({
          where: {
            teams: { some: { teamId: ctx.session?.teamId ?? '' } },
            stoneLists: {
              some: { stone: { stoneType: { teamId: ctx.session?.teamId ?? '' } } },
            },
          },
          orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
        }),
    });
  },
});
