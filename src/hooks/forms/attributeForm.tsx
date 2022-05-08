import useForm, { Field, State } from '@saphe/react-form';

export default function useAttributeForm(): State {
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
      console.log(formValues);
    },
  });
}
