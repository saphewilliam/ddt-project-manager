import { extendType, stringArg } from 'nexus';
import { AttributeList } from 'nexus-prisma';
import { authorizeSession } from '@lib/authHelpers';
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
  },
});
