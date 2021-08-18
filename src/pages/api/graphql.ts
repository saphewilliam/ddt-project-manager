import { ApolloServer } from 'apollo-server-micro';
import { PageConfig } from 'next';
import { schema } from '@graphql/schema';
import { createApiContext } from '@lib/apiContext';
import { environment } from '@lib/environment';

const server = new ApolloServer({
  schema,
  context: createApiContext,
  tracing: environment.env === 'DEVELOP',
  playground: environment.env === 'DEVELOP',
});

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/api/graphql' });
