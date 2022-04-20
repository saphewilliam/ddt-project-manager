import { Role } from '@prisma/client';
import { extendType, intArg, stringArg } from 'nexus';
import { AttributeInventory } from 'nexus-prisma';
import { authorizeSession, isValidSession } from '@lib/authHelpers';
import { nexusModel } from '@lib/nexusHelpers';

export const attributeInventoryModel = nexusModel(AttributeInventory);

export const attributeInventoryQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('userAttributeInventory', {
      type: 'AttributeInventory',
      args: {
        userSlug: stringArg(),
      },
      authorize: authorizeSession,
      description: 'Get the attribute inventory of a user in a team',
      resolve: (_, args, ctx) =>
        ctx.prisma.attributeInventory.findMany({
          where: {
            user: { slug: args.userSlug },
            attribute: { teamId: ctx.session?.teamId ?? '' },
          },
          orderBy: { attribute: { name: 'asc' } },
        }),
    });
    t.nullable.field('attributeInventory', {
      type: 'AttributeInventory',
      args: {
        attributeId: stringArg(),
        userId: stringArg(),
      },
      authorize: authorizeSession,
      description: 'Get a single attribute inventory record',
      resolve: (_, args, ctx) =>
        ctx.prisma.attributeInventory.findFirst({
          where: {
            userId: args.userId,
            attributeId: args.attributeId,
            attribute: { teamId: ctx.session?.teamId ?? '' },
          },
        }),
    });
  },
});

export const attributeInventoryMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nullable.field('updateAttributeInventory', {
      type: 'AttributeInventory',
      args: {
        attributeId: stringArg(),
        userId: stringArg(),
        amount: intArg(),
      },
      authorize: async (_, args, ctx) => {
        const sessionValidation = await isValidSession(ctx.session);
        if (sessionValidation !== true) return sessionValidation;

        const attribute = await ctx.prisma.attribute.findUnique({
          where: { id: args.attributeId },
        });
        const user = await ctx.prisma.user.findUnique({ where: { id: args.userId } });

        if (args.amount < 0) return Error('Amount should be an integer equal to or greater than 0');
        if (!attribute || !user) return Error('Invalid attributeId or userId');
        if (attribute.teamId !== ctx.session?.teamId)
          return Error('Attribute is not part of logged in team');
        if (
          !(ctx.member?.role === Role.CAPTAIN && attribute.teamId === ctx.session.teamId) &&
          !ctx.session.user.isAdmin
        )
          return Error('User does not have permission to perform this action');

        return true;
      },
      resolve: async (_, args, ctx) => {
        const attributeInventory = await ctx.prisma.attributeInventory.findFirst({
          where: { attributeId: args.attributeId, userId: args.userId },
        });

        if (!attributeInventory && args.amount > 0)
          return await ctx.prisma.attributeInventory.create({ data: args });
        else if (attributeInventory && args.amount === 0) {
          // TODO returning deleted object gives error in frontend
          await ctx.prisma.attributeInventory.delete({ where: { id: attributeInventory.id } });
          return null;
        } else if (attributeInventory && args.amount > 0)
          return ctx.prisma.attributeInventory.update({
            where: { id: attributeInventory.id },
            data: { amount: args.amount },
          });
        else return null;
      },
    });
  },
});
