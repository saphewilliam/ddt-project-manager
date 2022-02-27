import useResizeObserver from '@react-hook/resize-observer';
import cx from 'clsx';
import React, { ReactElement, useRef, useEffect, useCallback, useState } from 'react';
import useWasm from '@hooks/useWasm';
import { environment } from '@lib/environment';

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
  // options: CanvasOptions
  onMouseDown?: (point: Point) => boolean;
  onMouseUp?: (point: Point) => boolean;
  onMouseMove?: (point: Point, mouseDownStart: Point | null) => boolean;
  onKeyDown?: (e: KeyboardEvent) => boolean;
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

    // Create buffers
    const buffer = new ArrayBuffer(width * height * 4);
    const buffer8 = new Uint8ClampedArray(buffer);
    const buffer32 = new Uint32Array(buffer);

    // Create image data
    if (environment.nodeEnv === 'development') console.time('createImageData');
    const pixels = instance?.exports.updatePixelGrid();
    for (let i = 0; i < pixels.length; i++) buffer32[i] = pixels[i] ?? 0;
    const imageData = new ImageData(buffer8, width, height);
    if (environment.nodeEnv === 'development') console.timeEnd('createImageData');

    // TODO Performance: call putImageData with a bounding box to redraw only a subset of the pixels (i.e., only supply the canvas with pixels from the ImageData in the box [(x,y), (x+w,y+h)])
    ctx.putImageData(imageData, 0, 0);
  }, [canvasRef, instance, loaded, error]);

  const handleMouseDown = useCallback(
    (e: ReactMouseEvent) => {
      const point = getMousePoint(e);
      if (!point) return;

      setMouseDownStart(point);
      if (props.onMouseDown) {
        const shouldUpdate = props.onMouseDown(point);
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

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (props.onKeyDown) {
        const shouldUpdate = props.onKeyDown(e);
        if (shouldUpdate) handleUpdate();
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

  useResizeObserver(canvasRef, handleUpdate);

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
