import useForm, { Field, State } from '@saphe/react-form';

export default function useUserForm(): State {
  return useForm({
    name: 'UserForm',
    fields: {
      UserFirstNameField: {
        type: Field.TEXT,
        label: 'First name',
        placeholder: 'E.g. Bas',
        validation: { required: 'Please fill out a value.' },
      },
      UserLastNameField: {
        type: Field.TEXT,
        label: 'Last name',
        placeholder: 'E.g. Veenhoven',
        validation: { required: 'Please fill out a value.' },
      },
      UserDisplayNameField: {
        type: Field.TEXT,
        label: 'Display name',
        placeholder: 'E.g. Bas V.',
        validation: { required: 'Please fill out a value.' },
      },
      UserImageField: {
        type: Field.FILE,
        label: 'User profile image',
        validation: { required: 'Please choose a user image.' },
      },
      UserPasswordField: {
        type: Field.PASSWORD,
        label: 'User password',
        validation: { required: 'Please fill out a value.' },
      },
      UserPasswordCheckField: {
        type: Field.PASSWORD,
        label: 'Confirm user password',
        validation: { required: 'This password is not correct.' },
      },
      UserEmailField: {
        type: Field.EMAIL,
        label: 'User E-mailaddress',
        validation: { required: 'This e-mailaddress is not correct.' },
      },
      UserCheckAdminField: {
        type: Field.CHECK,
        label: 'Is User admin?',
        validation: { required: 'Please choose a value.' },
      },
    },
    async onSubmit(formValues) {
      console.log(formValues);
    },
  });
}
