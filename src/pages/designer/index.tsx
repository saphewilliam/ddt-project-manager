// import cx from 'clsx';
// import ContextMenu from './ContextMenu';
import React, { ReactElement } from 'react';
import Canvas from '@components/Designer/Canvas';
import Layout from '@components/Layout';

// TODO contour tool
// TODO tools are linked to the project types they apply to
// enum Tools {
//   MOVE = 'MOVE',
//   SELECT = 'SELECT',
//   PENCIL = 'PENCIL',
//   ERASER = 'ERASER',
//   ZOOM = 'ZOOM',
// }

// interface Tool {
//   label: string;
//   description: string;
//   icon: () => ReactElement;
//   shortCut: string;
//   mouseMove?: (mouseDown: boolean) => void;
//   mouseDown?: () => void;
//   mouseUp?: () => void;
//   mouseWheel?: () => void;
//   keyPressed?: () => void;
//   enterTool?: () => void;
//   leaveTool?: () => void;
// }

export default function DesignerPage(): ReactElement {
  return (
    <Layout title="Designer">
      {/* <ContextMenu items={[]} header="Utilities"> */}
      <Canvas />
      {/* </ContextMenu> */}
    </Layout>
  );
}
