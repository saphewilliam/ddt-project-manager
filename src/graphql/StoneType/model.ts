import { extendType } from 'nexus';
import { StoneType } from 'nexus-prisma';
import { ApiContext } from '@lib/apiContext';
import { authorizeSession } from '@lib/authHelpers';
import { nexusModel } from '@lib/nexusHelpers';

export const stoneTypeModel = nexusModel(StoneType);

export const stoneTypeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('stoneTypes', {
      type: 'StoneType',
      authorize: authorizeSession,
      description: 'Get all stonetypes of a team',
      resolve: (_, __, ctx: ApiContext) =>
        ctx.prisma.stoneType.findMany({
          where: { teamId: ctx.session?.teamId ?? '' },
          orderBy: { order: 'asc' },
        }),
    });
  },
});
