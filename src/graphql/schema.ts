import NexusPrismaScalars from 'nexus-prisma/scalars';
import { makeSchema, fieldAuthorizePlugin, queryComplexityPlugin } from 'nexus';
import path from 'path';
import { FieldAuthorizePluginErrorConfig } from 'nexus/dist/plugins/fieldAuthorizePlugin';
import glob from 'fast-glob';

async function generateNexusSchema(): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const types: any[] = [];
  const cwd = './src/graphql/';
  const paths = await glob(`${cwd}*/model.ts`);

  for (const path of paths) {
    const data = await import(`./${path.substr(cwd.length)}`);
    types.push(data);
  }

  makeSchema({
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
}

generateNexusSchema();
