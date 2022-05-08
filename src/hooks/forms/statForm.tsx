import useForm, { Field, State } from '@saphe/react-form';

export default function useStatForm(): State {
  return useForm({
    name: 'StatForm',
    fields: {
      StatNameField: {
        type: Field.TEXT,
        label: 'Stat name',
        validation: { required: 'Please fill out a value.' },
      },
    },
    async onSubmit(formValues) {
      console.log(formValues);
    },
  });
}
