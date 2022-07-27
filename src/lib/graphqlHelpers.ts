import { GraphQLResolveInfo, GraphQLError, GraphQLSchema } from 'graphql';
import graphqlFields from 'graphql-fields';
import { fieldExtensionsEstimator, simpleEstimator } from 'graphql-query-complexity';
import { createComplexityPlugin } from 'graphql-query-complexity-apollo-plugin';
import {
  transformCountFieldIntoSelectRelationsCount,
  transformFields,
} from '@graphql/__generated__/type-graphql-transpiled/helpers';

/** Wrapper function for some helper functions of transpiled type-graphql generated code */
export function count(info: GraphQLResolveInfo) {
  const { _count } = transformFields(graphqlFields(info));
  return _count && transformCountFieldIntoSelectRelationsCount(_count);
}

/** Initialization of the query complexity plugin */
export const complexityPlugin = (schema: GraphQLSchema) =>
  createComplexityPlugin({
    schema,
    estimators: [fieldExtensionsEstimator(), simpleEstimator({ defaultComplexity: 1 })],
    maximumComplexity: 20,
    createError: (max, actual) =>
      new GraphQLError(`Operation is too complex: ${actual}. Maximum allowed complexity: ${max}`),
  });

export const complexity = {
  MUTATION: 10,
  OBJECT: 1,
};

/** Logging middleware */
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
