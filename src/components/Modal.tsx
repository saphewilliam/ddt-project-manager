import { XIcon } from '@heroicons/react/solid';
import cx from 'clsx';
import React, { ReactElement } from 'react';

export interface Props {
  isOpen: boolean;
  close: () => void;
  title?: string;
  body?: ReactElement;
  footer?: ReactElement;
}

export default function Modal(props: Props): ReactElement {
  return (
    <>
      <div
        className={cx(
          'fixed',
          'z-40',
          'inset-0',
          'bg-gray-900',
          'transition-opacity',
          'duration-300',
          props.isOpen
            ? cx('opacity-30', 'cursor-pointer')
            : cx('opacity-0', 'pointer-events-none'),
        )}
        onClick={() => props.close()}
      />
      <div
        className={cx(
          'flex',
          'justify-center',
          'items-center',
          'mx-5',
          'fixed',
          'inset-0',
          'z-50',
          'pointer-events-none',
        )}
      >
        <div
          className={cx(
            'text-gray-800',
            'flex',
            'flex-col',
            'w-full',
            'sm:w-3/5',
            'md:w-1/2',
            'lg:w-1/3',
            'xl:w-1/4',
            '2xl:w-1/5',
            'rounded-lg',
            'shadow-2xl',
            'transition-all',
            'duration-300',
            'divide-y',
            'divide-opacity-30',
            'divide-gray-900',
            props.isOpen
              ? cx('bg-white', 'pointer-events-auto')
              : cx('opacity-0', '-translate-y-10'),
          )}
        >
          {props.title && (
            <div className={cx('flex', 'justify-between', 'items-center', 'py-3', 'px-5')}>
              <h3 className={cx('text-xl', 'font-bold')}>{props.title}</h3>
              <button onClick={() => props.close()} tabIndex={props.isOpen ? 0 : -1}>
                <XIcon className={cx('w-4')} />
              </button>
            </div>
          )}

          {props.body && <div className={cx('p-5')}>{props.body}</div>}

          {props.footer && (
            <div className={cx('flex', 'justify-end', 'py-3', 'px-5', 'space-x-3')}>
              {props.footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
