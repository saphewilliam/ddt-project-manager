import useForm, { Field, State } from '@saphe/react-form';

export default function useStoneOrderForm(): State {
  return useForm({
    name: 'stoneOrderForm',
    fields: {},
    async onSubmit(formValues) {
      console.log(formValues);
    },
  });
}
