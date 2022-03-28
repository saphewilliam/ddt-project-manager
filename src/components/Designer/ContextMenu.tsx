import { ChevronRightIcon } from '@heroicons/react/solid';
import cx from 'clsx';
import React, { useState, useRef, ComponentProps, ReactElement, forwardRef } from 'react';

/** Enumerates upon the types of context menu items */
export enum MenuItemKind {
  EXECUTE = 'EXECUTE',
  SUB = 'SUB',
  DIVIDE = 'DIVIDE',
}

/** Base interface for objects that hold menu item data. */
interface MenuItemBase {
  icon?: (props: ComponentProps<'svg'>) => JSX.Element;
  disabled?: boolean;
  label: string;
}

/** Interface for objects that hold menu item data of a menu item that executes some code when clicked on */
export interface MenuItemExecute extends MenuItemBase {
  /** Shows the kind of contxt menu item is execute */
  kind: MenuItemKind.EXECUTE;
  /** Shortcut for the menu item to be displayed behind the item */
  shortcut?: string;
  /** The void function that should happen on click */
  onClick: () => void;
}

/** Interface for objects that hold menu item data of a menu item that shows a sub menu on hover */
export interface MenuItemSub extends MenuItemBase {
  /** Shows the kind of contxt menu item is sub */
  kind: MenuItemKind.SUB;
  /** The items that are displayed in the sub menu */
  items: (MenuItemExecute | MenuItemDivide)[];
}

/** Interface for objects that shows a  in the menu */
export interface MenuItemDivide {
  /** Shows the kind of contxt menu item is divide */
  kind: MenuItemKind.DIVIDE;
}

/** Encompasses all types of menu items */
export type MenuItem = MenuItemExecute | MenuItemSub | MenuItemDivide;

export interface Props {
  items: MenuItem[];
  children?: JSX.Element;
}

export default function ContextMenu(props: Props): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const open = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const context = menuRef.current;
    if (!context) return;

    // Calculate the context menu position
    const w = context.getBoundingClientRect().width;
    const h = context.getBoundingClientRect().height;
    const x = e.clientX;
    const y = e.clientY;
    const ww = window.innerWidth;
    const wh = window.innerHeight;
    const padx = 20;
    const pady = 20;

    context.style.left = `${x + w >= ww - padx ? ww - w - padx : x}px`;
    context.style.top = `${y + h >= wh - pady ? wh - h - pady : y}px`;

    // Calculate whether to flip the sub menus of the context menu
    const subs = context.querySelectorAll<HTMLUListElement>('.sub');
    subs.forEach((sub) => {
      // FIXME this doesn't fully work yet for some reason
      const client = sub.getBoundingClientRect();
      const subHitsRight = client.x + client.width - padx >= ww - padx;
      const subHitsBottom = client.y + client.height - pady >= wh - pady;

      if (subHitsRight) {
        sub.style.right = '100%';
        sub.style.left = 'auto';
      } else {
        sub.style.right = 'auto';
        sub.style.left = '100%';
      }

      if (subHitsBottom) {
        sub.style.bottom = '-0.25rem';
        sub.style.top = 'auto';
      } else {
        sub.style.bottom = 'auto';
        sub.style.top = '-0.25rem';
      }
    });

    setIsOpen(true);
  };

  const close = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    function hasParent(target: Node, parentSelector: string): boolean {
      const parents = document.querySelectorAll(parentSelector);
      for (const i in parents)
        if (parents[i]?.contains) if (parents[i]?.contains(target)) return true;
      return false;
    }

    if (e.button === 0 && !hasParent(e.target as Node, '.context-menu')) {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={cx('w-full', 'h-full')}
      onContextMenu={(e) => open(e)}
      onMouseDown={(e) => close(e)}
    >
      <Menu items={props.items} isOpen={isOpen} ref={menuRef} className={cx('w-60')} />
      {props.children}
    </div>
  );
}

const Menu = forwardRef<
  HTMLUListElement,
  { items: MenuItem[]; isOpen: boolean; className?: string }
>((props, ref) => (
  <ul
    ref={ref}
    className={cx(
      'context-menu',
      'absolute',
      'py-1',
      'bg-gray-900',
      'text-gray-200',
      'rounded-md',
      'shadow-lg',
      'z-50',
      !props.isOpen && cx('invisible', 'opacity-0', 'pointer-events-none'),
      props.className,
    )}
  >
    {props.items.map((item, index) => {
      switch (item.kind) {
        case MenuItemKind.EXECUTE:
        case MenuItemKind.SUB:
          return <Item key={index} {...item} />;
        case MenuItemKind.DIVIDE:
          return <li className={cx('border-b', 'border-gray-700', 'my-1')} key={index} />;
      }
    })}
  </ul>
));
Menu.displayName = 'Menu';

function Item(props: MenuItemExecute | MenuItemSub): ReactElement {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className={cx(
        'relative',
        'flex',
        'pl-2',
        'pr-3',
        'items-center',
        'justify-between',
        'transition-colors',
        'select-none',
        props.disabled ? cx('text-gray-500') : cx('hover:bg-gray-800', 'cursor-pointer'),
      )}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={(e) => {
        e.preventDefault();
        if (!props.disabled && 'onClick' in props && props.onClick) props.onClick();
      }}
    >
      <div className={cx('flex', 'items-center', 'space-x-2')}>
        {props.icon ? (
          <props.icon width={16} height={16} className={cx('text-gray-400')} />
        ) : (
          <div className={cx('w-4')} />
        )}
        <span>{props.label}</span>
      </div>

      {'shortcut' in props && props.shortcut && (
        <span className={cx('text-gray-400', 'text-sm')}>{props.shortcut}</span>
      )}

      {'items' in props && props.items && (
        <>
          <ChevronRightIcon width={16} height={16} className={cx('text-gray-400')} />
          <Menu items={props.items} isOpen={isOpen} className={cx('left-full', 'sub', 'w-40')} />
        </>
      )}
    </li>
  );
}
