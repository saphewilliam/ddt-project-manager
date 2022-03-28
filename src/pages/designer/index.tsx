import {
  ClipboardIcon,
  FastForwardIcon,
  RewindIcon,
  ScissorsIcon,
  ClipboardCopyIcon,
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
import React, { ReactElement, SVGProps, useCallback, useState } from 'react';
import Canvas, { Props as CanvasProps, CanvasUpdateInfo } from '@components/Designer/Canvas';
import ContextMenu, { MenuItem, MenuItemKind } from '@components/Designer/ContextMenu';
import DesignerSideBar from '@components/Designer/DesignerSideBar';
import Layout from '@components/Layout';
import useWasm from '@hooks/useWasm';

export type ColorIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface Color {
  name: string;
  r: number;
  g: number;
  b: number;
}

export const colors: Color[] = [
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

export enum ToolIndex {
  DRAW = 'DRAW',
  ERASE = 'ERASE',
  SELECT = 'SELECT',
  MOVE = 'MOVE',
  ZOOM_IN = 'ZOOM_IN',
  ZOOM_OUT = 'ZOOM_OUT',
}

// TODO?
// interface Tool {
//   shortCut: string;
//   mouseWheel?: () => void;
//   keyPressed?: () => void;
//   enterTool?: () => void;
//   leaveTool?: () => void;
// }

export interface Tool {
  label: string;
  description: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
  selectedIcon: (props: SVGProps<SVGSVGElement>) => ReactElement;

  onMouseDown?: CanvasProps['onMouseDown'];
  onMouseUp?: CanvasProps['onMouseUp'];
  onMouseMove?: CanvasProps['onMouseMove'];
}

export default function DesignerPage(): ReactElement {
  const [selectedTool, setSelectedTool] = useState<ToolIndex>(ToolIndex.DRAW);
  const [selectedColor, setSelectedColor] = useState<ColorIndex>(0);
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
      description: 'Click and drag your mouse to color dominoes in the selected color',
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
      description: 'Click and drag your mouse to remove dominoes from the design',
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
      description: 'Click and drag your mouse to select dominoes in a square',
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
      description: 'Click and drag your mouse to move around on the canvas',
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
      description: 'Click on the canvas to zoom in on that position',
      icon: ZoomInIconOutline,
      selectedIcon: ZoomInIconSolid,
      onMouseDown(point) {
        return instance?.exports.zoomIn(point.x, point.y);
      },
    },
    [ToolIndex.ZOOM_OUT]: {
      label: 'Zoom out',
      description: 'Click on the canvas to zoom out from that position',
      icon: ZoomOutIconOutline,
      selectedIcon: ZoomOutIconSolid,
      onMouseDown(point) {
        return instance?.exports.zoomOut(point.x, point.y);
      },
    },
  };

  const contextMenuItems: MenuItem[] = [
    {
      kind: MenuItemKind.EXECUTE,
      label: 'Cut',
      icon: ScissorsIcon,
      shortcut: 'Ctrl + X',
      // TODO
      // disabled: selection.length === 0,
      onClick() {
        // TODO only save if canvas updated (if selection.length > 0)
        instance?.exports.saveUndo();
        return instance?.exports.cut();
      },
    },
    {
      kind: MenuItemKind.EXECUTE,
      label: 'Copy',
      icon: ClipboardCopyIcon,
      shortcut: 'Ctrl + C',
      // TODO
      // disabled: selection.length === 0,
      disabled: true,
      onClick() {
        return instance?.exports.copy();
      },
    },
    {
      kind: MenuItemKind.EXECUTE,
      label: 'Paste',
      icon: ClipboardIcon,
      shortcut: 'Ctrl + V',
      // TODO
      // disabled: selection.length === 0 || clipboard.length === 0,
      onClick() {
        // TODO only save if canvas updated (if clipboard.length > 0 && entire clipboard fits within canvas)
        instance?.exports.saveUndo();
        return instance?.exports.paste();
      },
    },
    {
      kind: MenuItemKind.DIVIDE,
    },
    {
      kind: MenuItemKind.EXECUTE,
      label: 'Undo',
      // TODO
      // disabled: undoStore.length === 0,
      icon: RewindIcon,
      shortcut: 'Ctrl + Z',
      onClick() {
        return instance?.exports.undo();
      },
    },
    {
      kind: MenuItemKind.EXECUTE,
      label: 'Redo',
      // TODO
      // disabled: redoStore.length === 0,
      icon: FastForwardIcon,
      shortcut: 'Ctrl + Shift + Z',
      onClick() {
        return instance?.exports.redo();
      },
    },
    {
      kind: MenuItemKind.DIVIDE,
    },
    {
      kind: MenuItemKind.SUB,
      label: 'Actions',
      items: [
        {
          kind: MenuItemKind.EXECUTE,
          label: 'Select all cells of color',
          onClick: () => {
            // TODO
            // const s: Point[] = [];
            // props.grid.forEach((gridRow) => {
            //   gridRow.forEach((cell) => {
            //     if (cell.colorId === colorId) s.push({ x: cell.x, y: cell.y });
            //   });
            // });
            // setSelection(s);
          },
        },
        {
          kind: MenuItemKind.EXECUTE,
          label: 'Color all cells in selection',
          onClick: () => {
            // TODO
            // saveUndo();
            // const g: Grid = deepClone(props.grid);
            // selection.forEach((cell) => (g[cell.x][cell.y].colorId = colorId));
            // props.setGrid(g);
          },
        },
      ],
    },
  ];

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
        <DesignerSideBar
          tools={tools}
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
          palette={palette}
          setPalette={setPalette}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      }
    >
      <ContextMenu items={contextMenuItems}>
        <div style={{ height: 'calc(100vh - 144px)' }}>
          <Canvas
            onMouseDown={tools[selectedTool].onMouseDown}
            onMouseUp={tools[selectedTool].onMouseUp}
            onMouseMove={tools[selectedTool].onMouseMove}
            onKeyDown={handleKeyDown}
          />
        </div>
      </ContextMenu>
    </Layout>
  );
}
