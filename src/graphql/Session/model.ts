import * as TypeGraphQL from 'type-graphql';
import {
  FindUniqueSessionResolver,
  Session,
  ModelConfig,
  ResolverActionsConfig,
  RelationResolverActionsConfig,
  SessionRelationsResolver,
  Member,
} from '@graphql/__generated__/type-graphql-transpiled';
import { loginUser, logoutUser, setSessionTeam } from '@lib/authHelpers';
import type { Context } from '@graphql/context';

@TypeGraphQL.ObjectType('TokenPayload')
class TokenPayload {
  @TypeGraphQL.Field((_type) => String)
  access!: string;

  @TypeGraphQL.Field((_type) => Date, { nullable: true })
  accessExpiresAt?: Date | null;
}

@TypeGraphQL.Resolver((_of) => Session)
class SessionResolver {
  @TypeGraphQL.FieldResolver((_type) => Member, { nullable: true })
  async member(
    @TypeGraphQL.Root() session: Session,
    @TypeGraphQL.Ctx() ctx: Context,
  ): Promise<Member | null> {
    return await ctx.prisma.member.findUnique({
      where: { userId_teamId: { teamId: session.teamId ?? '', userId: session.userId } },
    });
  }

  @TypeGraphQL.Mutation((_returns) => TokenPayload, {
    // TODO
    complexity: 10,
    description: 'Create a new session for a user with an active account',
  })
  async login(
    @TypeGraphQL.Ctx() ctx: Context,
    @TypeGraphQL.Arg('email') email: string,
    @TypeGraphQL.Arg('password') password: string,
    @TypeGraphQL.Arg('isPermanent') isPermanent: boolean,
  ): Promise<TokenPayload> {
    return await loginUser(email, password, isPermanent, ctx.prisma);
  }

  @TypeGraphQL.Mutation((_retunrs) => Session, {
    // TODO
    complexity: 10,
    description: 'Set the `team` field of the active session',
  })
  async setSessionTeam(
    @TypeGraphQL.Ctx() ctx: Context,
    @TypeGraphQL.Arg('teamId') teamId: string,
  ): Promise<Session> {
    return await setSessionTeam(ctx.session?.token ?? '', teamId, ctx.prisma);
  }

  @TypeGraphQL.Mutation((_returns) => Session, {
    // TODO
    complexity: 10,
    description: 'Invalidate the active session',
  })
  async logout(@TypeGraphQL.Ctx() ctx: Context): Promise<Session> {
    return await logoutUser(ctx.session?.token ?? '', ctx.prisma);
  }
}

export const resolvers = [
  SessionRelationsResolver,
  SessionResolver,
  FindUniqueSessionResolver,
] as const;

export const modelConfig: ModelConfig<'Session'> = {};

export const relationsConfig: RelationResolverActionsConfig<'Session'> = {};

export const actionsConfig: ResolverActionsConfig<'Session'> = {};
