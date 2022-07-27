import useSdk from '@hooks/useSdk';
import useForm, { Field, State } from '@saphe/react-form';
import { toast } from 'react-hot-toast';
import { promiseWithCatch } from '@lib/util';

export default function useUserForm(): State {
  const sdk = useSdk();
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
      // UserImageField: {
      //   type: Field.FILE,
      //   label: 'User profile image',
      //   validation: { required: 'Please choose a user image.' },
      // },
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
        // validation: { required: 'Please choose a value.' },
      },
    },
    async onSubmit(formValues) {
      if (formValues.UserPasswordField != formValues.UserPasswordCheckField) {
        toast.error(`User password do not match.`);
        return;
      }
      const data = await promiseWithCatch(
        sdk.CreateUser({
          data: {
            firstName: formValues.UserFirstNameField,
            lastName: formValues.UserLastNameField,
            displayName: formValues.UserDisplayNameField,
            password: formValues.UserPasswordField,
            email: formValues.UserEmailField,
            isAdmin: formValues.UserCheckAdminField,
          },
        }),
        'Something went wrong while creating the user...',
      );
      if (!data) return;

      toast.success(`User '${data.createUser.firstName}' was created`);
    },
  });
}
