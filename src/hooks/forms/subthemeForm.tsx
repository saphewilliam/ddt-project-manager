import useForm, { Field, State } from '@saphe/react-form';

export default function useSubthemeForm(): State {
  return useForm({
    name: 'SubthemeForm',
    fields: {
      SubthemeNameField: {
        type: Field.TEXT,
        label: 'Subtheme name',
        placeholder: 'E.g. Beauty and the Beast',
        validation: { required: 'Please fill out a value.' },
      },
      SubthemeColorField: {
        type: Field.TEXT,
        label: 'Subtheme color',
        placeholder: 'E.g. #000000 ',
        validation: { required: 'Please fill out a value' },
      },
      SubthemeEventField: {
        type: Field.SELECT,
        label: 'Subtheme event',
        placeholder: 'Choose a event from the list.',

        options: [{ value: 'Event one' }, { value: 'Event two' }, { value: 'Event three' }],
      },
    },
    async onSubmit(formValues) {
      console.log(formValues);
    },
  });
}
