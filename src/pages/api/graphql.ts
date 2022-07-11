import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { PageConfig } from 'next';
import { context } from '@graphql/context';
import { makeSchema } from '@graphql/schema';
import { complexityPlugin } from '@lib/graphqlHelpers';

const cors = Cors();

export default cors(async function handler(req, res): Promise<void | boolean> {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  const schema = await makeSchema();

  const apolloServer = new ApolloServer({
    schema,
    context,
    cache: 'bounded',
    plugins: [complexityPlugin(schema)],
  });

  await apolloServer.start();

  return await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
});

export const config: PageConfig = { api: { bodyParser: false } };
