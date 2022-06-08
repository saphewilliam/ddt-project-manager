import useForm, { Field, State } from '@saphe/react-form';

export default function useStoneForm(): State {
  return useForm({
    name: 'StoneForm',
    fields: {
      stoneNameField: {
        type: Field.TEXT,
        label: 'Stone name',
        placeholder: 'E.g. Roze MD-A ',
        validation: { required: 'Please fill out a value' },
      },
      /*Check if colorchanging */
      stoneAliasField: {
        type: Field.TEXT,
        label: 'Stone alias',
        placeholder: 'E.g. Lichtroze ',
        validation: { required: 'Please fill out a value' },
      },
      stoneColorchangingAliasField: {
        type: Field.TEXT,
        label: 'Colorchanging stone alias',
        placeholder: 'E.g. Donkerroze ',
        validation: { required: 'Please fill out a value' },
      },
      stoneColorField: {
        type: Field.COLOR,
        label: 'Stone color',
        placeholder: 'E.g. #000000 ',
        validation: { required: 'Please fill out a value' },
      },
      stoneColorchangingColorField: {
        type: Field.COLOR,
        label: 'Stone colorchanging color',
        placeholder: 'E.g. #ffffff ',
        validation: { required: 'Please fill out a value' },
      },
      stoneDescriptionField: {
        type: Field.TEXT_AREA,
        label: 'Stone description',
        validation: { required: 'Please fill out a value' },
      },
    },
    async onSubmit(formValues) {
      console.log(formValues);
    },
  });
}
