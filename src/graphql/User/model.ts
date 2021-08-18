import { nexusModel } from '@lib/nexusHelpers';
import { User } from 'nexus-prisma';

export const UserModel = nexusModel(User, ['password']);
export * from './query';
