import { inputObjectType } from 'nexus';
import { ProjectPart } from 'nexus-prisma';
import { nexusModel } from '@lib/nexusHelpers';

export const projectPartModel = nexusModel(ProjectPart);

// export const projectPartUpdateInput = inputObjectType({
//   name: 'ProjectPartUpdateInput',
//   definition(t) {
//     t.list.field({
//       name: 'attributes',
//       type: 'AttributesOnProjectPartUpdateWithoutProjectPartInput',
//     });
//     t.list.field({
//       name: 'stones',
//       type: 'StonesOnProjectPartUpdateWithoutProjectPartInput',
//     });
//   },
// });

export const projectPartUpdateWithoutProjectInput = inputObjectType({
  name: 'ProjectPartUpdateWithoutProjectInput',
  definition(t) {
    t.id('id');
    t.string('name');
    t.nullable.string('description');
    t.int('number');
    t.field('type', { type: 'ProjectType' });
  },
});

// export const projectPartMutation = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.field('updateProjectPart', {
//       type: 'ProjectPart',
//       args: {
//         id: stringArg(),
//         data: arg({ type: 'ProjectPartUpdateInput' }),
//       },
//       authorize: async (_, args, ctx) => {
//         const sessionValidation = await isValidSession(ctx.session);
//         if (sessionValidation !== true) return sessionValidation;

//         const projectPart = await ctx.prisma.projectPart.findUnique({
//           where: { id: args.id },
//           include: {
//             project: {
//               include: { subtheme: { include: { event: { select: { teamId: true } } } } },
//             },
//           },
//         });

//         if (!projectPart) return Error('Invalid project part id');
//         if (projectPart.project.subtheme.event.teamId !== ctx.session?.teamId)
//           return Error('Stone is not part of logged in team');
//         if (
//           !(
//             ctx.member?.role === Role.CAPTAIN &&
//             projectPart.project.subtheme.event.teamId === ctx.session.teamId
//           ) &&
//           !ctx.session.user.isAdmin
//         )
//           return Error('User does not have permission to perform this action');

//         return true;
//       },
//       resolve: (_, args, ctx) =>
//         ctx.prisma.projectPart.update({
//           where: { id: args.id },
//           data: {
//             attributes: {},
//             stones: {}
//           },
//         }),
//     });
//   },
// });
