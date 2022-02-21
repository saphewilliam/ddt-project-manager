// Component inspired by:
// https://github.com/vkbansal/react-contextmenu/blob/HEAD/docs/api.md
// https://codepen.io/simeydotme/pen/EKRpam

import React, { useState, useEffect } from 'react';

/** Enumerates upon the types of context menu items */
export enum MenuItemKind {
  EXECUTE = 'EXECUTE',
  SUB = 'SUB',
  DIVIDE = 'DIVIDE',
}

/** Base interface for objects that hold menu item data. */
interface MenuItemBase {
  /** File path for image (svg) icon to be placed in front of the menu item */
  icon?: string;
  /** Whether or not the menu item should be disabled, defaults to false */
  disabled?: boolean;
  /** Text placed on the menu item */
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

/** Interface for objects that shows a divider in the menu */
export interface MenuItemDivide {
  /** Shows the kind of contxt menu item is divide */
  kind: MenuItemKind.DIVIDE;
}

/** Encompasses all types of menu items */
export type MenuItem = MenuItemExecute | MenuItemSub | MenuItemDivide;

export interface Props {
  children?: JSX.Element;
  header?: string;
  items: MenuItem[];
}

/*
export default function ContextMenu(props: Props): JSX.Element {
  const [showContext, setShowContext] = useState(false);
  const contextRef = useRef(null);

  function open(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>): void {
    // Prevent the default context menu from showing
    e.preventDefault();

    // Retrieve the DOM elements
    const context = contextRef.current;
    const subs = context.querySelectorAll('.context__menu--sub');

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
    subs.forEach((sub: HTMLDivElement) => {
      sub.classList.remove('oppositeX');
      sub.classList.remove('oppositeY');

      const client = sub.getBoundingClientRect();
      const subHitsRight = client.x + client.width - padx >= ww - padx;
      const subHitsBottom = client.y + client.height - pady >= wh - pady;

      if (subHitsRight) sub.classList.add('oppositeX');
      if (subHitsBottom) sub.classList.add('oppositeY');
    });

    // Show the context menu
    setShowContext(true);
  }

  function close(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>): void {
    e.preventDefault();

    function hasParent(target: Node, parentSelector: string): boolean {
      const parents = document.querySelectorAll(parentSelector);
      for (const i in parents)
        if (parents[i].contains) if (parents[i].contains(target)) return true;
      return false;
    }

    // @ts-ignore
    if (e.button === 0 && !hasParent(e.target, '.context__menu')) {
      setShowContext(false);
    }
  }

  return (
    <div className="context" onContextMenu={(e) => open(e)} onMouseDown={(e) => close(e)}>
      <ul ref={contextRef} className={`context__menu ${showContext ? 'shown' : ''}`}>
        {props.header && <li className="context__header">{props.header}</li>}
        {props.items.map((item, index) => {
          switch (item.kind) {
            case MenuItemKind.EXECUTE:
              return <ExecuteItem key={index} item={item} />;
            case MenuItemKind.SUB:
              return <SubItem key={index} item={item} />;
            case MenuItemKind.DIVIDE:
              return <DivideItem key={index} item={item} />;
            default:
              return <></>;
          }
        })}
      </ul>
      {props.children}
    </div>
  );
}
*/

function getMenuItemClassName(disabled = false, active = false): string {
  let className = 'context__item';
  if (disabled) className += ' context__item--disabled';
  if (active) className += ' context__item--active';
  return className;
}

export function ExecuteItem({ item }: { item: MenuItemExecute }): JSX.Element {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active)
      setTimeout(() => {
        setActive(false);
      }, 500);
  }, [active]);

  return (
    <li
      className={getMenuItemClassName(item.disabled, active)}
      onClick={(e) => {
        e.preventDefault();
        if (!item.disabled) {
          setActive(true);
          item.onClick();
        }
      }}
    >
      {/* {item.icon && <img className="pre" src={item.icon} alt="Context Menu Icon" />} */}

      <span>{item.label}</span>

      {item.shortcut && <span className="post">{item.shortcut}</span>}
    </li>
  );
}

export function SubItem({ item }: { item: MenuItemSub }): JSX.Element {
  return (
    <li className={getMenuItemClassName(item.disabled)}>
      {/* {item.icon && <img className="pre" src={item.icon} alt="Context Menu Icon" />} */}
      <span>{item.label}</span>
      <ul className="context__menu context__menu--sub">
        {item.items.map((subItem, index) => {
          switch (subItem.kind) {
            case MenuItemKind.EXECUTE:
              return <ExecuteItem key={index} item={subItem} />;
            case MenuItemKind.DIVIDE:
              return <DivideItem key={index} item={subItem} />;
            default:
              return <></>;
          }
        })}
      </ul>
      {/* TODO Make fill color variable */}
      <svg
        className="post"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="#FF922D"
        width="15px"
        height="15px"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M8 5v14l11-7z" />
      </svg>
    </li>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function DivideItem(_props: { item: MenuItemDivide }): JSX.Element {
  return <li className="context__divider"></li>;
}

/*
$context-menu-foreground: $primary;
$context-menu-background: $dark;

.context {
    width: 100%;
    height: 100%;
    display: inline-block;

    &__menu {
        position: absolute;
        min-width: 15rem;
        margin: 0;
        padding: 0.05em 0.25em;
        transform: rotate3d(-1, -1, 0, 70deg) scale(0.7);
        visibility: hidden;
        background: linear-gradient(145deg, darken($context-menu-background, 10%), lighten($context-menu-background, 10%));
        border: 1px solid $context-menu-background;
        border-radius: 3px;
        box-shadow: 0 4px 14px -5px #141321;
        list-style: none;
        font-size: 0.9rem;
        color: $context-menu-foreground;
        z-index: 100;
        transition: 0.3s transform ease, 0.3s opacity ease, 0s visibility ease;
        transform-origin: 0 0;
        opacity: 0;

        &, & * {
            cursor: default;
            user-select: none;
        }

        &.shown {
            transform: none;
            visibility: visible;
            opacity: 1;
            transition-delay: 0s;
        }

        &--sub {
            top: -0.4em;
            left: 100%;
            width: auto;
            min-width: 10em;
            transform: translateX(-0.7em);
            background: $context-menu-background;
            overflow: hidden;
            transition: transform, opacity, width, min-width, visibility;
            transition-timing-function: ease;
            transition-duration: 0.3s, 0.25s, 0.15s, 0.15s, 0.01s;
            transition-delay: 0.3s, 0.25s, 0.3s, 0.3s, 0.35s;

            .context__item {
                padding-left: 2em;
            }

            img {
                transform: translateX(-2.25em);
            }

            &.oppositeX {
                left: auto;
                right: 100%;
                transform: translateX(0.7em);
            }

            &.oppositeY {
                top: auto;
                bottom: -0.4em;
            }
        }
    }

    &__header, &__item {
        padding: 0.3em 1.5em 0.35em 2.5em;
    }

    &__header, &__divider {
        margin: 0.25em;
        border-bottom: 1px solid rgba(#D0C7FF, 0.3);
    }

    &__header {
        padding-bottom: 0.5em;
        font-weight: 700;
    }

    &__item {
        position: relative;
        border-radius: 3px;

        &:not(.context__item--disabled):hover {
            background-color: rgba(white, 0.09);
            color: white;

            .context__menu--sub {
                transform: translateX(0);
                visibility: visible;
                border-radius: 0 3px 3px;
                opacity: 1;
                transition-delay: 0.2s, 0.25s, 0.2s, 0.2s, 0s;
            }
        }

        &:last-child {
            margin-bottom: 0.25em;
        }

        &:first-child {
            margin-top: 0.25em;
        }

        &--disabled {
            color: rgba(white, 0.3);
        }

        &--active {
            animation: flash 0.5s ease 1;
        }

        .post {
            float: right;
            opacity: 0.5;
        }
    }

    img, svg {
        position: absolute;
        width: 1.4em;
        transform: translateX(-2em);
        text-align: right;
        font-style: normal;

        &.post {
            top: 55%;
            right: 0;
            transform: translateY(-55%);
            opacity: 0.6;
        }
    }
}

@keyframes flash {
    0% {
        background: rgba(white, 0);
    }

    20% {
        background: rgba(white, 0.4);
    }
}
*/
