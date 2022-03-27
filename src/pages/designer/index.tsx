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
import React, { ReactElement, SVGProps, useCallback, useState } from 'react';
import Canvas, { Props as CanvasProps, CanvasUpdateInfo } from '@components/Designer/Canvas';
import SideBarSection from '@components/Designer/SideBarSection';
import Layout from '@components/Layout';
import Modal from '@components/Modal';
import useWasm from '@hooks/useWasm';
import { fontColorFromBackgroundRgb } from '@lib/stoneListHelpers';

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
  r: number;
  g: number;
  b: number;
}

const colors: Color[] = [
  { name: 'Bordeaux', r: 154, g: 0, b: 0 },
  { name: 'Red', r: 255, g: 0, b: 0 },
  { name: 'Orange', r: 233, g: 98, b: 29 },
  { name: 'Light orange', r: 255, g: 142, b: 1 },
  { name: 'Corn', r: 251, g: 216, b: 0 },
  { name: 'Yellow', r: 255, g: 255, b: 0 },
  { name: 'Grass', r: 96, g: 196, b: 41 },
  { name: 'Neon green', r: 18, g: 246, b: 45 },
  { name: 'Green', r: 8, g: 122, b: 30 },
  { name: 'Dark green', r: 6, g: 86, b: 21 },
  { name: 'Mint', r: 89, g: 217, b: 182 },
  { name: 'Turquoise', r: 34, g: 220, b: 169 },
  { name: 'Light blue', r: 51, g: 171, b: 242 },
  { name: 'Blue', r: 0, g: 41, b: 122 },
  { name: 'Dark violet', r: 60, g: 31, b: 30 },
  { name: 'Purple', r: 96, g: 47, b: 149 },
  { name: 'Lilac', r: 204, g: 0, b: 204 },
  { name: 'Neon pink', r: 255, g: 51, b: 153 },
  { name: 'Pink', r: 255, g: 153, b: 204 },
  { name: 'Dark pink', r: 214, g: 77, b: 70 },
  { name: 'Salmon', r: 222, g: 113, b: 108 },
  { name: 'Ivory', r: 255, g: 234, b: 183 },
  { name: 'White gold', r: 207, g: 202, b: 169 },
  { name: 'Brown', r: 82, g: 42, b: 15 },
  { name: 'Light brown', r: 91, g: 69, b: 56 },
  { name: 'Gold', r: 83, g: 66, b: 33 },
  { name: 'Ocher yellow', r: 151, g: 112, b: 51 },
  { name: 'Light gray', r: 200, g: 200, b: 200 },
  { name: 'Gray', r: 166, g: 166, b: 166 },
  { name: 'Dark gray', r: 64, g: 64, b: 64 },
  { name: 'Black', r: 0, g: 0, b: 0 },
  { name: 'White', r: 255, g: 255, b: 255 },
  { name: 'Transparent', r: 217, g: 217, b: 217 },
];

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

  onMouseDown?: CanvasProps['onMouseDown'];
  onMouseUp?: CanvasProps['onMouseUp'];
  onMouseMove?: CanvasProps['onMouseMove'];
}

export default function DesignerPage(): ReactElement {
  const [selectedColor, setSelectedColor] = useState<ColorIndex>(0);
  const [selectedTool, setSelectedTool] = useState<ToolIndex>(ToolIndex.DRAW);
  const [showColorsModal, setShowColorsModal] = useState(false);
  const [palette, setPalette] = useState<{ [P in ColorIndex]: Color }>({
    [0]: colors[30]!,
    [1]: colors[31]!,
    [2]: colors[0]!,
    [3]: colors[1]!,
    [4]: colors[2]!,
    [5]: colors[5]!,
    [6]: colors[8]!,
    [7]: colors[12]!,
    [8]: colors[13]!,
    [9]: colors[16]!,
  });

  const { instance, loaded, error } = useWasm();

  const tools: { [P in keyof typeof ToolIndex]: Tool } = {
    [ToolIndex.DRAW]: {
      label: 'Draw',
      icon: PencilIconOutline,
      selectedIcon: PencilIconSolid,
      onMouseDown(point) {
        // TODO only save if canvas updated (check on mouse up)
        instance?.exports.saveUndo();
        return instance?.exports.draw(
          point.x,
          point.y,
          palette[selectedColor].r,
          palette[selectedColor].g,
          palette[selectedColor].b,
        );
      },
      onMouseMove(point, mouseDownStart) {
        if (mouseDownStart)
          return instance?.exports.draw(
            point.x,
            point.y,
            palette[selectedColor].r,
            palette[selectedColor].g,
            palette[selectedColor].b,
          );
        return [0];
      },
    },
    [ToolIndex.ERASE]: {
      label: 'Erase',
      icon: XCircleIconOutline,
      selectedIcon: XCircleIconSolid,
      onMouseDown(point) {
        // TODO only save if canvas updated (check on mouse up)
        instance?.exports.saveUndo();
        return instance?.exports.erase(point.x, point.y);
      },
      onMouseMove(point, mouseDownStart) {
        if (mouseDownStart) return instance?.exports.erase(point.x, point.y);
        return [0];
      },
    },
    [ToolIndex.SELECT]: {
      label: 'Select',
      icon: CubeTransparentIconOutline,
      selectedIcon: CubeTransparentIconSolid,
      onMouseDown() {
        // TODO only save if canvas updated (check on mouse up)
        instance?.exports.saveUndo();
        return instance?.exports.clearSelection();
      },
      onMouseMove(point, mouseDownStart) {
        if (mouseDownStart)
          return instance?.exports.select(mouseDownStart.x, mouseDownStart.y, point.x, point.y);
        return [0];
      },
    },
    [ToolIndex.MOVE]: {
      label: 'Move',
      icon: HandIconOutline,
      selectedIcon: HandIconSolid,
      onMouseDown() {
        instance?.exports.saveOrigin();
        return [0];
      },
      onMouseMove(point, mouseDownStart) {
        if (mouseDownStart)
          return instance?.exports.setOrigin(point.x, point.y, mouseDownStart.x, mouseDownStart.y);
        return [0];
      },
    },
    [ToolIndex.ZOOM_IN]: {
      label: 'Zoom in',
      icon: ZoomInIconOutline,
      selectedIcon: ZoomInIconSolid,
      onMouseDown(point) {
        return instance?.exports.zoomIn(point.x, point.y);
      },
    },
    [ToolIndex.ZOOM_OUT]: {
      label: 'Zoom out',
      icon: ZoomOutIconOutline,
      selectedIcon: ZoomOutIconSolid,
      onMouseDown(point) {
        return instance?.exports.zoomOut(point.x, point.y);
      },
    },
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent): CanvasUpdateInfo => {
      if (!loaded) return [0];
      if (error) {
        console.error(error);
        return [0];
      }

      if (e.repeat) return [0];

      switch (e.key.toLowerCase()) {
        case 'x':
          if (e.ctrlKey) {
            // TODO only save if canvas updated (if selection.length > 0)
            instance?.exports.saveUndo();
            return instance?.exports.cut();
          }
          break;
        case 'c':
          if (e.ctrlKey) return instance?.exports.copy();
          break;
        case 'v':
          if (e.ctrlKey) {
            // TODO only save if canvas updated (if clipboard.length > 0 && entire clipboard fits within canvas)
            instance?.exports.saveUndo();
            return instance?.exports.paste();
          }
          break;
        case 'z':
          if (e.ctrlKey && !e.shiftKey) return instance?.exports.undo();
          if (e.ctrlKey && e.shiftKey) return instance?.exports.redo();
          break;
      }

      return [0];
    },
    [instance, loaded, error],
  );

  return (
    <Layout
      title="Designer"
      hideHeader
      sidebar={
        <div className={cx('bg-gray-900', 'text-gray-200', 'w-80', 'min-w-[20rem]')}>
          <SideBarSection title="Options">
            <div>
              <p>TODO</p>
              <ul>
                <li>Design size</li>
                <li>Stroke width, color</li>
                <li>Canvas background color</li>
              </ul>
            </div>
          </SideBarSection>

          <SideBarSection title="Tools" className={cx('flex-wrap')}>
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
          </SideBarSection>

          <SideBarSection title="Colors" moreButtonOnClick={() => setShowColorsModal(true)}>
            <div
              className={cx('w-16', 'rounded-md', 'transition-colors')}
              style={{
                background: `rgb(${palette[selectedColor].r}, ${palette[selectedColor].g}, ${palette[selectedColor].b})`,
              }}
            />
            <div className={cx('grid', 'grid-cols-5', 'grid-rows-2', 'gap-x-2', 'gap-y-1')}>
              {Object.entries(palette).map(([colorIndex, color], index) => (
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
                  style={{ background: `rgb(${color.r}, ${color.g}, ${color.b})` }}
                  onClick={() => {
                    setSelectedColor(parseInt(colorIndex) as ColorIndex);
                  }}
                />
              ))}
            </div>
          </SideBarSection>

          <SideBarSection title="Layers">TODO layers</SideBarSection>
        </div>
      }
    >
      <Modal
        show={showColorsModal}
        setShow={setShowColorsModal}
        title="Color Palette"
        body={
          <div className={cx('space-y-2')}>
            {Object.values(palette).map((color, i) => (
              <div className={cx('flex', 'space-x-3', 'items-center')} key={i}>
                <div
                  className={cx('border', 'border-gray-300', 'rounded-md', 'w-7', 'h-7')}
                  style={{ background: `rgb(${color.r}, ${color.g}, ${color.b})` }}
                />
                <select
                  value={color.name}
                  className={cx('flex-grow', 'py-1')}
                  name={`colorPicker${i}`}
                  id={`colorPicker${i}`}
                  onChange={(e) =>
                    setPalette({ ...palette, [i]: colors.find((c) => c.name === e.target.value) })
                  }
                >
                  {colors.map((colorOption, j) => (
                    <option
                      key={j}
                      value={colorOption.name}
                      style={{
                        background: `rgb(${colorOption.r}, ${colorOption.g}, ${colorOption.b})`,
                        color: fontColorFromBackgroundRgb(
                          colorOption.r,
                          colorOption.g,
                          colorOption.b,
                        ),
                      }}
                    >
                      {colorOption.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        }
      />
      <div style={{ height: 'calc(100vh - 144px)' }}>
        {/* <ContextMenu items={[]} header="Utilities"> */}
        <Canvas
          onMouseDown={tools[selectedTool].onMouseDown}
          onMouseUp={tools[selectedTool].onMouseUp}
          onMouseMove={tools[selectedTool].onMouseMove}
          onKeyDown={handleKeyDown}
        />
        {/* </ContextMenu> */}
      </div>
    </Layout>
  );
}
