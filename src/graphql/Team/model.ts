import { extendType } from 'nexus';
import { Team } from 'nexus-prisma';
import { ApiContext } from '@lib/apiContext';
import { isValidSession } from '@lib/authHelpers';
import { nexusModel } from '@lib/nexusHelpers';

export const teamModel = nexusModel(Team);

export const teamQuery = extendType({
  type: 'Query',
  definition(t) {
    t.list.field('teams', {
      type: 'Team',
      description: 'Fetch the teams that the user is a member of',
      authorize: (_, __, ctx: ApiContext) => isValidSession(ctx.session, true),
      resolve: (_, __, ctx: ApiContext) =>
        ctx.prisma.team.findMany({ where: { members: { some: { userId: ctx.session?.userId } } } }),
    });
  },
});
