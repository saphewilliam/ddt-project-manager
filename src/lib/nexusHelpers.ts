import { objectType } from 'nexus';
import { NexusObjectTypeConfig, NexusObjectTypeDef, ObjectDefinitionBlock } from 'nexus/dist/core';

interface Model {
  $name: string;
  $description: string | undefined;
}

export function nexusModel<T extends string>(
  model: Model,
  options?: {
    hide?: string[];
    extend?: (t: ObjectDefinitionBlock<T>) => void;
  },
): NexusObjectTypeDef<T> {
  return objectType({
    name: model.$name,
    description: model.$description,
    definition(t) {
      const nexusNames = ['name', 'type', 'description', 'resolve'];

      const fields = Object.values(model)
        .filter((field) => field !== undefined)
        .filter((field) => JSON.stringify(Object.keys(field)) === JSON.stringify(nexusNames))
        .filter((field) => !options?.hide?.find((hidden) => hidden === field.name));

      fields.forEach((field) => t.field(field));

      if (options?.extend) options.extend(t);
    },
  } as NexusObjectTypeConfig<T>);
}
