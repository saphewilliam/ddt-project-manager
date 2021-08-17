import { objectType } from 'nexus';
import { Team } from 'nexus-prisma';

export const TeamModel = objectType({
  name: Team.$name,
  description: Team.$description,
  definition(t) {
    console.log(Object.keys(Team));

    t.field(Team.id);
    t.field(Team.createdAt);
    t.field(Team.updatedAt);
  },
});
