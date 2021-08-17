import { objectType } from 'nexus';
import { User } from 'nexus-prisma';

export const UserModel = objectType({
  name: User.$name,
  description: User.$description,
  definition(t) {
    console.log(Object.keys(User));

    t.field(User.id);
    t.field(User.createdAt);
    t.field(User.updatedAt);
  },
});
