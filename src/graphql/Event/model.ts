import { Prisma } from '@prisma/client';
import { extendType, objectType, stringArg } from 'nexus';
import { Event } from 'nexus-prisma';
import { authorizeSession } from '@lib/authHelpers';
import { nexusModel } from '@lib/nexusHelpers';

export const attributesOnEvent = objectType({
  name: 'AttributesOnEvent',
  definition(t) {
    t.int('amount');
    t.string('attributeId');
    t.field('attribute', { type: 'Attribute' });
    t.string('userId');
    t.field('user', { type: 'User' });
  },
});

export const eventModel = nexusModel(Event, {
  extend(t) {
    t.int('stoneAmount', {
      description: 'The number of dominoes assigned to this event in total',
      authorize: authorizeSession,
      resolve: async (root, _, ctx) => {
        const projectResult = await ctx.prisma.stonesOnProjectPart.aggregate({
          _sum: { amount: true },
          where: { projectPart: { project: { subtheme: { eventId: root.id } } } },
        });

        const subthemeResult = await ctx.prisma.stonesOnSubtheme.aggregate({
          _sum: { amount: true },
          where: { subtheme: { eventId: root.id } },
        });

        return (projectResult._sum.amount ?? 0) + (subthemeResult._sum.amount ?? 0);
      },
    });
    t.list.field('attributes', {
      type: 'AttributesOnEvent',
      authorize: authorizeSession,
      resolve: async (root, _, ctx) => {
        const projectAttributes = await ctx.prisma.attributesOnProjectPart.groupBy({
          _sum: { amount: true },
          by: ['attributeId', 'userId'],
          where: { projectPart: { project: { subtheme: { eventId: root.id } } } },
        });

        const subthemeAttributes = await ctx.prisma.attributesOnSubtheme.groupBy({
          _sum: { amount: true },
          by: ['attributeId', 'userId'],
          where: { subtheme: { eventId: root.id } },
        });

        type Attributes = { amount: number; attributeId: string; userId: string }[];
        const attributes: Attributes = [...projectAttributes, ...subthemeAttributes].reduce(
          (prev, curr) => {
            const i = prev.findIndex(
              (value) => value.attributeId === curr.attributeId && value.userId === curr.userId,
            );
            if (i === -1) prev.push({ ...curr, amount: curr._sum.amount ?? 0 });
            else prev[i]!.amount = (prev[i]?.amount ?? 0) + (curr._sum.amount ?? 0);
            return prev;
          },
          [] as Attributes,
        );

        return attributes.map((attribute) => ({
          ...attribute,
          user: ctx.prisma.user.findUnique({ where: { id: attribute.userId } }),
          attribute: ctx.prisma.attribute.findUnique({ where: { id: attribute.attributeId } }),
        }));
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
