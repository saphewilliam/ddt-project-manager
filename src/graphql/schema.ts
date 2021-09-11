import { makeSchema, fieldAuthorizePlugin, queryComplexityPlugin } from 'nexus';
import NexusPrismaScalars from 'nexus-prisma/scalars'; // eslint-disable-line import/no-unresolved
import { FieldAuthorizePluginErrorConfig } from 'nexus/dist/plugins/fieldAuthorizePlugin';
import { join } from 'path';
import * as types from './types';

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
    typegen: join(process.cwd(), 'src', 'graphql', '__generated__', 'nexus.d.ts'),
    schema: join(process.cwd(), 'schema.graphql'),
  },
  contextType: {
    export: 'ApiContext',
    module: join(process.cwd(), 'src', 'lib', 'apiContext.ts'),
  },
});
