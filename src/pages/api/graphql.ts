import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { PageConfig } from 'next';
import { createContext } from '@graphql/context';
import { schema } from '@graphql/schema';

const apolloServer = new ApolloServer({
  schema,
  context: createContext,
});

const startServer = apolloServer.start();

const cors = Cors();

export const config: PageConfig = { api: { bodyParser: false } };

export default cors(async function handler(req, res): Promise<void | boolean> {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  await startServer;

  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res);
});
