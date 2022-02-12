import {
  CubeTransparentIcon as CubeTransparentIconOutline,
  HandIcon as HandIconOutline,
  PencilIcon as PencilIconOutline,
  XCircleIcon as XCircleIconOutline,
  ZoomInIcon as ZoomInIconOutline,
  ZoomOutIcon as ZoomOutIconOutline,
} from '@heroicons/react/outline';
import {
  CubeTransparentIcon as CubeTransparentIconSolid,
  HandIcon as HandIconSolid,
  PencilIcon as PencilIconSolid,
  XCircleIcon as XCircleIconSolid,
  ZoomInIcon as ZoomInIconSolid,
  ZoomOutIcon as ZoomOutIconSolid,
} from '@heroicons/react/solid';
import cx from 'clsx';
// import ContextMenu from './ContextMenu';
import React, { ReactElement, SVGProps, useState } from 'react';
import Canvas, { Point } from '@components/Designer/Canvas';
import Layout from '@components/Layout';

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

type ColorIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

interface Color {
  name: string;
  hex: string;
}

const colors: { [P in ColorIndex]: Color } = {
  [0]: { hex: '#000000', name: 'Black' },
  [1]: { hex: '#7f7f7f', name: 'Gray' },
  [2]: { hex: '#880015', name: 'Bordeaux' },
  [3]: { hex: '#ed1c24', name: 'Red' },
  [4]: { hex: '#ff7f27', name: 'Orange' },
  [5]: { hex: '#fff200', name: 'Yellow' },
  [6]: { hex: '#22b14c', name: 'Green' },
  [7]: { hex: '#00a2e8', name: 'Light Blue' },
  [8]: { hex: '#3f48cc', name: 'Dark Blue' },
  [9]: { hex: '#a349a4', name: 'Lilac' },
};

enum ToolIndex {
  DRAW = 'DRAW',
  ERASE = 'ERASE',
  SELECT = 'SELECT',
  MOVE = 'MOVE',
  ZOOM_IN = 'ZOOM_IN',
  ZOOM_OUT = 'ZOOM_OUT',
}

interface Tool {
  label: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
  selectedIcon: (props: SVGProps<SVGSVGElement>) => ReactElement;

  onMouseDown?: (point: Point) => boolean;
  onMouseUp?: (point: Point) => boolean;
  onMouseMove?: (point: Point, mouseDown: boolean) => boolean;
}

const tools: { [P in keyof typeof ToolIndex]: Tool } = {
  [ToolIndex.DRAW]: {
    label: 'Draw',
    icon: PencilIconOutline,
    selectedIcon: PencilIconSolid,
  },
  [ToolIndex.ERASE]: {
    label: 'Erase',
    icon: XCircleIconOutline,
    selectedIcon: XCircleIconSolid,
  },
  [ToolIndex.SELECT]: {
    label: 'Select',
    icon: CubeTransparentIconOutline,
    selectedIcon: CubeTransparentIconSolid,
  },
  [ToolIndex.MOVE]: {
    label: 'Move',
    icon: HandIconOutline,
    selectedIcon: HandIconSolid,
  },
  [ToolIndex.ZOOM_IN]: {
    label: 'Zoom in',
    icon: ZoomInIconOutline,
    selectedIcon: ZoomInIconSolid,
  },
  [ToolIndex.ZOOM_OUT]: {
    label: 'Zoom out',
    icon: ZoomOutIconOutline,
    selectedIcon: ZoomOutIconSolid,
  },
};

export default function DesignerPage(): ReactElement {
  const [selectedColor, setSelectedColor] = useState<ColorIndex>(0);
  const [selectedTool, setSelectedTool] = useState<ToolIndex>(ToolIndex.DRAW);

  return (
    <Layout
      title="Designer"
      hideHeader
      sidebar={
        <div className={cx('bg-gray-900', 'text-gray-200', 'w-80', 'min-w-[20rem]')}>
          <div className={cx('px-4', 'py-3', 'border-b-gray-700', 'border-b')}>
            <h3 className={cx('font-bold')}>Tools</h3>
            <div className={cx('flex', 'flex-wrap', 'justify-between', 'gap-y-3', 'py-4')}>
              {Object.entries(tools).map(([toolIndex, tool]) => (
                <button
                  key={toolIndex}
                  onClick={() => setSelectedTool(toolIndex as ToolIndex)}
                  className={cx(
                    'flex',
                    'flex-col',
                    'items-center',
                    'justify-center',
                    selectedTool === toolIndex
                      ? 'bg-primary-200'
                      : cx('bg-primary', 'hover:bg-primary-light'),
                    'transition-colors',
                    'text-gray-900',
                    'w-[5.5rem]',
                    'h-14',
                    'rounded-md',
                  )}
                >
                  {selectedTool === toolIndex ? (
                    <tool.selectedIcon width={20} />
                  ) : (
                    <tool.icon width={20} />
                  )}

                  <span className={cx('font-bold', 'text-sm')}>{tool.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={cx('px-4', 'py-3', 'border-b-gray-700', 'border-b')}>
            <h3 className={cx('font-bold')}>Colors</h3>
            <div className={cx('flex', 'justify-between', 'py-4')}>
              <div
                className={cx('w-16', 'rounded-md', 'transition-colors')}
                style={{ background: colors[selectedColor].hex }}
              />
              <div className={cx('grid', 'grid-cols-5', 'grid-rows-2', 'gap-x-2', 'gap-y-1')}>
                {Object.entries(colors).map(([colorIndex, color], index) => (
                  <button
                    key={index}
                    className={cx(
                      'w-9',
                      'h-9',
                      'rounded-md',
                      'hover:border-gray-400',
                      'border-2',
                      'border-gray-900',
                    )}
                    style={{ background: color.hex }}
                    onClick={() => {
                      setSelectedColor(parseInt(colorIndex) as ColorIndex);
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div style={{ height: 'calc(100vh - 144px)' }}>
        {/* <ContextMenu items={[]} header="Utilities"> */}
        <Canvas
          onMouseDown={tools[selectedTool].onMouseDown}
          onMouseUp={tools[selectedTool].onMouseUp}
          onMouseMove={tools[selectedTool].onMouseMove}
        />
        {/* </ContextMenu> */}
      </div>
    </Layout>
  );
}
