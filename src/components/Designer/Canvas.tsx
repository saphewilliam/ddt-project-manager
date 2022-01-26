import cx from 'clsx';
import React, { ReactElement, useRef, useEffect, useCallback, useState } from 'react';
import useWasm from '@hooks/useWasm';

interface Point {
  x: number;
  y: number;
}

// interface CanvasOptions {
//   stroke: {
//     thickness: number;
//     color: Color;
//   }
// }

type ReactMouseEvent = React.MouseEvent<HTMLCanvasElement, MouseEvent>;

export interface Props {
  // grid: Grid;
  // offset: Point;
  // scale: number;
  // selection: Point[];
  // options: CanvasOptions
  onMouseDown?: (point: Point) => boolean;
  onMouseUp?: (point: Point) => boolean;
  onMouseMove?: (point: Point, mouseDown: boolean) => boolean;
}

export default function Canvas(props: Props): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouseDown, setMouseDown] = useState(false);
  const { instance, loaded, error } = useWasm();

  const getMousePoint = (e: ReactMouseEvent): Point | null => {
    if (e.button !== 0) return null;

    const canvasRect = canvasRef?.current?.getBoundingClientRect();
    if (!canvasRect) return null;

    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    return { x, y };
  };

  const handleUpdate = useCallback(() => {
    if (!loaded) return;
    if (error) {
      console.error(error);
      return;
    }

    // Extract ref to canvas element
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Set default canvas width and height
    const { clientWidth: width, clientHeight: height } = canvas;
    canvas.width = width;
    canvas.height = height;

    // Create image data
    const randomShade = () => Math.floor(Math.random() * 255);
    const image = ctx.createImageData(width, height);
    const imageData = instance?.exports.drawL2(
      width,
      height,
      randomShade(),
      randomShade(),
      randomShade(),
    );
    image.data.set(imageData);

    // Set image data
    ctx.clearRect(0, 0, width, height);
    ctx.putImageData(image, 0, 0);
  }, [canvasRef, instance, loaded, error]);

  const handleMouseDown = useCallback(
    (e: ReactMouseEvent) => {
      const point = getMousePoint(e);
      if (!point) return;

      setMouseDown(true);
      if (props.onMouseDown) {
        const shouldUpdate = props.onMouseDown(point);
        if (shouldUpdate) handleUpdate();
      }
    },
    [canvasRef, instance, loaded, error],
  );

  const handleMouseUp = useCallback(
    (e: ReactMouseEvent) => {
      const point = getMousePoint(e);
      if (!point) return;

      setMouseDown(false);
      if (props.onMouseUp) {
        const shouldUpdate = props.onMouseUp(point);
        if (shouldUpdate) handleUpdate();
      }
    },
    [canvasRef, instance, loaded, error],
  );

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent) => {
      const point = getMousePoint(e);
      if (!point) return;

      if (props.onMouseMove) {
        const shouldUpdate = props.onMouseMove(point, mouseDown);
        if (shouldUpdate) handleUpdate();
      }
    },
    [canvasRef, instance, loaded, error],
  );

  useEffect(() => {
    handleUpdate();
  }, [canvasRef, instance, loaded, error]);

  return (
    <canvas
      ref={canvasRef}
      style={{ imageRendering: 'pixelated' }}
      className={cx('w-full', 'h-full', 'block', 'bg-white')}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    />
  );
}
