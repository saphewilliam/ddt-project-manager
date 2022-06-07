import { Role } from '@prisma/client';
import { arg, enumType, extendType, inputObjectType, stringArg } from 'nexus';
import { Project, ProjectStatus, ProjectType } from 'nexus-prisma';
import { authorizeSession, isValidSession } from '@lib/authHelpers';
import { nexusModel } from '@lib/nexusHelpers';
import { generateSlug } from '@lib/util';

export const projectTypeEnum = enumType(ProjectType);
export const projectStatusEnum = enumType(ProjectStatus);

export const projectModel = nexusModel(Project, {
  hide: ['parts'],
  extend(t) {
    t.list.field('parts', {
      type: 'ProjectPart',
      resolve: (root, _, ctx) =>
        ctx.prisma.projectPart.findMany({
          where: { projectId: root.id },
          orderBy: { number: 'asc' },
        }),
    });
    t.int('stoneAmount', {
      description: 'The number of dominoes assigned to this project',
      authorize: authorizeSession,
      resolve: async (root, _, ctx) => {
        const result = await ctx.prisma.stonesOnProjectPart.aggregate({
          _sum: { amount: true },
          where: { projectPart: { projectId: root.id } },
        });
        return result._sum.amount ?? 0;
      },
    });
  },
});

export const ProjectUpdateInput = inputObjectType({
  name: 'ProjectUpdateInput',
  definition(t) {
    t.string('name');
    t.nullable.string('supervisorId');
    t.string('subthemeId');
    t.field({ name: 'status', type: 'ProjectStatus' });
    t.nullable.field('description', { type: 'Json' });
    t.list.field('parts', { type: 'ProjectPartUpdateWithoutProjectInput' });
  },
});

export const projectMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nullable.field('updateProject', {
      type: 'Project',
      args: {
        id: stringArg(),
        data: arg({ type: 'ProjectUpdateInput' }),
      },
      authorize: async (_, args, ctx) => {
        const sessionValidation = await isValidSession(ctx.session);
        if (sessionValidation !== true) return sessionValidation;

        const project = await ctx.prisma.project.findUnique({
          where: { id: args.id },
          include: { subtheme: { include: { event: { select: { teamId: true } } } } },
        });
        if (!project) return Error('Invalid project id');
        if (project.subtheme.event.teamId !== ctx.session?.teamId)
          return Error('Stone is not part of logged in team');
        if (
          !(
            ctx.member?.role === Role.CAPTAIN &&
            project.subtheme.event.teamId === ctx.session.teamId
          ) &&
          !ctx.session.user.isAdmin
        )
          return Error('User does not have permission to perform this action');

        return true;
      },
      resolve: async (_, args, ctx) => {
        const project = await ctx.prisma.project.findUnique({
          where: { id: args.id },
          include: { parts: true },
        });
        if (!project) return null;

        // Delete removed parts
        for (const part of project.parts) {
          const p = args.data.parts.find((p) => p.id === part.id);
          if (!p) await ctx.prisma.projectPart.delete({ where: { id: part.id } });
        }

        // Upsert remaining parts
        for (const part of args.data.parts) {
          const data = {
            name: part.name,
            slug: generateSlug(part.name),
            type: part.type,
            number: part.number,
            description: part.description,
          };
          await ctx.prisma.projectPart.upsert({
            where: { id: part.id },
            create: { projectId: project.id, ...data },
            update: data,
          });
        }

        return await ctx.prisma.project.update({
          where: { id: project.id },
          data: {
            name: args.data.name,
            slug: args.data.name === project.name ? project.slug : generateSlug(args.data.name),
            description: args.data.description,
            supervisorId: args.data.supervisorId,
            subthemeId: args.data.subthemeId,
            status: args.data.status,
          },
        });
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
