import 'reflect-metadata';
import { GraphQLSchema } from 'graphql';
import path from 'node:path';
import { buildSchema } from 'type-graphql';
import { authChecker } from '@lib/authHelpers';
import { resolvers } from './resolvers';

export async function makeSchema(emit?: boolean): Promise<GraphQLSchema> {
  return await buildSchema({
    resolvers,
    validate: false,
    authChecker,
    authMode: 'error',
    emitSchemaFile: emit ? path.resolve(process.cwd(), 'schema.graphql') : undefined,
  });
}

if (process.env.GENERATE === 'true') (async () => makeSchema(true))();
