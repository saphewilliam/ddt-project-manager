import { DotsVerticalIcon, ChevronDownIcon } from '@heroicons/react/solid';
import cx from 'clsx';
import React, { ComponentProps, ReactElement, ReactNode, useState } from 'react';

export interface Props {
  title: string;
  moreButtonOnClick?: () => void;
  className?: string;
  children?: ReactNode;
}

function HeaderButton(props: {
  icon: (props: ComponentProps<'svg'>) => JSX.Element;
  onClick: () => void;
  iconClassName?: string;
}): ReactElement {
  return (
    <button
      onClick={props.onClick}
      className={cx(
        'focus:bg-gray-700',
        'transition-colors',
        'rounded-full',
        'w-6',
        'h-6',
        'flex',
        'justify-center',
        'items-center',
      )}
    >
      <props.icon width={20} height={20} className={props.iconClassName} />
    </button>
  );
}

export default function SideBarSection(props: Props): ReactElement {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={cx('px-4', 'py-3', 'border-b-gray-700', 'border-b')}>
      <div className={cx('flex', 'justify-between')}>
        <h3 className={cx('font-bold')}>{props.title}</h3>
        <div className={cx('flex', 'space-x-1')}>
          <HeaderButton
            icon={ChevronDownIcon}
            onClick={() => setExpanded(!expanded)}
            iconClassName={cx(expanded && 'rotate-180', 'transition-transform', 'duration-300')}
          />
          {props.moreButtonOnClick && (
            <HeaderButton icon={DotsVerticalIcon} onClick={props.moreButtonOnClick} />
          )}
        </div>
      </div>
      {expanded && (
        <div className={cx('flex', 'justify-between', 'gap-y-3', 'py-4', props.className)}>
          {props.children}
        </div>
      )}
    </div>
  );
}
