import { arg, extendType, inputObjectType, stringArg } from 'nexus';
import { User } from 'nexus-prisma';
import { authorizeSession, hashPw } from '@lib/authHelpers';
import { nexusModel } from '@lib/nexusHelpers';
import { generateSlug } from '@lib/util';

export const userModel = nexusModel(User, {
  hide: ['password'],
  extend: async (t) => {
    t.int('stoneAmount', {
      description: 'The number of dominoes this user posesses',
      authorize: authorizeSession,
      resolve: async (root, __, ctx) => {
        const result = await ctx.prisma.stoneInventory.aggregate({
          _sum: { amount: true },
          where: { userId: root.id, stone: { stoneType: { teamId: ctx.session?.teamId ?? '' } } },
        });
        return result._sum.amount ?? 0;
      },
    });
  },
});

export const userQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nullable.field('user', {
      type: 'User',
      description: 'Find user by its slug',
      args: {
        userSlug: stringArg(),
      },
      authorize: authorizeSession,
      resolve: (_, args, ctx) =>
        ctx.prisma.user.findFirst({
          where: { teams: { some: { teamId: ctx.session?.teamId ?? '' } }, slug: args.userSlug },
        }),
    });
    t.list.field('users', {
      type: 'User',
      description: 'Find all users of this team',
      authorize: authorizeSession,
      resolve: (_, __, ctx) =>
        ctx.prisma.user.findMany({
          where: { teams: { some: { teamId: ctx.session?.teamId ?? '' } } },
          orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
        }),
    });
    t.list.field('inventoryUsers', {
      type: 'User',
      description: 'Find all users of this team that have a nonzero inventory in this team',
      authorize: authorizeSession,
      resolve: (_, __, ctx) =>
        ctx.prisma.user.findMany({
          where: {
            teams: { some: { teamId: ctx.session?.teamId ?? '' } },
            OR: [
              {
                stoneInventory: {
                  some: { stone: { stoneType: { teamId: ctx.session?.teamId ?? '' } } },
                },
              },
              {
                attributeInventory: {
                  some: { attribute: { teamId: ctx.session?.teamId ?? '' } },
                },
              },
            ],
          },
          orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
        }),
    });
  },
});

export const userCreateInput = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.string('firstName');
    t.string('lastName');
    t.string('displayName');
    t.string('password');
    t.string('email');
    t.boolean('isAdmin');
  },
});

export const userMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createUser', {
      type: 'User',
      authorize: authorizeSession,
      description: 'Creates an user',
      args: {
        data: arg({ type: userCreateInput }),
      },
      resolve: async (_, args, ctx) => {
        return ctx.prisma.user.create({
          data: {
            firstName: args.data.firstName,
            lastName: args.data.lastName,
            slug: generateSlug(args.data.firstName),
            displayName: args.data.displayName,
            password: await hashPw(args.data.password),
            email: args.data.email,
            isAdmin: args.data.isAdmin,
          },
        });
      },
    });
  },
});
