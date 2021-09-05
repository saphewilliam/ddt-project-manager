import { Prisma } from '@prisma/client';
import { extendType } from 'nexus';
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
  },
});
