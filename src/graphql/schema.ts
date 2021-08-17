import NexusPrismaScalars from 'nexus-prisma/scalars';
import { makeSchema } from 'nexus';
import { queryType } from 'nexus';
import * as types from './types';

const Query = queryType({
  definition(t) {
    t.string('hello', { resolve: () => 'hello world!' });
  },
});

export const schema = makeSchema({
  types: [Query, types, NexusPrismaScalars],
});
