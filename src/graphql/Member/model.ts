import { nexusModel } from '@lib/nexusHelpers';
import { enumType } from 'nexus';
import { Member, Role } from 'nexus-prisma';

export const roleEnum = enumType(Role);
export const memberModel = nexusModel(Member);
