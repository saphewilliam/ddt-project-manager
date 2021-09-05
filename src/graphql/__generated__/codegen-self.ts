import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
import { ClientError } from 'graphql-request/dist/types';
import useSWR, { ConfigInterface as SWRConfigInterface, keyInterface as SWRKeyInterface } from 'swr';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * The `BigInt` scalar type represents non-fractional signed whole numeric values.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt
   */
  BigInt: any;
  /** The `Byte` scalar type represents byte value as a Buffer */
  Bytes: any;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** An arbitrary-precision Decimal type */
  Decimal: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  Json: any;
};

export type Attribute = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  attributeLists: Array<AttributeList>;
  projects: Array<AttributesOnProject>;
  subthemes: Array<AttributesOnSubtheme>;
  teamId: Scalars['String'];
  team: Team;
};

export type AttributeList = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  amount: Scalars['Int'];
  attributeId: Scalars['String'];
  attribute: Attribute;
  userId: Scalars['String'];
  user: User;
};

export type AttributesOnProject = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  amount: Scalars['Int'];
  attributeId: Scalars['String'];
  attribute: Attribute;
  userId: Scalars['String'];
  user: User;
  projectId: Scalars['String'];
  project: Project;
};

export type AttributesOnSubtheme = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  amount: Scalars['Int'];
  attributeId: Scalars['String'];
  attribute: Attribute;
  userId: Scalars['String'];
  user: User;
  subthemeId: Scalars['String'];
  subtheme: Subtheme;
};

export type Event = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  date: Scalars['DateTime'];
  slug: Scalars['String'];
  subthemes: Array<Subtheme>;
  teamId: Scalars['String'];
  team: Team;
};

export type Member = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  role: Role;
  userId: Scalars['String'];
  user: User;
  teamId: Scalars['String'];
  team: Team;
};

export type Mutation = {
  /** Generate a new session for a user with an active account */
  login: Scalars['String'];
  /** Set the `team` field of an active session */
  setSessionTeam: Session;
  /** Invalidate an active session */
  logout: Session;
};


export type MutationloginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  isPermanent: Scalars['Boolean'];
};


export type MutationsetSessionTeamArgs = {
  token: Scalars['String'];
  teamId: Scalars['String'];
};


export type MutationlogoutArgs = {
  token: Scalars['String'];
};

export type Project = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  slug: Scalars['String'];
  description: Scalars['String'];
  number: Scalars['Int'];
  subNumber: Scalars['Int'];
  type: ProjectType;
  status: ProjectStatus;
  attributes: Array<AttributesOnProject>;
  stones: Array<StonesOnProject>;
  stats: Array<StatsOnProject>;
  subthemeId: Scalars['String'];
  subtheme: Subtheme;
  supervisorId: Scalars['String'];
  supervisor: User;
};

export enum ProjectStatus {
  CANCELLED = 'CANCELLED',
  STARTING = 'STARTING',
  PLANNING = 'PLANNING',
  PLANNED = 'PLANNED',
  BUILDING = 'BUILDING',
  BUILT = 'BUILT'
}

export enum ProjectType {
  FIELD_L1 = 'FIELD_L1',
  FIELD_L2 = 'FIELD_L2',
  FIELD_M50 = 'FIELD_M50',
  FIELD_FLAT = 'FIELD_FLAT',
  FIELD_CROSS_L2 = 'FIELD_CROSS_L2',
  FIELD_CIRCLE = 'FIELD_CIRCLE',
  WALL_X = 'WALL_X',
  WALL_S = 'WALL_S',
  WALL_T = 'WALL_T',
  WALL_SPEED = 'WALL_SPEED',
  WALL_CUBE = 'WALL_CUBE',
  WALL_OCTO = 'WALL_OCTO',
  FALLWALL = 'FALLWALL',
  SPIRAL = 'SPIRAL',
  STRUCTURE = 'STRUCTURE',
  HANDSET = 'HANDSET',
  DECOR = 'DECOR',
  OTHER = 'OTHER'
}

export type Query = {
  events: Array<Event>;
  /** Get session by its token */
  session: Maybe<Session>;
  /** Find all users of this team that have a nonzero stonelist in this team */
  stoneListUsers: Array<User>;
  /** Fetch the teams that the user is a member of */
  teams: Array<Team>;
};


export type QuerysessionArgs = {
  token: Scalars['String'];
};

export enum Role {
  CAPTAIN = 'CAPTAIN',
  BUILDER = 'BUILDER',
  GUEST = 'GUEST'
}

export type Session = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  expiresAt: Maybe<Scalars['DateTime']>;
  userId: Scalars['String'];
  user: User;
  teamId: Maybe<Scalars['String']>;
  team: Maybe<Team>;
  member: Maybe<Member>;
};

export type Stat = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  projects: Array<StatsOnProject>;
  teamId: Scalars['String'];
  team: Team;
};

export type StatsOnProject = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  amount: Scalars['Int'];
  statId: Scalars['String'];
  stat: Stat;
  projectId: Scalars['String'];
  project: Project;
};

export type Stone = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  alias: Scalars['String'];
  alias2: Maybe<Scalars['String']>;
  hex: Scalars['String'];
  hex2: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  order: Scalars['Int'];
  stoneLists: Array<StoneList>;
  projects: Array<StonesOnProject>;
  subthemes: Array<StonesOnSubtheme>;
  stoneTypeId: Scalars['String'];
  stoneType: StoneType;
};

export type StoneList = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  amount: Scalars['Int'];
  stoneId: Scalars['String'];
  stone: Stone;
  userId: Scalars['String'];
  user: User;
};

export type StoneType = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  description: Scalars['String'];
  order: Scalars['Int'];
  stones: Array<Stone>;
  teamId: Scalars['String'];
  team: Team;
};

export type StonesOnProject = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  amount: Scalars['Int'];
  stoneId: Scalars['String'];
  stone: Stone;
  userId: Scalars['String'];
  user: User;
  projectId: Scalars['String'];
  project: Project;
};

export type StonesOnSubtheme = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  amount: Scalars['Int'];
  stoneId: Scalars['String'];
  stone: Stone;
  userId: Scalars['String'];
  user: User;
  subthemeId: Scalars['String'];
  subtheme: Subtheme;
};

export type Subtheme = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  color: Scalars['String'];
  order: Scalars['Int'];
  slug: Scalars['String'];
  projects: Array<Project>;
  attributes: Array<AttributesOnSubtheme>;
  stones: Array<StonesOnSubtheme>;
  eventId: Scalars['String'];
  event: Event;
};

export type Team = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  members: Array<Member>;
  sessions: Array<Session>;
  events: Array<Event>;
  stoneTypes: Array<StoneType>;
  attributes: Array<Attribute>;
  stats: Array<Stat>;
};

export type User = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  displayName: Scalars['String'];
  slug: Scalars['String'];
  avatar: Maybe<Scalars['String']>;
  email: Scalars['String'];
  isAdmin: Scalars['Boolean'];
  sessions: Array<Session>;
  stoneLists: Array<StoneList>;
  stonesOnProjects: Array<StonesOnProject>;
  stonesOnSubthemes: Array<StonesOnSubtheme>;
  attributeLists: Array<AttributeList>;
  attributesOnProjects: Array<AttributesOnProject>;
  attributesOnSubthemes: Array<AttributesOnSubtheme>;
  /** The teams this user is a member of */
  teams: Array<Member>;
  /** The projects that this user supervises */
  projects: Array<Project>;
};

export type getUIQueryVariables = Exact<{ [key: string]: never; }>;


export type getUIQuery = { events: Array<{ id: string, name: string, slug: string }>, stoneListUsers: Array<{ id: string, firstName: string, lastName: string, slug: string }> };

export type loginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  isPermanent: Scalars['Boolean'];
}>;


export type loginMutation = { login: string };

export type setSessionTeamMutationVariables = Exact<{
  token: Scalars['String'];
  teamId: Scalars['String'];
}>;


export type setSessionTeamMutation = { setSessionTeam: { id: string } };

export type getSessionQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type getSessionQuery = { session: Maybe<{ id: string, expiresAt: Maybe<any>, team: Maybe<{ id: string, name: string }>, user: { id: string, displayName: string, firstName: string, lastName: string, avatar: Maybe<string>, isAdmin: boolean }, member: Maybe<{ id: string, role: Role }> }> };

export type getTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type getTeamsQuery = { teams: Array<{ id: string, name: string }> };


export const getUIDocument = gql`
    query getUI {
  events {
    id
    name
    slug
  }
  stoneListUsers {
    id
    firstName
    lastName
    slug
  }
}
    `;
export const loginDocument = gql`
    mutation login($email: String!, $password: String!, $isPermanent: Boolean!) {
  login(email: $email, password: $password, isPermanent: $isPermanent)
}
    `;
export const setSessionTeamDocument = gql`
    mutation setSessionTeam($token: String!, $teamId: String!) {
  setSessionTeam(token: $token, teamId: $teamId) {
    id
  }
}
    `;
export const getSessionDocument = gql`
    query getSession($token: String!) {
  session(token: $token) {
    id
    expiresAt
    team {
      id
      name
    }
    user {
      id
      displayName
      firstName
      lastName
      avatar
      isAdmin
    }
    member {
      id
      role
    }
  }
}
    `;
export const getTeamsDocument = gql`
    query getTeams {
  teams {
    id
    name
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getUI(variables?: getUIQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<getUIQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<getUIQuery>(getUIDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUI');
    },
    login(variables: loginMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<loginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<loginMutation>(loginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'login');
    },
    setSessionTeam(variables: setSessionTeamMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<setSessionTeamMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<setSessionTeamMutation>(setSessionTeamDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setSessionTeam');
    },
    getSession(variables: getSessionQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<getSessionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<getSessionQuery>(getSessionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getSession');
    },
    getTeams(variables?: getTeamsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<getTeamsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<getTeamsQuery>(getTeamsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTeams');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export function getSdkWithHooks(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  const sdk = getSdk(client, withWrapper);
  const genKey = <V extends Record<string, unknown> = Record<string, unknown>>(name: string, object: V = {} as V): SWRKeyInterface => [name, ...Object.keys(object).sort().map(key => object[key])];
  return {
    ...sdk,
    useGetUi(variables?: getUIQueryVariables, config?: SWRConfigInterface<getUIQuery, ClientError>) {
      return useSWR<getUIQuery, ClientError>(genKey<getUIQueryVariables>('GetUi', variables), () => sdk.getUI(variables), config);
    },
    useGetSession(variables: getSessionQueryVariables, config?: SWRConfigInterface<getSessionQuery, ClientError>) {
      return useSWR<getSessionQuery, ClientError>(genKey<getSessionQueryVariables>('GetSession', variables), () => sdk.getSession(variables), config);
    },
    useGetTeams(variables?: getTeamsQueryVariables, config?: SWRConfigInterface<getTeamsQuery, ClientError>) {
      return useSWR<getTeamsQuery, ClientError>(genKey<getTeamsQueryVariables>('GetTeams', variables), () => sdk.getTeams(variables), config);
    }
  };
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>;