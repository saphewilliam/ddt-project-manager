import Button from '@components/Button';
import { Props } from '@saphe/react-form';
import { ReactElement } from 'react';

export default function SubmitButton(props: Props.SubmitButtonProps): ReactElement {
  return (
    <Button
      type={props.type}
      label={props.label}
      onClick={props.onClick}
      disabled={props.disabled}
      loading={props.isLoading}
    />
  );
}
