import { nexusModel } from '@lib/nexusHelpers';
import { User } from 'nexus-prisma';

export const userModel = nexusModel(User, { hideFields: ['password'] });
