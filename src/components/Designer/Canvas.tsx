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

/** [shouldUpdate, dx, dy, width, height, ...pixels] */
export type CanvasUpdateInfo = number[];

type ReactMouseEvent = React.MouseEvent<HTMLCanvasElement, MouseEvent>;

export interface Props {
  // options: CanvasOptions
  onMouseDown?: (point: Point) => CanvasUpdateInfo;
  onMouseUp?: (point: Point) => CanvasUpdateInfo;
  onMouseMove?: (point: Point, mouseDownStart: Point | null) => CanvasUpdateInfo;
  onKeyDown?: (e: KeyboardEvent) => CanvasUpdateInfo;
}

export default function Canvas(props: Props): ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mouseDownStart, setMouseDownStart] = useState<Point | null>(null);

  const { instance, loaded, error } = useWasm();

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
      const [shouldUpdate, dx, dy, width, height, ...pixels] = updateInfo;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (
        shouldUpdate === 0 ||
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

      // if (environment.nodeEnv === 'development') console.time('createImageData');
      // if (environment.nodeEnv === 'development') console.timeEnd('createImageData');

      // Put the image data on the canvas
      // TODO better way to do this for loop?
      for (let i = 0; i < pixels.length; i++) buffer32[i] = pixels[i] ?? 0;
      const imageData = new ImageData(buffer8, width, height);
      ctx.putImageData(imageData, dx, dy, 0, 0, width, height);
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
    canvas.width = width;
    canvas.height = height;

    const updateInfo = instance?.exports.setCanvasSize(width, height);
    console.log(updateInfo);
    if (updateInfo[0] !== 0) updateCanvas(updateInfo);
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
