import { extendType } from 'nexus';
import { Stone } from 'nexus-prisma';
import { authorizeSession } from '@lib/authHelpers';
import { nexusModel } from '@lib/nexusHelpers';

export const stoneModel = nexusModel(Stone, {
  // TODO: auto hide when override in extend
  hide: ['stoneInventory'],
  extend(t) {
    t.list.field('stoneInventory', {
      type: 'StoneInventory',
      authorize: authorizeSession,
      resolve(root, _, ctx) {
        return ctx.prisma.stoneInventory.findMany({
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
