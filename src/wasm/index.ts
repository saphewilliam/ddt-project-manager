import { Canvas, CanvasUpdateInfo } from './canvas';
import { PixelGridLayer } from './layers';
import { Color, Point, Size, Stone } from './structs';
import { err } from './util';

// Initialize global state
const canvas: Canvas = new Canvas(0, 0);
const layer: PixelGridLayer = new PixelGridLayer(50, 200);

const undoStore: Array<Array<Stone>> = new Array<Array<Stone>>();
const redoStore: Array<Array<Stone>> = new Array<Array<Stone>>();
const clipboard: Array<Stone> = new Array<Stone>();
let selection: Array<Stone> = new Array<Stone>();
let originStore: Point = new Point(0, 0);

const minZoom: u32 = 2;
const maxZoom: u32 = 40;

export function canCut(): boolean {
  return selection.length > 0;
}

export function canCopy(): boolean {
  return selection.length > 0;
}

export function canPaste(): boolean {
  return selection.length > 0 && clipboard.length > 0;
}

export function canUndo(): boolean {
  return undoStore.length > 0;
}

export function canRedo(): boolean {
  return redoStore.length > 0;
}

export function saveOrigin(): void {
  originStore = canvas.origin;
}

export function saveUndo(): void {
  const maxUndoLength = 20;

  if (undoStore.length === maxUndoLength) undoStore.shift();
  undoStore.push(layer.getStones());
  redoStore.length = 0;
}

/** Returns the string representation of the design */
export function save(): string {
  return layer.stones.map<string>((stone) => stone.toString()).join(';');
}

/** Takes a string representation of a design and loads it to the canvas. If false is returned, the input is not valid */
export function load(input: string): boolean {
  return true;
}

export function reload(): Array<u32> {
  return canvas.clearSetStones(layer.stones).toArray();
}

export function setCanvasSize(width: u32, height: u32): Array<u32> {
  if (canvas.size.width !== width || canvas.size.height !== height) {
    canvas.size = new Size(width, height);
    return canvas.setStones(layer.stones).toArray();
  }
  return new CanvasUpdateInfo().toArray();
}

export function setStrokeWidth(width: number): Array<u32> {
  if (width > 0 && canvas.strokeWidth !== width) {
    canvas.strokeWidth = width as u32;
    return canvas.setStones(layer.stones).toArray();
  }
  return new CanvasUpdateInfo().toArray();
}

function colorFromHex(hex: string): Color | null {
  const allowedCharacters = '1234567890aAbBcCdDeEfF';
  if (hex.length !== 7) return null;
  for (let i = 1; i < 8; i++) if (!allowedCharacters.includes(hex.charAt(i))) return null;

  const int = parseInt(hex.slice(1), 16) as i32;
  const r = ((int >> 16) & 255) as u8;
  const g = ((int >> 8) & 255) as u8;
  const b = (int & 255) as u8;
  return new Color(r, g, b);
}

export function setStrokeColor(hex: string): Array<u32> {
  const color = colorFromHex(hex);
  if (color !== null && canvas.strokeColor.color !== color.color) {
    canvas.strokeColor = color;
    return canvas.setStones(layer.stones).toArray();
  }
  return new CanvasUpdateInfo().toArray();
}

export function setSelectedStrokeColor(hex: string): Array<u32> {
  const color = colorFromHex(hex);
  if (color !== null && canvas.selectedStrokeColor.color !== color.color) {
    canvas.selectedStrokeColor = color;
    return canvas.setStones(layer.stones).toArray();
  }
  return new CanvasUpdateInfo().toArray();
}

export function clearSelection(): Array<u32> {
  if (selection.length === 0) return new CanvasUpdateInfo().toArray();
  for (let i = 0; i < selection.length; i++) selection[i].selected = false;
  selection.length = 0;
  return canvas.clearSetStones(layer.stones).toArray();
}

export function fillSelection(r: u8, g: u8, b: u8): Array<u32> {
  let shouldUpdate = false;

  for (let i = 0; i < selection.length; i++) {
    const stone = selection[i];
    if (stone.erased || stone.color.color !== new Color(r, g, b).color) {
      stone.color = new Color(r, g, b);
      stone.erased = false;
      shouldUpdate = true;
    }
  }

  if (shouldUpdate) return canvas.clearSetStones(layer.stones).toArray();
  else return new CanvasUpdateInfo().toArray();
}

export function selectAllOfColor(r: u8, g: u8, b: u8): Array<u32> {
  clearSelection();

  for (let i = 0; i < layer.stones.length; i++) {
    const stone = layer.stones[i];
    if (!stone.erased && stone.color.color === new Color(r, g, b).color) {
      stone.selected = true;
      selection.push(stone);
    }
  }

  return canvas.clearSetStones(layer.stones).toArray();
}

export function selectAll(): Array<u32> {
  clearSelection();

  for (let i = 0; i < layer.stones.length; i++) {
    const stone = layer.stones[i];
    stone.selected = true;
    selection.push(stone);
  }

  return canvas.clearSetStones(layer.stones).toArray();
}

export function select(x1: u32, y1: u32, x2: u32, y2: u32): Array<u32> {
  let shouldUpdate = false;
  const newSelection = new Array<Stone>();

  for (let i = 0; i < layer.stones.length; i++) {
    const stone = layer.stones[i];
    if (canvas.stoneIsInBounds(stone, x1, y1, x2, y2)) {
      if (!stone.selected) {
        stone.selected = true;
        shouldUpdate = true;
      }
      newSelection.push(stone);
    } else if (stone.selected) {
      stone.selected = false;
      shouldUpdate = true;
    }
  }

  if (!shouldUpdate) return new CanvasUpdateInfo().toArray();
  else {
    selection = newSelection;
    return canvas.clearSetStones(layer.stones).toArray();
  }
}

export function cut(): Array<u32> {
  if (selection.length > 0) {
    clipboard.length = 0;
    for (let i = 0; i < selection.length; i++) {
      selection[i].selected = false;
      clipboard.push(selection[i].clone());
      selection[i].erased = true;
    }
    selection.length = 0;
    return canvas.clearSetStones(layer.stones).toArray();
  }
  return new CanvasUpdateInfo().toArray();
}

export function copy(): Array<u32> {
  if (selection.length > 0) {
    clipboard.length = 0;
    for (let i = 0; i < selection.length; i++) {
      selection[i].selected = false;
      clipboard.push(selection[i].clone());
    }
    selection.length = 0;
    return canvas.clearSetStones(layer.stones).toArray();
  }
  return new CanvasUpdateInfo().toArray();
}

export function paste(): Array<u32> {
  if (selection.length > 0 && clipboard.length > 0) {
    // TODO account for non-rectangle selections?
    // Match top-right domino of clipboard with top-right domino of selection
    let selectionTopRight: Stone = selection[0];
    for (let i = 1; i < selection.length; i++) {
      const stone = selection[i];
      if (
        stone.origin.x <= selectionTopRight.origin.x &&
        stone.origin.y <= selectionTopRight.origin.y
      )
        selectionTopRight = stone;
    }

    let clipboardTopRight: Stone = clipboard[0];
    for (let i = 1; i < clipboard.length; i++) {
      const stone = clipboard[i];
      if (
        stone.origin.x <= clipboardTopRight.origin.x &&
        stone.origin.y <= clipboardTopRight.origin.y
      )
        clipboardTopRight = stone;
    }

    if (selectionTopRight.type !== clipboardTopRight.type) {
      err(
        `Cannot paste here: selection top right stone type (${selectionTopRight.type}) must match clipboard top right stone type (${clipboardTopRight.type})`,
      );
      return new CanvasUpdateInfo().toArray();
    }

    const delta = new Point(
      selectionTopRight.origin.x - clipboardTopRight.origin.x,
      selectionTopRight.origin.y - clipboardTopRight.origin.y,
    );

    // Paste clipboard content
    for (let i = 0; i < clipboard.length; i++) {
      const stone = clipboard[i];
      if (!stone.erased) {
        for (let j = 0; j < layer.stones.length; j++) {
          const layerStone = layer.stones[j];
          if (
            layerStone.origin.x === stone.origin.x + delta.x &&
            layerStone.origin.y === stone.origin.y + delta.y
          ) {
            layerStone.color = stone.color;
            layerStone.erased = false;
            break;
          }
        }
      }
    }

    return clearSelection();
  }
  return new CanvasUpdateInfo().toArray();
}

export function undo(): Array<u32> {
  if (undoStore.length > 0) {
    redoStore.push(layer.getStones());
    layer.stones = undoStore.pop();
    return canvas.clearSetStones(layer.stones).toArray();
  }
  return new CanvasUpdateInfo().toArray();
}

export function redo(): Array<u32> {
  if (redoStore.length > 0) {
    undoStore.push(layer.getStones());
    layer.stones = redoStore.pop();
    return canvas.clearSetStones(layer.stones).toArray();
  }
  return new CanvasUpdateInfo().toArray();
}

export function setOrigin(x: u32, y: u32, startX: u32, startY: u32): Array<u32> {
  const threshold = 5;
  const newX = ((originStore.x - startX) as i32) + x;
  const newY = ((originStore.y - startY) as i32) + y;

  if (
    Math.abs((canvas.origin.x - newX) as i32) > threshold ||
    Math.abs((canvas.origin.y - newY) as i32) > threshold
  ) {
    canvas.origin = new Point(newX, newY);
    return canvas.clearSetStones(layer.stones).toArray();
  }
  return new CanvasUpdateInfo().toArray();
}

export function zoomIn(x: u32, y: u32): Array<u32> {
  if (canvas.scale < maxZoom) {
    canvas.setScale(x, y, 1.5);
    return canvas.clearSetStones(layer.stones).toArray();
  }
  return new CanvasUpdateInfo().toArray();
}

export function zoomOut(x: u32, y: u32): Array<u32> {
  if (canvas.scale > minZoom) {
    canvas.setScale(x, y, 1 / 1.5);
    return canvas.clearSetStones(layer.stones).toArray();
  }
  return new CanvasUpdateInfo().toArray();
}

export function erase(x: u32, y: u32): Array<u32> {
  for (let i = 0; i < layer.stones.length; i++) {
    const stone = layer.stones[i];
    if (canvas.stoneIsInBounds(stone, x, y, x, y)) {
      if (!stone.erased) {
        stone.erased = true;
        return canvas.setStone(stone).toArray();
      }
      return new CanvasUpdateInfo().toArray();
    }
  }
  return new CanvasUpdateInfo().toArray();
}

export function draw(x: u32, y: u32, r: u8, g: u8, b: u8): Array<u32> {
  for (let i = 0; i < layer.stones.length; i++) {
    const stone = layer.stones[i];
    if (canvas.stoneIsInBounds(stone, x, y, x, y)) {
      if (stone.erased || stone.color.color !== new Color(r, g, b).color) {
        stone.color = new Color(r, g, b);
        stone.erased = false;
        return canvas.setStone(stone).toArray();
      }
      return new CanvasUpdateInfo().toArray();
    }
  }
  return new CanvasUpdateInfo().toArray();
}
