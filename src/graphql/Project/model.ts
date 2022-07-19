import * as TypeGraphQL from 'type-graphql';
import {
  ModelConfig,
  ResolverActionsConfig,
  RelationResolverActionsConfig,
  ProjectRelationsResolver,
  Project,
  FindUniqueProjectArgs,
  UpdateProjectArgs,
  CreateProjectArgs,
} from '@graphql/__generated__/type-graphql-transpiled';
import { Auth } from '@lib/authHelpers';
import { complexity, count } from '@lib/graphqlHelpers';
import type { Context } from '@graphql/context';
import type { GraphQLResolveInfo } from 'graphql';

@TypeGraphQL.Resolver((_of) => Project)
export class ProjectResolver {
  @TypeGraphQL.Query((_returns) => Project, { complexity: complexity.OBJECT, nullable: true })
  @Auth()
  async project(
    @TypeGraphQL.Ctx() ctx: Context,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindUniqueProjectArgs,
  ): Promise<Project | null> {
    const checkProject = await ctx.prisma.project.findUnique({
      where: { ...args.where },
      include: { subtheme: { select: { event: { select: { teamId: true } } } } },
    });
    return checkProject?.subtheme.event.teamId === ctx.session?.teamId
      ? await ctx.prisma.project.findUnique({ ...args, ...count(info) })
      : null;
  }

  @TypeGraphQL.Mutation((_returns) => Project, { complexity: complexity.MUTATION })
  @Auth('CAPTAIN')
  async createProject(
    @TypeGraphQL.Ctx() ctx: Context,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: CreateProjectArgs,
  ): Promise<Project> {
    // TODO check if event is part of team
    return ctx.prisma.project.create({ ...args, ...count(info), data: { ...args.data } });
  }

  @TypeGraphQL.Mutation((_returns) => Project, { complexity: complexity.MUTATION, nullable: true })
  @Auth('CAPTAIN')
  async updateProject(
    @TypeGraphQL.Ctx() ctx: Context,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: UpdateProjectArgs,
  ): Promise<Project | null> {
    // TODO check if event is part of team
    return ctx.prisma.project.update({ ...args, ...count(info) });
  }
}

export const resolvers = [ProjectResolver, ProjectRelationsResolver] as const;

export const modelConfig: ModelConfig<'Project'> = {};

export const relationsConfig: RelationResolverActionsConfig<'Project'> = {};

export const actionsConfig: ResolverActionsConfig<'Project'> = {};
