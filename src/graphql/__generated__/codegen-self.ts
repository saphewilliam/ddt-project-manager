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
  img: Scalars['String'];
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

export type UIQueryVariables = Exact<{ [key: string]: never; }>;


export type UIQuery = { events: Array<{ id: string, name: string, slug: string }>, stoneListUsers: Array<{ id: string, firstName: string, lastName: string, slug: string }> };

export type EventsQueryVariables = Exact<{ [key: string]: never; }>;


export type EventsQuery = { events: Array<{ id: string, name: string, slug: string, date: any, img: string }> };

export type ProjectQueryVariables = Exact<{
  projectSlug: Scalars['String'];
  eventSlug: Scalars['String'];
}>;


export type ProjectQuery = { project: { id: string, name: string, description: string, status: ProjectStatus, number: number, subNumber: number, type: ProjectType, supervisor: { id: string, displayName: string } | null | undefined, stones: Array<{ id: string, amount: number, user: { id: string, displayName: string }, stone: { id: string, name: string } }>, stats: Array<{ id: string, value: string, stat: { id: string, name: string } }>, attributes: Array<{ id: string, amount: number, attribute: { id: string, name: string }, user: { id: string, displayName: string } }>, subtheme: { id: string, name: string, event: { id: string, name: string } } } | null | undefined };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  isPermanent: Scalars['Boolean'];
}>;


export type LoginMutation = { login: string };

export type SetSessionTeamMutationVariables = Exact<{
  teamId: Scalars['String'];
}>;


export type SetSessionTeamMutation = { setSessionTeam: { id: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { logout: { id: string } };

export type SessionQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type SessionQuery = { session: { id: string, expiresAt: any | null | undefined, team: { id: string, name: string } | null | undefined, user: { id: string, displayName: string, firstName: string, lastName: string, avatar: string | null | undefined, isAdmin: boolean }, member: { id: string, role: Role } | null | undefined } | null | undefined };

export type StonesQueryVariables = Exact<{ [key: string]: never; }>;


export type StonesQuery = { stones: Array<{ id: string, name: string, alias: string, alias2: string | null | undefined }> };

export type UpdateStoneListMutationVariables = Exact<{
  stoneId: Scalars['String'];
  userId: Scalars['String'];
  amount: Scalars['Int'];
}>;


export type UpdateStoneListMutation = { updateStoneList: { id: string, amount: number, user: { id: string, firstName: string, lastName: string }, stone: { id: string, name: string } } | null | undefined };

export type StoneListStoneFragment = { name: string, alias: string, alias2: string | null | undefined, hex: string, hex2: string | null | undefined, order: number, stoneTypeId: string };

export type StoneListQueryVariables = Exact<{
  userId: Scalars['String'];
  stoneId: Scalars['String'];
}>;


export type StoneListQuery = { stoneList: { id: string, amount: number } | null | undefined };

export type UserStoneListQueryVariables = Exact<{
  userSlug: Scalars['String'];
}>;


export type UserStoneListQuery = { userStoneList: Array<{ id: string, amount: number, stone: { id: string, name: string, alias: string, alias2: string | null | undefined, hex: string, hex2: string | null | undefined, order: number, stoneTypeId: string } }>, user: { id: string, firstName: string, lastName: string } | null | undefined, stoneTypes: Array<{ id: string, name: string }> };

export type StoneListsQueryVariables = Exact<{ [key: string]: never; }>;


export type StoneListsQuery = { stones: Array<{ id: string, name: string, alias: string, alias2: string | null | undefined, hex: string, hex2: string | null | undefined, order: number, stoneTypeId: string, stoneLists: Array<{ id: string, amount: number, userId: string }> }>, stoneTypes: Array<{ id: string, name: string }>, stoneListUsers: Array<{ id: string, displayName: string }> };

export type TeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type TeamsQuery = { teams: Array<{ id: string, name: string }> };

export type StoneListUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type StoneListUsersQuery = { stoneListUsers: Array<{ id: string, firstName: string, lastName: string, slug: string }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { users: Array<{ id: string, firstName: string, lastName: string }> };

export const StoneListStoneFragmentDoc = gql`
    fragment StoneListStone on Stone {
  name
  alias
  alias2
  hex
  hex2
  order
  stoneTypeId
}
    `;
export const UIDocument = gql`
    query UI {
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
export const EventsDocument = gql`
    query Events {
  events {
    id
    name
    slug
    date
    img
  }
}
    `;
export const ProjectDocument = gql`
    query Project($projectSlug: String!, $eventSlug: String!) {
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
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!, $isPermanent: Boolean!) {
  login(email: $email, password: $password, isPermanent: $isPermanent)
}
    `;
export const SetSessionTeamDocument = gql`
    mutation SetSessionTeam($teamId: String!) {
  setSessionTeam(teamId: $teamId) {
    id
  }
}
    `;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    id
  }
}
    `;
export const SessionDocument = gql`
    query Session($token: String!) {
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
export const StonesDocument = gql`
    query Stones {
  stones {
    id
    name
    alias
    alias2
  }
}
    `;
export const UpdateStoneListDocument = gql`
    mutation UpdateStoneList($stoneId: String!, $userId: String!, $amount: Int!) {
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
export const StoneListDocument = gql`
    query StoneList($userId: String!, $stoneId: String!) {
  stoneList(userId: $userId, stoneId: $stoneId) {
    id
    amount
  }
}
    `;
export const UserStoneListDocument = gql`
    query UserStoneList($userSlug: String!) {
  userStoneList(userSlug: $userSlug) {
    id
    amount
    stone {
      id
      ...StoneListStone
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
    ${StoneListStoneFragmentDoc}`;
export const StoneListsDocument = gql`
    query StoneLists {
  stones {
    id
    ...StoneListStone
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
    ${StoneListStoneFragmentDoc}`;
export const TeamsDocument = gql`
    query Teams {
  teams {
    id
    name
  }
}
    `;
export const StoneListUsersDocument = gql`
    query StoneListUsers {
  stoneListUsers {
    id
    firstName
    lastName
    slug
  }
}
    `;
export const UsersDocument = gql`
    query Users {
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
    UI(variables?: UIQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UIQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UIQuery>(UIDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UI');
    },
    Events(variables?: EventsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<EventsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<EventsQuery>(EventsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Events');
    },
    Project(variables: ProjectQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ProjectQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProjectQuery>(ProjectDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Project');
    },
    Login(variables: LoginMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LoginMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LoginMutation>(LoginDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Login');
    },
    SetSessionTeam(variables: SetSessionTeamMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SetSessionTeamMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<SetSessionTeamMutation>(SetSessionTeamDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'SetSessionTeam');
    },
    Logout(variables?: LogoutMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<LogoutMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<LogoutMutation>(LogoutDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Logout');
    },
    Session(variables: SessionQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SessionQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<SessionQuery>(SessionDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Session');
    },
    Stones(variables?: StonesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<StonesQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<StonesQuery>(StonesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Stones');
    },
    UpdateStoneList(variables: UpdateStoneListMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UpdateStoneListMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateStoneListMutation>(UpdateStoneListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateStoneList');
    },
    StoneList(variables: StoneListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<StoneListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<StoneListQuery>(StoneListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'StoneList');
    },
    UserStoneList(variables: UserStoneListQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UserStoneListQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UserStoneListQuery>(UserStoneListDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UserStoneList');
    },
    StoneLists(variables?: StoneListsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<StoneListsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<StoneListsQuery>(StoneListsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'StoneLists');
    },
    Teams(variables?: TeamsQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<TeamsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<TeamsQuery>(TeamsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Teams');
    },
    StoneListUsers(variables?: StoneListUsersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<StoneListUsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<StoneListUsersQuery>(StoneListUsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'StoneListUsers');
    },
    Users(variables?: UsersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UsersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<UsersQuery>(UsersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Users');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export function getSdkWithHooks(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  const sdk = getSdk(client, withWrapper);
  return {
    ...sdk,
    useUi(key: SWRKeyInterface, variables?: UIQueryVariables, config?: SWRConfigInterface<UIQuery, ClientError>) {
      return useSWR<UIQuery, ClientError>(key, () => sdk.UI(variables), config);
    },
    useEvents(key: SWRKeyInterface, variables?: EventsQueryVariables, config?: SWRConfigInterface<EventsQuery, ClientError>) {
      return useSWR<EventsQuery, ClientError>(key, () => sdk.Events(variables), config);
    },
    useProject(key: SWRKeyInterface, variables: ProjectQueryVariables, config?: SWRConfigInterface<ProjectQuery, ClientError>) {
      return useSWR<ProjectQuery, ClientError>(key, () => sdk.Project(variables), config);
    },
    useSession(key: SWRKeyInterface, variables: SessionQueryVariables, config?: SWRConfigInterface<SessionQuery, ClientError>) {
      return useSWR<SessionQuery, ClientError>(key, () => sdk.Session(variables), config);
    },
    useStones(key: SWRKeyInterface, variables?: StonesQueryVariables, config?: SWRConfigInterface<StonesQuery, ClientError>) {
      return useSWR<StonesQuery, ClientError>(key, () => sdk.Stones(variables), config);
    },
    useStoneList(key: SWRKeyInterface, variables: StoneListQueryVariables, config?: SWRConfigInterface<StoneListQuery, ClientError>) {
      return useSWR<StoneListQuery, ClientError>(key, () => sdk.StoneList(variables), config);
    },
    useUserStoneList(key: SWRKeyInterface, variables: UserStoneListQueryVariables, config?: SWRConfigInterface<UserStoneListQuery, ClientError>) {
      return useSWR<UserStoneListQuery, ClientError>(key, () => sdk.UserStoneList(variables), config);
    },
    useStoneLists(key: SWRKeyInterface, variables?: StoneListsQueryVariables, config?: SWRConfigInterface<StoneListsQuery, ClientError>) {
      return useSWR<StoneListsQuery, ClientError>(key, () => sdk.StoneLists(variables), config);
    },
    useTeams(key: SWRKeyInterface, variables?: TeamsQueryVariables, config?: SWRConfigInterface<TeamsQuery, ClientError>) {
      return useSWR<TeamsQuery, ClientError>(key, () => sdk.Teams(variables), config);
    },
    useStoneListUsers(key: SWRKeyInterface, variables?: StoneListUsersQueryVariables, config?: SWRConfigInterface<StoneListUsersQuery, ClientError>) {
      return useSWR<StoneListUsersQuery, ClientError>(key, () => sdk.StoneListUsers(variables), config);
    },
    useUsers(key: SWRKeyInterface, variables?: UsersQueryVariables, config?: SWRConfigInterface<UsersQuery, ClientError>) {
      return useSWR<UsersQuery, ClientError>(key, () => sdk.Users(variables), config);
    }
  };
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>;