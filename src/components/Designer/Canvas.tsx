import cx from 'clsx';
import React, { ReactElement, useRef, useEffect, useCallback } from 'react';
import useWasm from '@hooks/useWasm';
// import ContextMenu from './ContextMenu';

// interface Point {
//   x: number;
//   y: number;
// }

// export interface Props {
//   offset: Point;
//   scale: number;
// }

// export default function Canvas(props: Props): ReactElement {
export default function Canvas(): ReactElement {
  const { instance, loaded, error } = useWasm();
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const { width, height } = canvas;

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
  }, [instance, loaded, error]);

  useEffect(() => {
    handleUpdate();
  }, [instance, loaded, error]);

  //   function getMouseX(e: MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>): number | null {
  //     const rect = canvasRef?.current?.getBoundingClientRect();
  //     if (!rect) return null;

  //     const mouseX = e.clientX - rect.left;
  //     if (mouseX >= props.offset.x && mouseX < props.offset.x + w * props.scale) {
  //         return Math.floor((mouseX - props.offset.x) / props.scale);
  //     }
  //     return null;
  // }

  // function getMouseY(e: React.MouseEvent<HTMLCanvasElement, globalThis.MouseEvent>): number {
  //     const rect = canvasRef.current.getBoundingClientRect();
  //     const mouseY = e.clientY - rect.top;
  //     if (mouseY >= props.offset.y && mouseY < props.offset.y + h * props.scale) {
  //         return Math.floor((mouseY - props.offset.y) / props.scale);
  //     }
  //     return null;
  // }

  return (
    // <ContextMenu items={[]} header="Utilities">
    <canvas
      onClick={handleUpdate}
      ref={canvasRef}
      style={{ imageRendering: 'pixelated' }}
      className={cx('w-full', 'h-full', 'block', 'bg-white')}
    />
    // </ContextMenu>
  );
}
