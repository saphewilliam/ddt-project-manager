import { extendType } from 'nexus';
import { Subtheme } from 'nexus-prisma';
import { authorizeSession } from '@lib/authHelpers';
import { nexusModel } from '@lib/nexusHelpers';

export const subthemeModel = nexusModel(Subtheme, {
  hide: ['projects'],
  extend(t) {
    t.list.field('projects', {
      type: 'Project',
      resolve: (root, _, ctx) =>
        ctx.prisma.project.findMany({
          where: { subthemeId: root.id },
          orderBy: { number: 'asc' },
        }),
    });
    t.int('stoneAmount', {
      description: 'The number of dominoes assigned to this subtheme in total',
      authorize: authorizeSession,
      resolve: async (root, _, ctx) => {
        const projectResult = await ctx.prisma.stonesOnProjectPart.aggregate({
          _sum: { amount: true },
          where: { projectPart: { project: { subthemeId: root.id } } },
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

export const subthemQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('subthemes', {
      type: 'Subtheme',
      authorize: authorizeSession,
      resolve: (_, __, ctx) =>
        ctx.prisma.subtheme.findMany({ where: { event: { teamId: ctx.session?.teamId ?? '' } } }),
    });
  },
});
