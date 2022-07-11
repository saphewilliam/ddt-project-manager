import * as TypeGraphQL from 'type-graphql';
import {
  ResolverActionsConfig,
  AttributeRelationsResolver,
  ModelConfig,
  RelationResolverActionsConfig,
  Attribute,
  FindManyAttributeArgs,
  CreateAttributeArgs,
} from '@graphql/__generated__/type-graphql-transpiled';
import { Auth } from '@lib/authHelpers';
import { count } from '@lib/graphqlHelpers';
import type { Context } from '@graphql/context';
import type { GraphQLResolveInfo } from 'graphql';

@TypeGraphQL.Resolver((_of) => Attribute)
class AttributeResolver {
  @TypeGraphQL.Query((_returns) => [Attribute])
  @Auth()
  async attributes(
    @TypeGraphQL.Ctx() ctx: Context,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyAttributeArgs,
  ): Promise<Attribute[]> {
    return ctx.prisma.attribute.findMany({
      ...args,
      ...count(info),
      where: { ...args.where, teamId: ctx.session?.teamId ?? '' },
    });
  }

  @TypeGraphQL.Mutation((_returns) => Attribute)
  @Auth('CAPTAIN')
  async createAttribute(
    @TypeGraphQL.Ctx() ctx: Context,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateAttributeArgs,
  ): Promise<Attribute> {
    return ctx.prisma.attribute.create({
      ...args,
      ...count(info),
      data: { ...args.data, teamId: ctx.session?.teamId ?? '' },
    });
  }
}

export const resolvers = [AttributeRelationsResolver, AttributeResolver] as const;

export const modelConfig: ModelConfig<'Attribute'> = {};

export const relationsConfig: RelationResolverActionsConfig<'Attribute'> = {};

export const actionsConfig: ResolverActionsConfig<'Attribute'> = {};

// createAttribute: [
//   Authorized(Role.Admin),
//   Extensions({ logMessage: 'Danger zone', logLevel: LogLevel.WARN }),
// ],
