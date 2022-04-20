import useResizeObserver from '@react-hook/resize-observer';
import cx from 'clsx';
import React, { ReactElement, useRef, useEffect, useCallback, useState, useReducer } from 'react';
import useWasm from '@hooks/useWasm';
import ContextMenu, { MenuItem, MenuItemDivide, MenuItemExecute, MenuItemSub } from './ContextMenu';

export interface Point {
  x: number;
  y: number;
}

// interface CanvasOptions {
//   stroke: {
//     thickness: number;
//     color: Color;
//   }
// }

/** [shouldUpdate, shouldClear dx, dy, width, height, ...pixels] */
export type CanvasUpdateInfo = number[];

type ReactMouseEvent = React.MouseEvent<HTMLCanvasElement, MouseEvent>;

type MenuItemProxy = Omit<MenuItemExecute, 'onClick'> & { onClick: () => CanvasUpdateInfo };
type SubMenuItemProxy = Omit<MenuItemSub, 'items'> & { items: (MenuItemProxy | MenuItemDivide)[] };

export interface Props {
  // options: CanvasOptions
  contextMenuItems?: (MenuItemProxy | SubMenuItemProxy | MenuItemDivide)[];
  onMouseDown?: (point: Point) => CanvasUpdateInfo;
  onMouseUp?: (point: Point) => CanvasUpdateInfo;
  onMouseMove?: (point: Point, mouseDownStart: Point | null) => CanvasUpdateInfo;
  onKeyDown?: (e: KeyboardEvent) => CanvasUpdateInfo;
}

export default function Canvas(props: Props): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mouseDownStart, setMouseDownStart] = useState<Point | null>(null);

  const { instance, loaded, error } = useWasm();

  const [contextMenuItems, dispatchContextMenuItems] = useReducer(
    (state: MenuItem[], action: { type: 'set' } | { type: 'update' }): MenuItem[] => {
      switch (action.type) {
        case 'set':
          return (
            props.contextMenuItems?.map<MenuItem>((item) => {
              if ('onClick' in item && item.onClick)
                return {
                  ...item,
                  onClick: () => {
                    const updateInfo = item.onClick();
                    if (updateInfo[0] !== 0) updateCanvas(updateInfo);
                  },
                } as MenuItem;
              if ('items' in item && item.items)
                return {
                  ...item,
                  items: item.items.map((subItem) => {
                    if ('onClick' in subItem && subItem.onClick)
                      return {
                        ...subItem,
                        onClick: () => {
                          const updateInfo = subItem.onClick();
                          if (updateInfo[0] !== 0) updateCanvas(updateInfo);
                        },
                      };
                    return subItem;
                  }),
                } as MenuItem;
              return item as MenuItem;
            }) ?? []
          );
        case 'update':
          return (
            state?.map<MenuItem>((item) => {
              if ('onClick' in item && item.onClick) return { ...item, disabled: item.disabled };
              if ('items' in item && item.items)
                return {
                  ...item,
                  items: item.items.map((subItem) => {
                    if ('onClick' in subItem) return { ...subItem, disabled: subItem.disabled };
                    return subItem;
                  }),
                };
              return item;
            }) ?? []
          );
      }
    },
    [],
  );

  useEffect(() => {
    dispatchContextMenuItems({ type: 'set' });
  }, [props.contextMenuItems]);

  const getMousePoint = useCallback(
    (e: ReactMouseEvent): Point | null => {
      if (e.button !== 0) return null;

      const canvasRect = canvasRef?.current?.getBoundingClientRect();
      if (!canvasRect) return null;

      const x = e.clientX - canvasRect.left;
      const y = e.clientY - canvasRect.top;

      return { x, y };
    },
    [canvasRef],
  );

  const updateCanvas = useCallback(
    (updateInfo: CanvasUpdateInfo) => {
      // Extract canvas ref and update information
      const [shouldUpdate, shouldClear, dx, dy, width, height, ...pixels] = updateInfo;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (
        shouldUpdate === 0 ||
        shouldClear === undefined ||
        dx === undefined ||
        dy === undefined ||
        !width ||
        !height ||
        !canvas ||
        !ctx
      )
        return;

      // Create buffers
      const buffer = new ArrayBuffer(width * height * 4);
      const buffer8 = new Uint8ClampedArray(buffer);
      const buffer32 = new Uint32Array(buffer);

      // Put the image data on the canvas
      // TODO faster way to do this for loop?
      for (let i = 0; i < pixels.length; i++) buffer32[i] = pixels[i] ?? 0;
      const imageData = new ImageData(buffer8, width, height);
      if (shouldClear === 1) ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.putImageData(imageData, dx, dy, 0, 0, width, height);

      dispatchContextMenuItems({ type: 'update' });
    },
    [canvasRef],
  );

  const handleResize = useCallback(() => {
    if (!loaded) return;
    if (error) {
      console.error(error);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const { clientWidth: width, clientHeight: height } = canvas;
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;

      const updateInfo = instance?.exports.setCanvasSize(width, height);
      if (updateInfo[0] !== 0) updateCanvas(updateInfo);
    }
  }, [instance, loaded, error, canvasRef]);

  const handleMouseDown = useCallback(
    (e: ReactMouseEvent) => {
      const point = getMousePoint(e);
      if (!point) return;

      setMouseDownStart(point);
      if (props.onMouseDown) {
        const updateInfo = props.onMouseDown(point);
        if (updateInfo[0] !== 0) updateCanvas(updateInfo);
      }
    },
    [props.onMouseDown, canvasRef, instance, loaded, error],
  );

  const handleMouseUp = useCallback(
    (e: ReactMouseEvent) => {
      const point = getMousePoint(e);
      if (!point) return;

      setMouseDownStart(null);
      if (props.onMouseUp) {
        const updateInfo = props.onMouseUp(point);
        if (updateInfo[0] !== 0) updateCanvas(updateInfo);
      }
    },
    [props.onMouseUp, canvasRef, instance, loaded, error],
  );

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent) => {
      const point = getMousePoint(e);
      if (!point) return;

      if (props.onMouseMove) {
        const updateInfo = props.onMouseMove(point, mouseDownStart);
        if (updateInfo[0] !== 0) updateCanvas(updateInfo);
      }
    },
    [props.onMouseMove, mouseDownStart, canvasRef, instance, loaded, error],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (props.onKeyDown) {
        const updateInfo = props.onKeyDown(e);
        if (updateInfo[0] !== 0) updateCanvas(updateInfo);
      }
    },
    [props.onKeyDown],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [window, handleKeyDown]);

  useResizeObserver(canvasRef, handleResize);

  return (
    <ContextMenu items={contextMenuItems}>
      <div style={{ height: 'calc(100vh - 144px)' }}>
        <canvas
          ref={canvasRef}
          className={cx('w-full', 'h-full', 'block', 'bg-white')}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        />
      </div>
    </ContextMenu>
  );
}
