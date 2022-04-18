import { Role } from '@prisma/client';
import { extendType, intArg, stringArg } from 'nexus';
import { AttributeList } from 'nexus-prisma';
import { authorizeSession, isValidSession } from '@lib/authHelpers';
import { nexusModel } from '@lib/nexusHelpers';

export const attributeListModel = nexusModel(AttributeList);

export const attributeListQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('userAttributeList', {
      type: 'AttributeList',
      args: {
        userSlug: stringArg(),
      },
      authorize: authorizeSession,
      description: 'Get the attributes list of a user in a team',
      resolve: (_, args, ctx) =>
        ctx.prisma.attributeList.findMany({
          where: {
            user: { slug: args.userSlug },
            attribute: { teamId: ctx.session?.teamId ?? '' },
          },
          orderBy: { attribute: { name: 'asc' } },
        }),
    });
    t.nullable.field('attributeList', {
      type: 'AttributeList',
      args: {
        attributeId: stringArg(),
        userId: stringArg(),
      },
      authorize: authorizeSession,
      description: 'Get a single attribute inventory record',
      resolve: (_, args, ctx) =>
        ctx.prisma.attributeList.findFirst({
          where: {
            userId: args.userId,
            attributeId: args.attributeId,
            attribute: { teamId: ctx.session?.teamId ?? '' },
          },
        }),
    });
  },
});

export const attributeListMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nullable.field('updateAttributeList', {
      type: 'AttributeList',
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
          return Error('Attribute list is not part of logged in team');
        if (
          !(ctx.member?.role === Role.CAPTAIN && attribute.teamId === ctx.session.teamId) &&
          !ctx.session.user.isAdmin
        )
          return Error('User does not have permission to perform this action');

        return true;
      },
      resolve: async (_, args, ctx) => {
        const attributeList = await ctx.prisma.attributeList.findFirst({
          where: { attributeId: args.attributeId, userId: args.userId },
        });

        if (!attributeList && args.amount > 0)
          return await ctx.prisma.attributeList.create({ data: args });
        else if (attributeList && args.amount === 0)
          // FIXME: Cannot return null for non-nullable field AttributeList.user.
          return await ctx.prisma.attributeList.delete({ where: { id: attributeList.id } });
        else if (attributeList && args.amount > 0)
          return ctx.prisma.attributeList.update({
            where: { id: attributeList.id },
            data: { amount: args.amount },
          });
        else return null;
      },
    });
  },
});
