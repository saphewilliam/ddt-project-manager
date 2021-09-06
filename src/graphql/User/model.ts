import { extendType, stringArg } from 'nexus';
import { User } from 'nexus-prisma';
import { ApiContext } from '@lib/apiContext';
import { authorizeSession } from '@lib/authHelpers';
import { nexusModel } from '@lib/nexusHelpers';

export const userModel = nexusModel(User, { hideFields: ['password'] });

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
      resolve: (_, args, ctx: ApiContext) =>
        ctx.prisma.user.findFirst({
          where: { teams: { some: { teamId: ctx.session?.teamId ?? '' } }, slug: args.userSlug },
        }),
    });
    t.list.field('stoneListUsers', {
      type: 'User',
      description: 'Find all users of this team that have a nonzero stonelist in this team',
      authorize: authorizeSession,
      resolve: (_, __, ctx: ApiContext) =>
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
