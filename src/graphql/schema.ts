import { makeSchema, fieldAuthorizePlugin, queryComplexityPlugin } from 'nexus';
import { FieldAuthorizePluginErrorConfig } from 'nexus/dist/plugins/fieldAuthorizePlugin';
import { join as pathJoin } from 'path';
import * as types from './types';

export const schema = makeSchema({
  types,
  plugins: [
    fieldAuthorizePlugin({
      formatError: ({ error }: FieldAuthorizePluginErrorConfig): Error =>
        error ?? new Error('Not authorized'),
    }),
    queryComplexityPlugin(),
  ],
  outputs: {
    typegen: pathJoin(process.cwd(), 'src', 'graphql', '__generated__', 'nexus.d.ts'),
    schema: pathJoin(process.cwd(), 'schema.graphql'),
  },
  nonNullDefaults: {
    input: true,
    output: true,
  },
  contextType: {
    export: 'ApiContext',
    module: pathJoin(process.cwd(), 'src', 'lib', 'apiContext.ts'),
  },
});
