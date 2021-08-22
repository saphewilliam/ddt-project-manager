import { nexusModel } from '@lib/nexusModel';
import { Team } from 'nexus-prisma';
import { extendType } from 'nexus';
import { ApiContext } from '@lib/apiContext';
import { isValidSesssion } from '@lib/authHelpers';

export const TeamModel = nexusModel(Team);

export const TeamQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('teams', {
      type: 'Team',
      description: 'Fetch the teams that the user is a member of',
      authorize: async (_, __, ctx: ApiContext) => isValidSesssion(ctx.session),
      resolve: async (_, __, ctx: ApiContext) =>
        ctx.prisma.team.findMany({ where: { members: { some: { userId: ctx.session?.userId } } } }),
    });
  },
});
