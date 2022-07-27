import { GraphQLResolveInfo } from 'graphql';
import * as TypeGraphQL from 'type-graphql';
import { Extensions } from 'type-graphql';
import {
  ModelConfig,
  ResolverActionsConfig,
  RelationResolverActionsConfig,
  UserRelationsResolver,
  User,
  // FindUniqueUserArgs,
  FindManyUserArgs,
  CreateUserResolver,
} from '@graphql/__generated__/type-graphql-transpiled';
import { Context } from '@graphql/context';
import { Auth } from '@lib/authHelpers';
import { count } from '@lib/graphqlHelpers';

// t.list.field('inventoryUsers', {
//   type: 'User',
//   description: 'Find all users of this team that have a nonzero inventory in this team',
//   authorize: authorizeSession,
//   resolve: (_, __, ctx) =>
//     ctx.prisma.user.findMany({
//       where: {
//         teams: { some: { teamId: ctx.session?.teamId ?? '' } },
//         OR: [
//           {
//             stoneInventory: {
//               some: { stone: { stoneType: { teamId: ctx.session?.teamId ?? '' } } },
//             },
//           },
//           {
//             attributeInventory: {
//               some: { attribute: { teamId: ctx.session?.teamId ?? '' } },
//             },
//           },
//         ],
//       },
//       orderBy: [{ firstName: 'asc' }, { lastName: 'asc' }],
//     }),
// });

@TypeGraphQL.Resolver((_of) => User)
export class UserResolver {
  // TODO stoneAmount field resolver

  // @TypeGraphQL.Query((_returns) => User, {
  //   nullable: true,
  // })
  // async user(
  //   @TypeGraphQL.Ctx() ctx: Context,
  //   @TypeGraphQL.Info() info: GraphQLResolveInfo,
  //   @TypeGraphQL.Args() args: FindUniqueUserArgs,
  // ): Promise<User | null> {
  //   return ctx.prisma.user.findUnique({ ...args, ...count(info) });
  // }

  // TODO complexity of list queries
  @TypeGraphQL.Query((_returns) => [User], { complexity: 10 })
  @Auth()
  async users(
    @TypeGraphQL.Ctx() ctx: Context,
    @TypeGraphQL.Info() info: GraphQLResolveInfo,
    @TypeGraphQL.Args() args: FindManyUserArgs,
  ): Promise<User[]> {
    return ctx.prisma.user.findMany({
      ...args,
      ...count(info),
      where: { ...args.where, teams: { some: { teamId: ctx.session?.teamId ?? '' } } },
    });
  }
}

export const resolvers = [UserRelationsResolver, UserResolver, CreateUserResolver] as const;

export const modelConfig: ModelConfig<'User'> = {};

export const relationsConfig: RelationResolverActionsConfig<'User'> = {};

export const actionsConfig: ResolverActionsConfig<'User'> = {
  // TODO Complexity extension
  createUser: [Auth('ADMIN'), Extensions({})],
};
