import { PencilIcon, SelectorIcon } from '@heroicons/react/outline';
import { InformationCircleIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { RenderCellProps, RenderHeadProps, SortOrder } from '@saphe/react-table';
import cx from 'clsx';
import React, { ReactElement } from 'react';
import { fontColorFromBackgroundHex, formatNumber } from '@lib/util';

const commonClassName = cx('whitespace-nowrap', 'py-1', 'px-4', 'text-gray-900');

export function ColorCell(props: RenderCellProps): ReactElement {
  return (
    <td
      style={{
        backgroundColor: props.row.color.hex,
        color: fontColorFromBackgroundHex(props.row.color.hex),
      }}
      className={cx(commonClassName, 'font-semibold')}
    >
      <div className={cx('flex', 'justify-between')}>
        <span>{props.row.color.name}</span>
        <InformationCircleIcon
          className={cx('w-5', 'cursor-pointer', 'ml-3')}
          data-for="stoneListToolTip"
          data-tip={props.row.color.alias}
        />
      </div>
    </td>
  );
}

export function ValueCell(props: RenderCellProps): ReactElement {
  return (
    <td className={cx(commonClassName, 'text-opacity-80')}>
      {typeof props.value === 'number' ? formatNumber(props.value) : props.stringValue}
    </td>
  );
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
        onClick={() => props.row.edit()}
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
        // TODO sticky header
        // 'sticky',
        // 'top-0',
        'bg-white',
        props.toggleSort && cx('cursor-pointer'),
      )}
      style={{
        boxShadow: 'inset 0 -1px 0 0 rgba(0, 0, 0, 0.2)',
      }}
      onClick={() => props.toggleSort && props.toggleSort()}
    >
      <div className={cx('flex', 'justify-between', 'items-center', 'space-x-1')}>
        <span>{props.label}</span>
        {props.toggleSort &&
          (props.sortOrder === SortOrder.ASC ? (
            <ChevronUpIcon className={cx('w-5')} />
          ) : props.sortOrder === SortOrder.DESC ? (
            <ChevronDownIcon className={cx('w-5')} />
          ) : (
            <SelectorIcon className={cx('w-5', 'text-gray-400')} />
          ))}
      </div>
    </th>
  );
}
