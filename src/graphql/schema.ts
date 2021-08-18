import NexusPrismaScalars from 'nexus-prisma/scalars';
import { makeSchema, fieldAuthorizePlugin, queryComplexityPlugin } from 'nexus';
import * as types from './types';
import path from 'path';

export const schema = makeSchema({
  types: [types, NexusPrismaScalars],
  plugins: [fieldAuthorizePlugin(), queryComplexityPlugin()],
  prettierConfig: path.join(__dirname, '../../.prettierrc'),
  nonNullDefaults: { input: true, output: false },
});
