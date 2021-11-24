// import cx from 'clsx';
import React, { ReactElement } from 'react';
import Canvas from '@components/Designer/Canvas';

// TODO contour tool
// TODO tools are linked to the project types they apply to
// enum Tools {
//   MOVE = 'MOVE',
//   PENCIL = 'PENCIL',
//   ERASER = 'ERASER',
//   SELECT = 'SELECT',
//   ZOOM = 'ZOOM',
// }

// interface Tool {
//   label: string;
//   icon: () => ReactElement;
//   shortCut: string;
//   mouseMove: () => void;
//   mouseDown: () => void;
//   mouseUp: () => void;
//   enterTool: () => void;
//   leaveTool: () => void;
// }

export default function DesignerPage(): ReactElement {
  return <Canvas />;
}
