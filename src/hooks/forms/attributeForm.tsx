import useForm, { Field, State } from '@saphe/react-form';
import { toast } from 'react-hot-toast';
import useSdk from '@hooks/useSdk';
import { promiseWithCatch } from '@lib/util';

export default function useAttributeForm(): State {
  const sdk = useSdk();

  return useForm({
    name: 'AttributeForm',
    fields: {
      attributeNameField: {
        type: Field.TEXT,
        label: 'Attribute name',
        placeholder: 'E.g. Staircase ',
        validation: { required: 'Please fill out a value' },
      },
      attributePluralNameField: {
        type: Field.TEXT,
        label: 'Attribute plural name',
        placeholder: 'E.g. Staircases ',
        validation: { required: 'Please fill out a value' },
      },
    },
    async onSubmit(formValues) {
      const data = await promiseWithCatch(
        sdk.CreateAttribute({
          data: {
            name: formValues.attributeNameField,
            namePlural: formValues.attributePluralNameField,
          },
        }),
        'Something went wrong while creating the attribute...',
      );
      if (!data) return;

      toast.success(`Attribute '${data.createAttritbute.name}' was created`);
    },
  });
}
