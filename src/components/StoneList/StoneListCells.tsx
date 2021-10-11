import { PencilIcon } from '@heroicons/react/outline';
import { InformationCircleIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';
import cx from 'clsx';
import React, { ReactElement } from 'react';
import { RenderCellProps, RenderHeadProps, SortOrder } from '@hooks/useTable';
import { fontColorFromBackground, formatNumber } from '@lib/stoneListHelpers';

const commonClassName = cx('whitespace-nowrap', 'py-1', 'px-5', 'text-black');

export function ColorCell(props: RenderCellProps): ReactElement {
  return (
    <td
      style={{
        backgroundColor: props.value.hex,
        color: fontColorFromBackground(props.value.hex),
      }}
      className={cx(commonClassName, 'font-semibold')}
    >
      <div className={cx('flex', 'justify-between')}>
        <span>{props.value.name}</span>
        <InformationCircleIcon
          className={cx('w-5', 'cursor-pointer', 'ml-3')}
          data-for="stoneListToolTip"
          data-tip={props.value.alias}
        />
      </div>
    </td>
  );
}

export function ValueCell(props: RenderCellProps): ReactElement {
  return <td className={cx(commonClassName, 'text-opacity-80')}>{formatNumber(props.value)}</td>;
}

export function EditCell(props: RenderCellProps): ReactElement {
  return (
    <td className={cx(commonClassName, 'flex', 'justify-end', 'items-center', 'h-full')}>
      <button
        className={cx(
          'py-1',
          'px-1',
          'rounded',
          'transition-colors',
          'hover:text-white',
          'hover:bg-primary',
        )}
        onClick={() => props.value()}
      >
        <PencilIcon className={cx('w-4')} />
      </button>
    </td>
  );
}

export function HeadCell(props: RenderHeadProps): ReactElement {
  return (
    <th
      className={cx(
        commonClassName,
        'sticky',
        'top-0',
        'bg-white',
        props.toggleSort && cx('cursor-pointer'),
      )}
      style={{
        boxShadow: 'inset 0 -1px 0 0 rgba(0, 0, 0, 0.2)',
      }}
      onClick={() => props.toggleSort && props.toggleSort()}
    >
      <div className={cx('flex', 'items-center', 'space-x-1')}>
        <span>{props.label}</span>
        {props.sortOrder === SortOrder.ASC ? (
          <ChevronUpIcon className={cx('w-5')} />
        ) : props.sortOrder === SortOrder.DESC ? (
          <ChevronDownIcon className={cx('w-5')} />
        ) : null}
      </div>
    </th>
  );
}