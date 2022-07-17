import useForm, { Field, State } from '@saphe/react-form';

export default function useEventForm(): State {
  return useForm({
    name: 'EventForm',
    fields: {
      EventNameField: {
        type: Field.TEXT,
        label: 'Event name',
        placeholder: 'E.g. WDC 2022',
        validation: { required: 'Please fill out a value.' },
      },
      /*EventsDate*/
      EventImageField: {
        type: Field.FILE,
        label: 'Event image',
        validation: { required: 'Please choose a event image.' },
      },
      /*Builderslist*/
    },
    async onSubmit(formValues) {
      console.log(formValues);
    },
  });
}
