import { ApolloServer } from 'apollo-server-micro';
import { PageConfig } from 'next';
import { schema } from '@graphql/schema';

const server = new ApolloServer({ schema });

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/api/graphql' });
