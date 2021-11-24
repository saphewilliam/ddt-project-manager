import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
import { ClientError } from 'graphql-request/dist/types';
import useSWR, { SWRConfiguration as SWRConfigInterface, Key as SWRKeyInterface } from 'swr';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
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
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type Attribute = {
  attributeLists: Array<AttributeList>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  projects: Array<AttributesOnProject>;
  subthemes: Array<AttributesOnSubtheme>;
  team: Team;
  teamId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type AttributeList = {
  amount: Scalars['Int'];
  attribute: Attribute;
  attributeId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type AttributesOnProject = {
  amount: Scalars['Int'];
  attribute: Attribute;
  attributeId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  project: Project;
  projectId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type AttributesOnSubtheme = {
  amount: Scalars['Int'];
  attribute: Attribute;
  attributeId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  subtheme: Subtheme;
  subthemeId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type Event = {
  createdAt: Scalars['DateTime'];
  date: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
  subthemes: Array<Subtheme>;
  team: Team;
  teamId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Member = {
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  role: Role;
  team: Team;
  teamId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type Mutation = {
  /** Generate a new session for a user with an active account */
  login: Scalars['String'];
  /** Invalidate an active session */
  logout: Session;
  /** Set the `team` field of an active session */
  setSessionTeam: Session;
  updateStoneList: Maybe<StoneList>;
};


export type MutationloginArgs = {
  email: Scalars['String'];
  isPermanent: Scalars['Boolean'];
  password: Scalars['String'];
};


export type MutationsetSessionTeamArgs = {
  teamId: Scalars['String'];
};


export type MutationupdateStoneListArgs = {
  amount: Scalars['Int'];
  stoneId: Scalars['String'];
  userId: Scalars['String'];
};

export type Project = {
  attributes: Array<AttributesOnProject>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  number: Scalars['Int'];
  slug: Scalars['String'];
  stats: Array<StatsOnProject>;
  status: ProjectStatus;
  stones: Array<StonesOnProject>;
  subNumber: Scalars['Int'];
  subtheme: Subtheme;
  subthemeId: Scalars['String'];
  supervisor: Maybe<User>;
  supervisorId: Maybe<Scalars['String']>;
  type: ProjectType;
  updatedAt: Scalars['DateTime'];
};

export enum ProjectStatus {
  BUILDING = 'BUILDING',
  BUILT = 'BUILT',
  CANCELLED = 'CANCELLED',
  COUNTED = 'COUNTED',
  PLANNED = 'PLANNED',
  PLANNING = 'PLANNING',
  READY = 'READY',
  STARTING = 'STARTING'
}

export enum ProjectType {
  DECOR = 'DECOR',
  FALLWALL = 'FALLWALL',
  FIELD_CIRCLE = 'FIELD_CIRCLE',
  FIELD_CROSS_L2 = 'FIELD_CROSS_L2',
  FIELD_FLAT = 'FIELD_FLAT',
  FIELD_L1 = 'FIELD_L1',
  FIELD_L2 = 'FIELD_L2',
  FIELD_M50 = 'FIELD_M50',
  HANDSET = 'HANDSET',
  OTHER = 'OTHER',
  SPIRAL = 'SPIRAL',
  STRUCTURE = 'STRUCTURE',
  WALL_CUBE = 'WALL_CUBE',
  WALL_OCTO = 'WALL_OCTO',
  WALL_S = 'WALL_S',
  WALL_SPEED = 'WALL_SPEED',
  WALL_T = 'WALL_T',
  WALL_X = 'WALL_X'
}

export type Query = {
  event: Maybe<Event>;
  events: Array<Event>;
  /** Fetches a project based on its slug */
  project: Maybe<Project>;
  /** Get session by its token */
  session: Maybe<Session>;
  /** Get a single stonelist record */
  stoneList: Maybe<StoneList>;
  /** Find all users of this team that have a nonzero stonelist in this team */
  stoneListUsers: Array<User>;
  /** Get all stonetypes of a team */
  stoneTypes: Array<StoneType>;
  /** Get all stones of a team */
  stones: Array<Stone>;
  /** Fetch the teams that the user is a member of */
  teams: Array<Team>;
  /** Find user by its slug */
  user: Maybe<User>;
  /** Get stonelist of a user in a team */
  userStoneList: Array<StoneList>;
  /** Find all users of this team */
  users: Array<User>;
};


export type QueryeventArgs = {
  eventSlug: Scalars['String'];
};


export type QueryprojectArgs = {
  eventSlug: Scalars['String'];
  projectSlug: Scalars['String'];
};


export type QuerysessionArgs = {
  token: Scalars['String'];
};


export type QuerystoneListArgs = {
  stoneId: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryuserArgs = {
  userSlug: Scalars['String'];
};


export type QueryuserStoneListArgs = {
  userSlug: Scalars['String'];
};

export enum Role {
  BUILDER = 'BUILDER',
  CAPTAIN = 'CAPTAIN',
  GUEST = 'GUEST'
}

export type Session = {
  createdAt: Scalars['DateTime'];
  expiresAt: Maybe<Scalars['DateTime']>;
  id: Scalars['ID'];
  member: Maybe<Member>;
  team: Maybe<Team>;
  teamId: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type Stat = {
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  projects: Array<StatsOnProject>;
  team: Team;
  teamId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type StatsOnProject = {
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  project: Project;
  projectId: Scalars['String'];
  stat: Stat;
  statId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  value: Scalars['String'];
};

export type Stone = {
  alias: Scalars['String'];
  alias2: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description: Maybe<Scalars['String']>;
  hex: Scalars['String'];
  hex2: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  order: Scalars['Int'];
  projects: Array<StonesOnProject>;
  stoneLists: Array<StoneList>;
  stoneType: StoneType;
  stoneTypeId: Scalars['String'];
  subthemes: Array<StonesOnSubtheme>;
  updatedAt: Scalars['DateTime'];
};

export type StoneList = {
  amount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  stone: Stone;
  stoneId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type StoneType = {
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  order: Scalars['Int'];
  stones: Array<Stone>;
  team: Team;
  teamId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type StonesOnProject = {
  amount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  project: Project;
  projectId: Scalars['String'];
  stone: Stone;
  stoneId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type StonesOnSubtheme = {
  amount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  stone: Stone;
  stoneId: Scalars['String'];
  subtheme: Subtheme;
  subthemeId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type Subtheme = {
  attributes: Array<AttributesOnSubtheme>;
  color: Scalars['String'];
  createdAt: Scalars['DateTime'];
  event: Event;
  eventId: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  order: Scalars['Int'];
  projects: Array<Project>;
  slug: Scalars['String'];
  stones: Array<StonesOnSubtheme>;
  updatedAt: Scalars['DateTime'];
};

export type Team = {
  attributes: Array<Attribute>;
  createdAt: Scalars['DateTime'];
  events: Array<Event>;
  id: Scalars['ID'];
  members: Array<Member>;
  name: Scalars['String'];
  sessions: Array<Session>;
  stats: Array<Stat>;
  stoneTypes: Array<StoneType>;
  updatedAt: Scalars['DateTime'];
};

export type User = {
  attributeLists: Array<AttributeList>;
  attributesOnProjects: Array<AttributesOnProject>;
  attributesOnSubthemes: Array<AttributesOnSubtheme>;
  avatar: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ID'];
  isAdmin: Scalars['Boolean'];
  lastName: Scalars['String'];
  /** The projects that this user supervises */
  projects: Array<Project>;
  sessions: Array<Session>;
  slug: Scalars['String'];
  stoneLists: Array<StoneList>;
  stonesOnProjects: Array<StonesOnProject>;
  stonesOnSubthemes: Array<StonesOnSubtheme>;
  /** The teams this user is a member of */
  teams: Array<Member>;
  updatedAt: Scalars['DateTime'];
};

export type getUIQueryVariables = Exact<{ [key: string]: never; }>;


export type getUIQuery = { events: Array<{ id: string, name: string, slug: string }>, stoneListUsers: Array<{ id: string, firstName: string, lastName: string, slug: string }> };

export type getEventsQueryVariables = Exact<{ [key: string]: never; }>;


export type getEventsQuery = { events: Array<{ id: string, name: string, slug: string }> };

export type getProjectQueryVariables = Exact<{
  projectSlug: Scalars['String'];
  eventSlug: Scalars['String'];
}>;


export type getProjectQuery = { project: { id: string, name: string, description: string, status: ProjectStatus, number: number, subNumber: number, type: ProjectType, supervisor: { id: string, displayName: string } | null, stones: Array<{ id: string, amount: number, user: { id: string, displayName: string }, stone: { id: string, name: string } }>, stats: Array<{ id: string, value: string, stat: { id: string, name: string } }>, attributes: Array<{ id: string, amount: number, attribute: { id: string, name: string }, user: { id: string, displayName: string } }>, subtheme: { id: string, name: string, event: { id: string, name: string } } } | null };

export type loginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  isPermanent: Scalars['Boolean'];
}>;


export type loginMutation = { login: string };

export type setSessionTeamMutationVariables = Exact<{
  teamId: Scalars['String'];
}>;


export type setSessionTeamMutation = { setSessionTeam: { id: string } };

export type logoutMutationVariables = Exact<{ [key: string]: never; }>;


export type logoutMutation = { logout: { id: string } };

export type getSessionQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type getSessionQuery = { session: { id: string, expiresAt: any | null, team: { id: string, name: string } | null, user: { id: string, displayName: string, firstName: string, lastName: string, avatar: string | null, isAdmin: boolean }, member: { id: string, role: Role } | null } | null };

export type getStonesQueryVariables = Exact<{ [key: string]: never; }>;


export type getStonesQuery = { stones: Array<{ id: string, name: string, alias: string, alias2: string | null }> };

export type updateStoneListMutationVariables = Exact<{
  stoneId: Scalars['String'];
  userId: Scalars['String'];
  amount: Scalars['Int'];
}>;


export type updateStoneListMutation = { updateStoneList: { id: string, amount: number, user: { id: string, firstName: string, lastName: string }, stone: { id: string, name: string } } | null };

export type stoneListStoneFragment = { id: string, name: string, alias: string, alias2: string | null, hex: string, hex2: string | null, order: number, stoneTypeId: string };

export type getStoneListQueryVariables = Exact<{
  userId: Scalars['String'];
  stoneId: Scalars['String'];
}>;


export type getStoneListQuery = { stoneList: { id: string, amount: number } | null };

export type getUserStoneListQueryVariables = Exact<{
  userSlug: Scalars['String'];
}>;


export type getUserStoneListQuery = { userStoneList: Array<{ id: string, amount: number, stone: { id: string, name: string, alias: string, alias2: string | null, hex: string, hex2: string | null, order: number, stoneTypeId: string } }>, user: { id: string, firstName: string, lastName: string } | null, stoneTypes: Array<{ id: string, name: string }> };

export type getStoneListsQueryVariables = Exact<{ [key: string]: never; }>;


export type getStoneListsQuery = { stones: Array<{ id: string, name: string, alias: string, alias2: string | null, hex: string, hex2: string | null, order: number, stoneTypeId: string, stoneLists: Array<{ id: string, amount: number, userId: string }> }>, stoneTypes: Array<{ id: string, name: string }>, stoneListUsers: Array<{ id: string, displayName: string }> };

export type getTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type getTeamsQuery = { teams: Array<{ id: string, name: string }> };

export type getStoneListUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type getStoneListUsersQuery = { stoneListUsers: Array<{ id: string, firstName: string, lastName: string, slug: string }> };

export type getUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type getUsersQuery = { users: Array<{ id: string, firstName: string, lastName: string }> };

export const stoneListStoneFragmentDoc = gql`
    fragment stoneListStone on Stone {
  id
  name
  alias
  alias2
  hex
  hex2
  order
  stoneTypeId
}
    `;
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
export const getEventsDocument = gql`
    query getEvents {
  events {
    id
    name
    slug
  }
}
    `;
export const getProjectDocument = gql`
    query getProject($projectSlug: String!, $eventSlug: String!) {
  project(projectSlug: $projectSlug, eventSlug: $eventSlug) {
    id
    name
    description
    status
    number
    subNumber
    type
    supervisor {
      id
      displayName
    }
    stones {
      id
      amount
      user {
        id
        displayName
      }
      stone {
        id
        name
      }
    }
    stats {
      id
      value
      stat {
        id
        name
      }
    }
    attributes {
      id
      amount
      attribute {
        id
        name
      }
      user {
        id
        displayName
      }
    }
    subtheme {
      id
      name
      event {
        id
        name
      }
    }
  }
}
    `;
export const loginDocument = gql`
    mutation login($email: String!, $password: String!, $isPermanent: Boolean!) {
  login(email: $email, password: $password, isPermanent: $isPermanent)
}
    `;
export const setSessionTeamDocument = gql`
    mutation setSessionTeam($teamId: String!) {
  setSessionTeam(teamId: $teamId) {
    id
  }
}
    `;
export const logoutDocument = gql`
    mutation logout {
  logout {
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
export const getStonesDocument = gql`
    query getStones {
  stones {
    id
    name
    alias
    alias2
  }
}
    `;
export const updateStoneListDocument = gql`
    mutation updateStoneList($stoneId: String!, $userId: String!, $amount: Int!) {
  updateStoneList(stoneId: $stoneId, userId: $userId, amount: $amount) {
    id
    user {
      id
      firstName
      lastName
    }
    stone {
      id
      name
    }
    amount
  }
}
    `;
export const getStoneListDocument = gql`
    query getStoneList($userId: String!, $stoneId: String!) {
  stoneList(userId: $userId, stoneId: $stoneId) {
    id
    amount
  }
}
    `;
export const getUserStoneListDocument = gql`
    query getUserStoneList($userSlug: String!) {
  userStoneList(userSlug: $userSlug) {
    id
    amount
    stone {
      ...stoneListStone
    }
  }
  user(userSlug: $userSlug) {
    id
    firstName
    lastName
  }
  stoneTypes {
    id
    name
  }
}
    ${stoneListStoneFragmentDoc}`;
export const getStoneListsDocument = gql`
    query getStoneLists {
  stones {
    ...stoneListStone
    stoneLists {
      id
      amount
      userId
    }
  }
  stoneTypes {
    id
    name
  }
  stoneListUsers {
    id
    displayName
  }
}
    ${stoneListStoneFragmentDoc}`;
export const getTeamsDocument = gql`
    query getTeams {
  teams {
    id
    name
  }
}
    `;
export const getStoneListUsersDocument = gql`
    query getStoneListUsers {
  stoneListUsers {
    id
    firstName
    lastName
    slug
  }
}
    `;
export const getUsersDocument = gql`
    query getUsers {
  users {
    id
    firstName
    lastName
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
    getEvents(variables?: getEventsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<getEventsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<getEventsQuery>(getEventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getEvents');
    },
    getProject(variables: getProjectQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<getProjectQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<getProjectQuery>(getProjectDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getProject');
    },
    login(variables: loginMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<loginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<loginMutation>(loginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'login');
    },
    setSessionTeam(variables: setSessionTeamMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<setSessionTeamMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<setSessionTeamMutation>(setSessionTeamDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'setSessionTeam');
    },
    logout(variables?: logoutMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<logoutMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<logoutMutation>(logoutDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'logout');
    },
    getSession(variables: getSessionQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<getSessionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<getSessionQuery>(getSessionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getSession');
    },
    getStones(variables?: getStonesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<getStonesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<getStonesQuery>(getStonesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getStones');
    },
    updateStoneList(variables: updateStoneListMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<updateStoneListMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<updateStoneListMutation>(updateStoneListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateStoneList');
    },
    getStoneList(variables: getStoneListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<getStoneListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<getStoneListQuery>(getStoneListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getStoneList');
    },
    getUserStoneList(variables: getUserStoneListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<getUserStoneListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<getUserStoneListQuery>(getUserStoneListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUserStoneList');
    },
    getStoneLists(variables?: getStoneListsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<getStoneListsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<getStoneListsQuery>(getStoneListsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getStoneLists');
    },
    getTeams(variables?: getTeamsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<getTeamsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<getTeamsQuery>(getTeamsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getTeams');
    },
    getStoneListUsers(variables?: getStoneListUsersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<getStoneListUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<getStoneListUsersQuery>(getStoneListUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getStoneListUsers');
    },
    getUsers(variables?: getUsersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<getUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<getUsersQuery>(getUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getUsers');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export function getSdkWithHooks(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  const sdk = getSdk(client, withWrapper);
  return {
    ...sdk,
    useGetUi(key: SWRKeyInterface, variables?: getUIQueryVariables, config?: SWRConfigInterface<getUIQuery, ClientError>) {
      return useSWR<getUIQuery, ClientError>(key, () => sdk.getUI(variables), config);
    },
    useGetEvents(key: SWRKeyInterface, variables?: getEventsQueryVariables, config?: SWRConfigInterface<getEventsQuery, ClientError>) {
      return useSWR<getEventsQuery, ClientError>(key, () => sdk.getEvents(variables), config);
    },
    useGetProject(key: SWRKeyInterface, variables: getProjectQueryVariables, config?: SWRConfigInterface<getProjectQuery, ClientError>) {
      return useSWR<getProjectQuery, ClientError>(key, () => sdk.getProject(variables), config);
    },
    useGetSession(key: SWRKeyInterface, variables: getSessionQueryVariables, config?: SWRConfigInterface<getSessionQuery, ClientError>) {
      return useSWR<getSessionQuery, ClientError>(key, () => sdk.getSession(variables), config);
    },
    useGetStones(key: SWRKeyInterface, variables?: getStonesQueryVariables, config?: SWRConfigInterface<getStonesQuery, ClientError>) {
      return useSWR<getStonesQuery, ClientError>(key, () => sdk.getStones(variables), config);
    },
    useGetStoneList(key: SWRKeyInterface, variables: getStoneListQueryVariables, config?: SWRConfigInterface<getStoneListQuery, ClientError>) {
      return useSWR<getStoneListQuery, ClientError>(key, () => sdk.getStoneList(variables), config);
    },
    useGetUserStoneList(key: SWRKeyInterface, variables: getUserStoneListQueryVariables, config?: SWRConfigInterface<getUserStoneListQuery, ClientError>) {
      return useSWR<getUserStoneListQuery, ClientError>(key, () => sdk.getUserStoneList(variables), config);
    },
    useGetStoneLists(key: SWRKeyInterface, variables?: getStoneListsQueryVariables, config?: SWRConfigInterface<getStoneListsQuery, ClientError>) {
      return useSWR<getStoneListsQuery, ClientError>(key, () => sdk.getStoneLists(variables), config);
    },
    useGetTeams(key: SWRKeyInterface, variables?: getTeamsQueryVariables, config?: SWRConfigInterface<getTeamsQuery, ClientError>) {
      return useSWR<getTeamsQuery, ClientError>(key, () => sdk.getTeams(variables), config);
    },
    useGetStoneListUsers(key: SWRKeyInterface, variables?: getStoneListUsersQueryVariables, config?: SWRConfigInterface<getStoneListUsersQuery, ClientError>) {
      return useSWR<getStoneListUsersQuery, ClientError>(key, () => sdk.getStoneListUsers(variables), config);
    },
    useGetUsers(key: SWRKeyInterface, variables?: getUsersQueryVariables, config?: SWRConfigInterface<getUsersQuery, ClientError>) {
      return useSWR<getUsersQuery, ClientError>(key, () => sdk.getUsers(variables), config);
    }
  };
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>;