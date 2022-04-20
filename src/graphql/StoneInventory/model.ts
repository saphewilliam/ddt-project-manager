import { Role } from '@prisma/client';
import { extendType, intArg, stringArg } from 'nexus';
import { StoneInventory } from 'nexus-prisma';
import { authorizeSession, isValidSession } from '@lib/authHelpers';
import { nexusModel } from '@lib/nexusHelpers';

export const stoneInventoryModel = nexusModel(StoneInventory);

export const stoneInventoryQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('userStoneInventory', {
      type: 'StoneInventory',
      args: {
        userSlug: stringArg(),
      },
      authorize: authorizeSession,
      description: 'Get stone inventory of a user in a team',
      resolve: (_, args, ctx) =>
        ctx.prisma.stoneInventory.findMany({
          where: {
            user: { slug: args.userSlug },
            stone: { stoneType: { teamId: ctx.session?.teamId ?? '' } },
          },
          orderBy: [{ stone: { stoneType: { order: 'asc' } } }, { stone: { order: 'asc' } }],
        }),
    });
    t.nullable.field('stoneInventory', {
      type: 'StoneInventory',
      args: {
        stoneId: stringArg(),
        userId: stringArg(),
      },
      authorize: authorizeSession,
      description: 'Get a single stone inventory record',
      resolve: (_, args, ctx) =>
        ctx.prisma.stoneInventory.findFirst({
          where: {
            userId: args.userId,
            stoneId: args.stoneId,
            stone: { stoneType: { teamId: ctx.session?.teamId ?? '' } },
          },
        }),
    });
  },
});

export const stoneInventoryMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nullable.field('updateStoneInventory', {
      type: 'StoneInventory',
      args: {
        stoneId: stringArg(),
        userId: stringArg(),
        amount: intArg(),
      },
      authorize: async (_, args, ctx) => {
        const sessionValidation = await isValidSession(ctx.session);
        if (sessionValidation !== true) return sessionValidation;

        const stone = await ctx.prisma.stone.findUnique({
          where: { id: args.stoneId },
          include: { stoneType: true },
        });
        const user = await ctx.prisma.user.findUnique({ where: { id: args.userId } });

        if (args.amount < 0) return Error('Amount should be an integer equal to or greater than 0');
        if (!stone || !user) return Error('Invalid stoneId or userId');
        if (stone.stoneType.teamId !== ctx.session?.teamId)
          return Error('Stone is not part of logged in team');
        if (
          !(ctx.member?.role === Role.CAPTAIN && stone.stoneType.teamId === ctx.session.teamId) &&
          !ctx.session.user.isAdmin
        )
          return Error('User does not have permission to perform this action');

        return true;
      },
      resolve: async (_, args, ctx) => {
        const stoneInventory = await ctx.prisma.stoneInventory.findFirst({
          where: { stoneId: args.stoneId, userId: args.userId },
        });

        if (!stoneInventory && args.amount > 0)
          return await ctx.prisma.stoneInventory.create({ data: args });
        else if (stoneInventory && args.amount === 0) {
          // TODO returning deleted object gives error in frontend
          await ctx.prisma.stoneInventory.delete({ where: { id: stoneInventory.id } });
          return null;
        } else if (stoneInventory && args.amount > 0)
          return ctx.prisma.stoneInventory.update({
            where: { id: stoneInventory.id },
            data: { amount: args.amount },
          });
        else return null;
      },
    });
  },
});
