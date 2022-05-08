import { extendType, arg, inputObjectType } from 'nexus';
import { Attribute } from 'nexus-prisma';
import { authorizeSession } from '@lib/authHelpers';
import { nexusModel } from '@lib/nexusHelpers';

export const attributeModel = nexusModel(Attribute);

export const attributeQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('attributes', {
      type: 'Attribute',
      authorize: authorizeSession,
      description: 'Get all attributes of a team',
      resolve: (_, __, ctx) => {
        return ctx.prisma.attribute.findMany({
          where: { teamId: ctx.session?.teamId ?? '' },
          orderBy: { name: 'asc' },
        });
      },
    });
  },
});

export const attributeCreateInput = inputObjectType({
  name: 'AttributeCreateInput',
  definition(t) {
    t.string('name');
    t.string('namePlural');
  },
});

export const attributeMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('createAttritbute', {
      type: 'Attribute',
      authorize: authorizeSession,
      description: 'Creates an attribute',
      args: {
        data: arg({ type: 'AttributeCreateInput' }),
      },
      resolve: (_, args, ctx) => {
        return ctx.prisma.attribute.create({
          data: {
            name: args.data.name,
            namePlural: args.data.namePlural,
            team: {
              connect: { id: ctx.session?.teamId ?? '' },
            },
          },
        });
      },
    });
  },
});
