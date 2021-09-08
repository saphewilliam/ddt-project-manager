import { Prisma } from '@prisma/client';
import { extendType, stringArg } from 'nexus';
import { Event } from 'nexus-prisma';
import { ApiContext } from '@lib/apiContext';
import { authorizeSession } from '@lib/authHelpers';
import { nexusModel } from '@lib/nexusHelpers';

export const eventModel = nexusModel(Event);

export const eventQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('events', {
      type: 'Event',
      authorize: authorizeSession,
      resolve: (_, __, ctx: ApiContext) =>
        ctx.prisma.event.findMany({
          where: { teamId: ctx.session?.teamId ?? '' },
          orderBy: { date: Prisma.SortOrder.asc },
        }),
    });
    t.nullable.field('event', {
      type: 'Event',
      args: {
        eventSlug: stringArg(),
      },
      authorize: authorizeSession,
      resolve: (_, args, ctx: ApiContext) =>
        ctx.prisma.event.findFirst({
          where: { slug: args.eventSlug, teamId: ctx.session?.teamId ?? '' },
        }),
    });
  },
});
