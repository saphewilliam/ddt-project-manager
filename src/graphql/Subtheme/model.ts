import { Subtheme } from 'nexus-prisma';
import { authorizeSession } from '@lib/authHelpers';
import { nexusModel } from '@lib/nexusHelpers';

export const subthemeModel = nexusModel(Subtheme, {
  extend(t) {
    t.int('stoneAmount', {
      description: 'The number of dominoes assigned to this subtheme in total',
      authorize: authorizeSession,
      resolve: async (root, _, ctx) => {
        const projectResult = await ctx.prisma.stonesOnProject.aggregate({
          _sum: { amount: true },
          where: { project: { project: { subthemeId: root.id } } },
        });

        const subthemeResult = await ctx.prisma.stonesOnSubtheme.aggregate({
          _sum: { amount: true },
          where: { id: root.id },
        });

        return (projectResult._sum.amount ?? 0) + (subthemeResult._sum.amount ?? 0);
      },
    });
  },
});
