import { Prisma } from '@prisma/client';
import { extendType, stringArg } from 'nexus';
import { Event } from 'nexus-prisma';
import { authorizeSession } from '@lib/authHelpers';
import { nexusModel } from '@lib/nexusHelpers';

export const eventModel = nexusModel(Event, {
  extend(t) {
    t.int('stoneAmount', {
      description: 'The number of dominoes assigned to this event',
      authorize: authorizeSession,
      resolve: async (root, _, ctx) => {
        const projectResult = await ctx.prisma.stonesOnProject.aggregate({
          _sum: { amount: true },
          where: { project: { subtheme: { eventId: root.id } } },
        });

        const subthemeResult = await ctx.prisma.stonesOnSubtheme.aggregate({
          _sum: { amount: true },
          where: { subtheme: { eventId: root.id } },
        });

        return (projectResult._sum.amount ?? 0) + (subthemeResult._sum.amount ?? 0);
      },
    });
  },
});

export const eventQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('events', {
      type: 'Event',
      authorize: authorizeSession,
      resolve: (_, __, ctx) =>
        ctx.prisma.event.findMany({
          where: { teamId: ctx.session?.teamId ?? '' },
          orderBy: { date: Prisma.SortOrder.desc },
        }),
    });
    t.nullable.field('event', {
      type: 'Event',
      args: {
        eventSlug: stringArg(),
      },
      authorize: authorizeSession,
      resolve: (_, args, ctx) =>
        ctx.prisma.event.findFirst({
          where: { slug: args.eventSlug, teamId: ctx.session?.teamId ?? '' },
        }),
    });
  },
});
