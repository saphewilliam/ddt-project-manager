import {
  applyModelsEnhanceMap,
  applyRelationResolversEnhanceMap,
  applyResolversEnhanceMap,
  ModelsEnhanceMap,
  RelationResolversEnhanceMap,
  ResolversEnhanceMap,
} from './__generated__/type-graphql-transpiled';
import * as attribute from './Attribute/model';
// import * as member from './Member/m'
import * as session from './Session/model';
import * as team from './Team/model';
import * as user from './User/model';

export const resolvers = [
  ...attribute.resolvers,
  ...session.resolvers,
  ...team.resolvers,
  ...user.resolvers,
] as const;

const modelsEnhanceMap: ModelsEnhanceMap = {
  Attribute: attribute.modelConfig,
  Session: session.modelConfig,
  Team: team.modelConfig,
  User: team.modelConfig,
};

const resolversEnhanceMap: ResolversEnhanceMap = {
  Attribute: attribute.actionsConfig,
  Session: session.actionsConfig,
  Team: team.actionsConfig,
  User: user.actionsConfig,
};

const relationResolversEnhanceMap: RelationResolversEnhanceMap = {
  Attribute: attribute.relationsConfig,
  Session: session.relationsConfig,
  Team: team.relationsConfig,
  User: user.actionsConfig,
};

applyModelsEnhanceMap(modelsEnhanceMap);
applyResolversEnhanceMap(resolversEnhanceMap);
applyRelationResolversEnhanceMap(relationResolversEnhanceMap);
