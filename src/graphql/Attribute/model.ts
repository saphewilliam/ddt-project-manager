import { extendType } from 'nexus';
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
