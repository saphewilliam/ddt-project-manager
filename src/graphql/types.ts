import { GraphQLScalarType } from 'graphql';
import { DateTimeResolver, JSONResolver } from 'graphql-scalars';

export * from './Attribute/model';
export * from './AttributeInventory/model';
export * from './AttributesOnProjectPart/model';
export * from './AttributesOnSubtheme/model';
export * from './Event/model';
export * from './History/model';
export * from './Member/model';
export * from './Project/model';
export * from './ProjectPart/model';
export * from './Session/model';
export * from './Stat/model';
export * from './StatsOnProject/model';
export * from './Stone/model';
export * from './StoneInventory/model';
export * from './StonesOnProjectPart/model';
export * from './StonesOnSubtheme/model';
export * from './StoneType/model';
export * from './Subtheme/model';
export * from './Team/model';
export * from './User/model';

export const dateTimeScalar = new GraphQLScalarType(DateTimeResolver);
export const jsonScalar = new GraphQLScalarType({ ...JSONResolver, name: 'Json' });
