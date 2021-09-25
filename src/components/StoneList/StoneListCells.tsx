import cx from 'clsx';
import React, { ReactElement } from 'react';
import { RenderCellProps, RenderHeadProps } from '@hooks/useTable';
import { fontColorFromBackground, formatNumber } from '@lib/stoneListHelpers';

const commonClassName = cx('whitespace-nowrap', 'py-1', 'px-5');

export function ColorCell(props: RenderCellProps): ReactElement {
  return (
    <td
      style={{
        backgroundColor: props.value.hex,
        color: fontColorFromBackground(props.value.hex),
      }}
      className={cx(commonClassName, 'font-semibold')}
    >
      {props.value.name} ({props.value.alias})
    </td>
  );
}

export function ValueCell(props: RenderCellProps): ReactElement {
  return <td className={cx(commonClassName)}>{formatNumber(props.value)}</td>;
}

export function EditCell(props: RenderCellProps): ReactElement {
  return <td className={cx(commonClassName)}>{props.value}</td>;
}

export function HeadCell(props: RenderHeadProps): ReactElement {
  return (
    <th
      className={cx(commonClassName, 'sticky', 'top-0', 'bg-white')}
      style={{
        boxShadow: 'inset 0 -1px 0 0 rgba(0, 0, 0, 0.3)',
      }}
    >
      {props.label}
    </th>
  );
}
