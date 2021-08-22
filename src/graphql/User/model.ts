import { nexusModel } from '@lib/nexusModel';
import { User } from 'nexus-prisma';

export const UserModel = nexusModel(User, { hideFields: ['password'] });
