import { extendType } from 'nexus';
import { StoneList } from 'nexus-prisma';
import { ApiContext } from '@lib/apiContext';
import { authorizeSession } from '@lib/authHelpers';
import { nexusModel } from '@lib/nexusHelpers';

export const stoneListModel = nexusModel(StoneList);

export const stoneListQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('stoneListUsers', {
      type: 'User',
      description: 'Find all users of this team that have a nonzero stonelist in this team',
      authorize: authorizeSession,
      resolve: (_, __, ctx: ApiContext) =>
        ctx.prisma.user.findMany({
          where: {
            stoneLists: {
              some: {
                stone: { stoneType: { teamId: ctx.session?.teamId ?? '' } },
                user: { teams: { some: { teamId: ctx.session?.teamId ?? '' } } },
              },
            },
          },
          orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
        }),
    });
  },
});
