import { nexusModel } from '@lib/nexusModel';
import { enumType } from 'nexus';
import { Member, Role } from 'nexus-prisma';

export const RoleModel = enumType(Role);
export const MemberModel = nexusModel(Member);
