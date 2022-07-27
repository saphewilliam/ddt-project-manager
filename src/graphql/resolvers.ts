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
import * as project from './Project/model';
import * as session from './Session/model';
import * as team from './Team/model';
import * as user from './User/model';

export const resolvers = [
  ...attribute.resolvers,
  ...project.resolvers,
  ...session.resolvers,
  ...team.resolvers,
  ...user.resolvers,
] as const;

const modelsEnhanceMap: ModelsEnhanceMap = {
  Attribute: attribute.modelConfig,
  Project: project.modelConfig,
  Session: session.modelConfig,
  Team: team.modelConfig,
  User: team.modelConfig,
};

const resolversEnhanceMap: ResolversEnhanceMap = {
  Attribute: attribute.actionsConfig,
  Project: project.actionsConfig,
  Session: session.actionsConfig,
  Team: team.actionsConfig,
  User: user.actionsConfig,
};

const relationResolversEnhanceMap: RelationResolversEnhanceMap = {
  Attribute: attribute.relationsConfig,
  Project: project.relationsConfig,
  Session: session.relationsConfig,
  Team: team.relationsConfig,
  User: user.actionsConfig,
};

applyModelsEnhanceMap(modelsEnhanceMap);
applyResolversEnhanceMap(resolversEnhanceMap);
applyRelationResolversEnhanceMap(relationResolversEnhanceMap);
