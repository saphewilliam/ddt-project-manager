import {
  applyModelsEnhanceMap,
  applyRelationResolversEnhanceMap,
  applyResolversEnhanceMap,
  ModelsEnhanceMap,
  RelationResolversEnhanceMap,
  ResolversEnhanceMap,
} from './__generated__/type-graphql-transpiled';
import * as attribute from './Attribute/model';
import * as session from './Session/model';
import * as team from './Team/model';

const modelsEnhanceMap: ModelsEnhanceMap = {
  Attribute: attribute.modelConfig,
  Session: session.modelConfig,
  Team: team.modelConfig,
};

const resolversEnhanceMap: ResolversEnhanceMap = {
  Attribute: attribute.actionsConfig,
  Session: session.actionsConfig,
  Team: team.actionsConfig,
};

const relationResolversEnhanceMap: RelationResolversEnhanceMap = {
  Attribute: attribute.relationsConfig,
  Session: session.relationsConfig,
  Team: team.relationsConfig,
};

applyModelsEnhanceMap(modelsEnhanceMap);
applyResolversEnhanceMap(resolversEnhanceMap);
applyRelationResolversEnhanceMap(relationResolversEnhanceMap);

export const resolvers = [...attribute.resolvers, ...session.resolvers, ...team.resolvers] as const;
