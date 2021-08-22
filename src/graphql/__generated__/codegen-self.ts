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

export type Query = {
  /** Fetch the teams that the user is a member of */
  teams: Array<Team>;
  /** Get session by its token */
  session: Maybe<Session>;
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

export type Team = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  acronym: Maybe<Scalars['String']>;
  members: Array<Member>;
  sessions: Array<Session>;
};

export type User = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  displayName: Scalars['String'];
  avatar: Maybe<Scalars['String']>;
  email: Scalars['String'];
  isAdmin: Scalars['Boolean'];
  sessions: Array<Session>;
  teams: Array<Member>;
};

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


export type getSessionQuery = { session: Maybe<{ id: string, expiresAt: Maybe<any>, team: Maybe<{ id: string, name: string, acronym: Maybe<string> }>, user: { id: string, displayName: string, firstName: string, lastName: string, avatar: Maybe<string> }, member: Maybe<{ id: string, role: Role }> }> };

export type getTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type getTeamsQuery = { teams: Array<{ id: string, name: string, acronym: Maybe<string> }> };


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
      acronym
    }
    user {
      id
      displayName
      firstName
      lastName
      avatar
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
    acronym
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
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
  return {
    ...sdk,
    useGetSession(key: SWRKeyInterface, variables: getSessionQueryVariables, config?: SWRConfigInterface<getSessionQuery, ClientError>) {
      return useSWR<getSessionQuery, ClientError>(key, () => sdk.getSession(variables), config);
    },
    useGetTeams(key: SWRKeyInterface, variables?: getTeamsQueryVariables, config?: SWRConfigInterface<getTeamsQuery, ClientError>) {
      return useSWR<getTeamsQuery, ClientError>(key, () => sdk.getTeams(variables), config);
    }
  };
}
export type SdkWithHooks = ReturnType<typeof getSdkWithHooks>;