import { inputObjectType } from 'nexus';
import { AttributesOnProjectPart } from 'nexus-prisma';
import { nexusModel } from '@lib/nexusHelpers';

export const attributesOnProjectPartModel = nexusModel(AttributesOnProjectPart);

export const attributesOnProjectPartUpdateWithoutProjectPartInput = inputObjectType({
  name: 'AttributesOnProjectPartUpdateWithoutProjectPartInput',
  definition(t) {
    t.int('amount');
    t.string('attributeId');
    t.string('userId');
  },
});
