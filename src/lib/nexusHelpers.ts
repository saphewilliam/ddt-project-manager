import { objectType } from 'nexus';
import { NexusObjectTypeConfig, NexusObjectTypeDef } from 'nexus/dist/core';

interface Model {
  $name: string;
  $description: string | undefined;
}

export function nexusModel<T extends string>(
  model: Model,
  hideFields?: string[],
): NexusObjectTypeDef<T> {
  return objectType({
    name: model.$name,
    description: model.$description,
    definition(t) {
      const nexusNames = ['name', 'type', 'description', 'resolve'];

      const fields = Object.values(model)
        .filter((field) => field !== undefined)
        .filter((field) => JSON.stringify(Object.keys(field)) === JSON.stringify(nexusNames))
        .filter((field) => !hideFields?.find((hidden) => hidden === field.name));

      fields.forEach((field) => t.field(field));
    },
  } as NexusObjectTypeConfig<T>);
}
