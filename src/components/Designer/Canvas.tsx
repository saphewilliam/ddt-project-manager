import cx from 'clsx';
import React, { ReactElement, useRef, useEffect, useCallback, useState } from 'react';
import useWasm from '@hooks/useWasm';

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

type ReactMouseEvent = React.MouseEvent<HTMLCanvasElement, MouseEvent>;

export interface Props {
  // grid: Grid;
  // offset: Point;
  // scale: number;
  // selection: Point[];
  // options: CanvasOptions
  // TODO throw instance in the global context
  onMouseDown?: (point: Point) => boolean;
  onMouseUp?: (point: Point) => boolean;
  onMouseMove?: (point: Point, mouseDownStart: Point | null) => boolean;
}

export default function Canvas(props: Props): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mouseDownStart, setMouseDownStart] = useState<Point | null>(null);

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
    instance?.exports.setCanvasSize(width, height);
    canvas.width = width;
    canvas.height = height;

    // Create image data
    console.time('updatePixelGrid');
    const pixels = new Uint8ClampedArray(instance?.exports.updatePixelGrid());
    const imageData = new ImageData(pixels, width, height);
    console.timeEnd('updatePixelGrid');

    // Set image data
    ctx.clearRect(0, 0, width, height);
    // TODO Performance increase: https://hacks.mozilla.org/2011/12/faster-canvas-pixel-manipulation-with-typed-arrays/
    // https://gist.github.com/biovisualize/5400576

    // TODO For more performance, call putImageData with a bounding box to redraw only a subset of the pixels (i.e., only supply the canvas with pixels from the ImageData in the box [(x,y), (x+w,y+h)])
    ctx.putImageData(imageData, 0, 0);
  }, [canvasRef, instance, loaded, error]);

  const handleMouseDown = useCallback(
    (e: ReactMouseEvent) => {
      const point = getMousePoint(e);
      if (!point) return;

      setMouseDownStart(point);
      if (props.onMouseDown) {
        console.time('mouseDown');
        const shouldUpdate = props.onMouseDown(point);
        console.timeEnd('mouseDown');
        if (shouldUpdate) handleUpdate();
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
        const shouldUpdate = props.onMouseUp(point);
        if (shouldUpdate) handleUpdate();
      }
    },
    [props.onMouseUp, canvasRef, instance, loaded, error],
  );

  const handleMouseMove = useCallback(
    (e: ReactMouseEvent) => {
      const point = getMousePoint(e);
      if (!point) return;

      if (props.onMouseMove) {
        const shouldUpdate = props.onMouseMove(point, mouseDownStart);
        if (shouldUpdate) handleUpdate();
      }
    },
    [props.onMouseMove, mouseDownStart, canvasRef, instance, loaded, error],
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
