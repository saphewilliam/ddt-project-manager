import useForm, { Field, State } from '@saphe/react-form';

export default function useMemberForm(): State {
  return useForm({
    name: 'MemberForm',
    fields: {
      selectPersonField: {
        type: Field.SELECT,
        label: 'Which person?',
        placeholder: 'Choose a person from the list.',
        options: [{ value: 'Person 1' }, { value: 'Person 2' }, { value: 'Person 3' }],
        validation: { required: 'Please choose a person.' },
      },
      selectRoleField: {
        type: Field.SELECT,
        label: 'Which role?',
        placeholder: 'Choose a role from the list.',
        options: [{ value: 'Role 1' }, { value: 'Role 2' }, { value: 'Role 3' }],
        validation: { required: 'Please choose a role.' },
      },
    },
    async onSubmit(formValues) {
      console.log(formValues);
    },
  });
}
