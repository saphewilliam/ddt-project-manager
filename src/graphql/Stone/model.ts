import { extendType } from 'nexus';
import { Stone } from 'nexus-prisma';
import { authorizeSession } from '@lib/authHelpers';
import { nexusModel } from '@lib/nexusHelpers';

export const stoneModel = nexusModel(Stone, {
  hideFields: ['stoneLists'],
  extend(t) {
    t.list.field('stoneLists', {
      type: 'StoneList',
      authorize: authorizeSession,
      resolve(root, _, ctx) {
        return ctx.prisma.stoneList.findMany({
          where: {
            stoneId: root.id,
            user: { teams: { some: { teamId: ctx.session?.teamId ?? '' } } },
          },
          orderBy: [{ user: { firstName: 'asc' } }, { user: { lastName: 'asc' } }],
        });
      },
    });
  },
});

export const stoneQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('stones', {
      type: 'Stone',
      authorize: authorizeSession,
      description: 'Get all stones of a team',
      resolve(_, __, ctx) {
        return ctx.prisma.stone.findMany({
          where: { stoneType: { teamId: ctx.session?.teamId ?? '' } },
          orderBy: [{ stoneType: { order: 'asc' } }, { order: 'asc' }],
        });
      },
    });
  },
});
