import { enumType, extendType, stringArg } from 'nexus';
import { Project, ProjectStatus, ProjectType } from 'nexus-prisma';
import { authorizeSession } from '@lib/authHelpers';
import { nexusModel } from '@lib/nexusHelpers';

export const projectTypeEnum = enumType(ProjectType);
export const projectStatusEnum = enumType(ProjectStatus);

export const projectModel = nexusModel(Project, {
  extend(t) {
    t.int('stoneAmount', {
      description: 'The number of dominoes assigned to this project',
      authorize: authorizeSession,
      resolve: async (root, _, ctx) => {
        const result = await ctx.prisma.stonesOnProject.aggregate({
          _sum: { amount: true },
          where: { project: { projectId: root.id } },
        });
        return result._sum.amount ?? 0;
      },
    });
  },
});

export const projectQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('project', {
      type: 'Project',
      args: {
        projectSlug: stringArg(),
        eventSlug: stringArg(),
      },
      description: 'Fetches a project based on its slug',
      authorize: authorizeSession,
      resolve: async (_, args, ctx) => {
        const project = await ctx.prisma.project.findUnique({
          where: { slug: args.projectSlug },
          include: { subtheme: { include: { event: { select: { teamId: true, slug: true } } } } },
        });

        if (
          !project ||
          project.subtheme.event.slug !== args.eventSlug ||
          project.subtheme.event.teamId !== ctx.session?.teamId
        )
          return null;

        return project;
      },
    });
  },
});
