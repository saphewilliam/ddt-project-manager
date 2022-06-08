import useForm, { Field, State } from '@saphe/react-form';

export default function useTeamForm(): State {
  return useForm({
    name: 'TeamForm',
    fields: {
      TeamNameField: {
        type: Field.TEXT,
        label: 'Team name',
        placeholder: 'E.g. Dutch Domino Team ',
        validation: { required: 'Please fill out a value.' },
      },
    },
    async onSubmit(formValues) {
      console.log(formValues);
    },
  });
}
