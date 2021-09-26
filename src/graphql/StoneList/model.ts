import { Role } from '@prisma/client';
import { extendType, intArg, stringArg } from 'nexus';
import { StoneList } from 'nexus-prisma';
import { authorizeSession, isValidSession } from '@lib/authHelpers';
import { nexusModel } from '@lib/nexusHelpers';

export const stoneListModel = nexusModel(StoneList);

export const stoneListQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('userStoneList', {
      type: 'StoneList',
      args: {
        userSlug: stringArg(),
      },
      authorize: authorizeSession,
      description: 'Get stonelist of a user in a team',
      resolve: (_, args, ctx) =>
        ctx.prisma.stoneList.findMany({
          where: {
            user: { slug: args.userSlug },
            stone: { stoneType: { teamId: ctx.session?.teamId ?? '' } },
          },
          orderBy: [{ stone: { stoneType: { order: 'asc' } } }, { stone: { order: 'asc' } }],
        }),
    });
    t.nullable.field('stoneList', {
      type: 'StoneList',
      args: {
        stoneId: stringArg(),
        userId: stringArg(),
      },
      authorize: authorizeSession,
      description: 'Get a single stonelist record',
      resolve: (_, args, ctx) =>
        ctx.prisma.stoneList.findFirst({
          where: {
            userId: args.userId,
            stoneId: args.stoneId,
            stone: { stoneType: { teamId: ctx.session?.teamId ?? '' } },
          },
        }),
    });
  },
});

export const stoneListMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nullable.field('updateStoneList', {
      type: 'StoneList',
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
          return Error('Stone list is not part of logged in team');
        if (
          !(ctx.member?.role === Role.CAPTAIN && stone.stoneType.teamId === ctx.session.teamId) &&
          !ctx.session.user.isAdmin
        )
          return Error('User does not have correct permissions to perform this action');

        return true;
      },
      resolve: async (_, args, ctx) => {
        const stoneList = await ctx.prisma.stoneList.findFirst({
          where: { stoneId: args.stoneId, userId: args.userId },
        });

        if (!stoneList && args.amount > 0) return await ctx.prisma.stoneList.create({ data: args });
        else if (stoneList && args.amount === 0)
          // FIXME: Cannot return null for non-nullable field StoneList.user.
          return await ctx.prisma.stoneList.delete({ where: { id: stoneList.id } });
        else if (stoneList && args.amount > 0)
          return ctx.prisma.stoneList.update({
            where: { id: stoneList.id },
            data: { amount: args.amount },
          });
        else return null;
      },
    });
  },
});
