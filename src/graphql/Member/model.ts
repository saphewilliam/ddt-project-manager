import { enumType } from 'nexus';
import { Member, Role } from 'nexus-prisma';
import { nexusModel } from '@lib/nexusHelpers';

export const roleEnum = enumType(Role);
export const memberModel = nexusModel(Member);
