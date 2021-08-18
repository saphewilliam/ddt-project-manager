import { extendType } from 'nexus';

export const UserQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('user', {
      type: 'User',
    });
    t.nonNull.list.nonNull.field('users', {
      type: 'User',
    });
  },
});
