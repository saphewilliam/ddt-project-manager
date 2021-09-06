import { extendType, stringArg } from 'nexus';
import { StoneList } from 'nexus-prisma';
import { ApiContext } from '@lib/apiContext';
import { authorizeSession } from '@lib/authHelpers';
import { nexusModel } from '@lib/nexusHelpers';

export const stoneListModel = nexusModel(StoneList);

export const stoneListQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('stoneList', {
      type: 'StoneList',
      args: {
        userSlug: stringArg(),
      },
      authorize: authorizeSession,
      description: 'Get stonelist of a user in a team',
      resolve: (_, args, ctx: ApiContext) =>
        ctx.prisma.stoneList.findMany({
          where: {
            user: { slug: args.userSlug },
            stone: { stoneType: { teamId: ctx.session?.teamId ?? '' } },
          },
          orderBy: [{ stone: { stoneType: { order: 'asc' } } }, { stone: { order: 'asc' } }],
        }),
    });
  },
});
