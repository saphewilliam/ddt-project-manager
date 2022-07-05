import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { PageConfig } from 'next';
import { createContext } from '@graphql/context';
import { makeSchema } from '@graphql/schema';

// export class LoggerMiddleware implements MiddlewareInterface<Context> {
//   constructor(private readonly logger: Logger) {}

//   use({ info }: ResolverData, next: NextFn) {
//     // extract `extensions` object from GraphQLResolveInfo object to get the `logMessage` value
//     const { logMessage } = info.parentType.getFields()[info.fieldName].extensions || {};

//     if (logMessage) {
//       this.logger.log(logMessage);
//     }

//     return next();
//   }
// }

// export class CustomAuthChecker implements AuthCheckerInterface<ContextType> {
//   // inject dependency
//   constructor(private readonly userRepository: Repository<User>) {}

//   check({ root, args, context, info }: ResolverData<ContextType>, roles: string[]) {
//     const userId = getUserIdFromToken(context.token);
//     // use injected service
//     const user = this.userRepository.getById(userId);

//     // custom logic here, e.g.:
//     return user % 2 === 0;
//   }
// }

// export const customAuthChecker: AuthChecker<ContextType> = (
//   { root, args, context, info },
//   roles,
// ) => {
//   // here we can read the user from context
//   // and check his permission in the db against the `roles` argument
//   // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]

//   return true; // or false if access is denied
// };

const cors = Cors();

export default cors(async function handler(req, res): Promise<void | boolean> {
  if (req.method === 'OPTIONS') {
    res.end();
    return false;
  }

  const schema = await makeSchema();

  const apolloServer = new ApolloServer({ schema, context: createContext });

  await apolloServer.start();

  return await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
});

export const config: PageConfig = { api: { bodyParser: false } };
