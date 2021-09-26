import { GraphQLScalarType } from 'graphql';
import { DateTimeResolver } from 'graphql-scalars';

export * from './Attribute/model';
export * from './AttributeList/model';
export * from './AttributesOnProject/model';
export * from './AttributesOnSubtheme/model';
export * from './Event/model';
export * from './Member/model';
export * from './Project/model';
export * from './Session/model';
export * from './Stat/model';
export * from './StatsOnProject/model';
export * from './Stone/model';
export * from './StoneList/model';
export * from './StonesOnProject/model';
export * from './StonesOnSubtheme/model';
export * from './StoneType/model';
export * from './Subtheme/model';
export * from './Team/model';
export * from './User/model';

export const dateTimeScalar = new GraphQLScalarType(DateTimeResolver);
