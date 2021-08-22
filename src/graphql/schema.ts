import NexusPrismaScalars from 'nexus-prisma/scalars';
import { makeSchema, fieldAuthorizePlugin, queryComplexityPlugin } from 'nexus';
import * as types from './types';
import path from 'path';
import { FieldAuthorizePluginErrorConfig } from 'nexus/dist/plugins/fieldAuthorizePlugin';

export const schema = makeSchema({
  types: [types, NexusPrismaScalars],
  plugins: [
    fieldAuthorizePlugin({
      formatError: ({ error }: FieldAuthorizePluginErrorConfig): Error =>
        error ?? new Error('Not authorized'),
    }),
    queryComplexityPlugin(),
  ],
  nonNullDefaults: {
    input: true,
    output: true,
  },
  outputs: {
    typegen: path.join(__dirname, '/__generated__/nexus.d.ts'),
    schema: path.join(__dirname, '../../schema.graphql'),
  },
});
