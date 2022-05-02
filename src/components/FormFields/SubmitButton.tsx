import { ReactElement } from 'react';
import Button from '@components/Button';
import { Props } from '@hooks/useForm';

export default function SubmitButton(props: Props.SubmitButtonProps): ReactElement {
  return (
    <Button
      label={props.isSubmitting ? props.submittingLabel : props.label}
      onClick={(e) => props.onClick && props.onClick(e)}
      disabled={props.disabled}
      loading={props.isSubmitting}
    />
  );
}
