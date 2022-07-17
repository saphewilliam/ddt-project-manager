import useForm, { Field, State } from '@saphe/react-form';

export default function useStoneTypeForm(): State {
  return useForm({
    name: 'StoneTypeForm',
    fields: {
      stoneTypeNameField: {
        type: Field.TEXT,
        label: 'Stone type name',
        placeholder: 'E.g. Roze MD-A ',
        validation: { required: 'Please fill out a value' },
      },
      stoneTypeDescriptionField: {
        type: Field.TEXT_AREA,
        label: 'Stone type description',
        validation: { required: 'Please fill out a value' },
      },
    },
    async onSubmit(formValues) {
      console.log(formValues);
    },
  });
}
