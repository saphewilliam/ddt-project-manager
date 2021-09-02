import { User } from 'nexus-prisma';
import { nexusModel } from '@lib/nexusHelpers';

export const userModel = nexusModel(User, { hideFields: ['password'] });
