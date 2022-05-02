import cx from 'clsx';
import { ReactElement } from 'react';
import { Props } from '@hooks/useForm';

export default function FieldContainer(props: Props.FieldContainerProps): ReactElement {
  return <div className={cx('mb-4', 'flex', 'flex-col', 'space-y-1')}>{props.children}</div>;
}
