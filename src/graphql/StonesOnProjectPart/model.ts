import { inputObjectType } from 'nexus';
import { StonesOnProjectPart } from 'nexus-prisma';
import { nexusModel } from '@lib/nexusHelpers';

export const stonesOnProjectPartModel = nexusModel(StonesOnProjectPart);

export const stonesOnProjectPartUpdateWithoutProjectPartInput = inputObjectType({
  name: 'StonesOnProjectPartUpdateWithoutProjectPartInput',
  definition(t) {
    t.int('amount');
    t.string('stoneId');
    t.string('userId');
  },
});
