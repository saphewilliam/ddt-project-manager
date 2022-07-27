import {
  ModelConfig,
  ResolverActionsConfig,
  RelationResolverActionsConfig,
  TeamRelationsResolver,
  FindManyTeamResolver,
} from '@graphql/__generated__/type-graphql-transpiled';

export const resolvers = [TeamRelationsResolver, FindManyTeamResolver] as const;

export const modelConfig: ModelConfig<'Team'> = {};

export const actionsConfig: ResolverActionsConfig<'Team'> = {};

export const relationsConfig: RelationResolverActionsConfig<'Team'> = {};
