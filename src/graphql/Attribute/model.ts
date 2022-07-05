import graphqlFields from 'graphql-fields';
import { ArgsDictionary, Authorized, createMethodDecorator, Extensions } from 'type-graphql';
import * as TypeGraphQL from 'type-graphql';
import {
  ResolverActionsConfig,
  CreateAttributeResolver,
  AttributeRelationsResolver,
  ModelConfig,
  RelationResolverActionsConfig,
  Attribute,
  FindManyAttributeArgs,
} from '@graphql/__generated__/type-graphql-transpiled';
import {
  transformFields,
  transformCountFieldIntoSelectRelationsCount,
} from '@graphql/__generated__/type-graphql-transpiled/helpers';
import type { Context } from '@graphql/context';
import type { GraphQLResolveInfo } from 'graphql';

@TypeGraphQL.Resolver((_of) => Attribute)
class AttributeResolver {
  @TypeGraphQL.Query((_returns) => [Attribute])
  async attributes(
    @TypeGraphQL.Ctx() ctx: Context,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyAttributeArgs,
  ): Promise<Attribute[]> {
    const { _count } = transformFields(graphqlFields(info));
    return ctx.prisma.attribute.findMany({
      ...args,
      ...(_count && transformCountFieldIntoSelectRelationsCount(_count)),
      where: {
        ...args.where,
        teamId: ctx.session?.teamId ?? '',
      },
    });
  }
}

export const resolvers = [
  AttributeRelationsResolver,
  CreateAttributeResolver,
  AttributeResolver,
] as const;

export const modelConfig: ModelConfig<'Attribute'> = {};

export const relationsConfig: RelationResolverActionsConfig<'Attribute'> = {};

export const actionsConfig: ResolverActionsConfig<'Attribute'> = {};

// createAttribute: [
//   Authorized(Role.Admin),
//   Extensions({ logMessage: 'Danger zone', logLevel: LogLevel.WARN }),
// ],
