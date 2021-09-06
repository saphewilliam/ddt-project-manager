import { extendType } from 'nexus';
import { Stone } from 'nexus-prisma';
import { ApiContext } from '@lib/apiContext';
import { authorizeSession } from '@lib/authHelpers';
import { nexusModel } from '@lib/nexusHelpers';

export const stoneModel = nexusModel(Stone);

export const stoneQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('stones', {
      type: 'Stone',
      authorize: authorizeSession,
      description: 'Get all stones of a team',
      resolve(_, __, ctx: ApiContext) {
        return ctx.prisma.stone.findMany({
          where: { stoneType: { teamId: ctx.session?.teamId ?? '' } },
          orderBy: [{ stoneType: { order: 'asc' } }, { order: 'asc' }],
        });
      },
    });
  },
});
