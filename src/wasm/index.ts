import { Canvas } from './canvas';
import { PixelGridLayer, WallLayer } from './layers';
import { Color, Point, Stone } from './structs';

// Initialize global state
const canvas: Canvas = new Canvas(0, 0);
// const layer: PixelGridLayer = new PixelGridLayer(20, 30);
const layer: WallLayer = new WallLayer(20, 30);

const undoStore: Array<Array<Stone>> = new Array<Array<Stone>>();
const redoStore: Array<Array<Stone>> = new Array<Array<Stone>>();
const clipboard: Array<Stone> = new Array<Stone>();
let originStore: Point = new Point(0, 0);
let selection: Array<Stone> = new Array<Stone>();

export function saveOrigin(): void {
  originStore = canvas.origin;
}

export function saveUndo(): void {
  const maxUndoLength = 20;

  if (undoStore.length === maxUndoLength) undoStore.shift();
  undoStore.push(layer.getStones());
  redoStore.length = 0;
}

export function setCanvasSize(width: u32, height: u32): boolean {
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}

/** Checks if a stone is in bounds of a canvas (x1, y1), (x2, y2) area */
function isInBounds(stone: Stone, x1: u32, y1: u32, x2: u32, y2: u32): boolean {
  return (
    (Math.max(x1, x2) as i32) > canvas.origin.x + stone.origin.x * canvas.scale &&
    (Math.min(x1, x2) as i32) <
      canvas.origin.x + (stone.origin.x + stone.size.width) * canvas.scale &&
    (Math.max(y1, y2) as i32) > canvas.origin.y + stone.origin.y * canvas.scale &&
    (Math.min(y1, y2) as i32) <
      canvas.origin.y + (stone.origin.y + stone.size.height) * canvas.scale
  );
}

export function clearSelection(): boolean {
  if (selection.length === 0) return false;
  for (let i = 0; i < selection.length; i++) {
    selection[i].selected = false;
  }
  selection.length = 0;
  return true;
}

export function select(x1: u32, y1: u32, x2: u32, y2: u32): boolean {
  let shouldUpdate = false;
  const newSelection = new Array<Stone>();

  for (let i = 0; i < layer.stones.length; i++) {
    const stone = layer.stones[i];
    if (isInBounds(stone, x1, y1, x2, y2)) {
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

  selection = newSelection;
  return shouldUpdate;
}

export function cut(): boolean {
  if (selection.length > 0) {
    for (let i = 0; i < selection.length; i++) selection[i].erased = true;
    return true;
  }
  return false;
}

export function copy(): boolean {
  if (selection.length > 0) {
    // TODO
  }
  return false;
}

export function paste(x: u32, y: u32): boolean {
  if (selection.length > 0 && clipboard.length > 0) {
    // TODO
  }
  return false;
}

export function undo(): boolean {
  if (undoStore.length > 0) {
    redoStore.push(layer.getStones());
    layer.stones = undoStore.pop();
    return true;
  }
  return false;
}

export function redo(): boolean {
  if (redoStore.length > 0) {
    undoStore.push(layer.getStones());
    layer.stones = redoStore.pop();
    return true;
  }
  return false;
}

export function setOrigin(x: u32, y: u32, startX: u32, startY: u32): boolean {
  const threshold = 10;
  const newX = ((originStore.x - startX) as i32) + x;
  const newY = ((originStore.y - startY) as i32) + y;

  if (
    Math.abs((canvas.origin.x - newX) as i32) > threshold ||
    Math.abs((canvas.origin.y - newY) as i32) > threshold
  ) {
    canvas.origin = new Point(newX, newY);
    return true;
  }
  return false;
}

function setScale(origin: Point, scaleBy: f32): void {
  canvas.scale = ((canvas.scale as f32) * scaleBy) as u32;
  canvas.origin.x = origin.x - ((((origin.x - canvas.origin.x) as f32) * scaleBy) as i32);
  canvas.origin.y = origin.y - ((((origin.y - canvas.origin.y) as f32) * scaleBy) as i32);
}

export function zoomIn(x: u32, y: u32): boolean {
  const maxZoom: u32 = 40;
  const origin: Point = new Point(x, y);

  if (canvas.scale < maxZoom) {
    setScale(origin, 1.5);
    return true;
  }
  return false;
}

export function zoomOut(x: u32, y: u32): boolean {
  const minZoom: u32 = 2;
  const origin: Point = new Point(x, y);

  if (canvas.scale > minZoom) {
    setScale(origin, 1 / 1.5);
    return true;
  }
  return false;
}

export function erase(x: u32, y: u32): boolean {
  for (let i = 0; i < layer.stones.length; i++) {
    const stone = layer.stones[i];
    if (isInBounds(stone, x, y, x, y)) {
      if (!stone.erased) {
        stone.erased = true;
        return true;
      }
      return false;
    }
  }
  return false;
}

export function draw(x: u32, y: u32, r: u8, g: u8, b: u8): boolean {
  for (let i = 0; i < layer.stones.length; i++) {
    const stone = layer.stones[i];
    if (isInBounds(stone, x, y, x, y)) {
      if (stone.erased || stone.color.r !== r || stone.color.g !== g || stone.color.b !== b) {
        stone.color = new Color(r, g, b);
        stone.erased = false;
        return true;
      }
      return false;
    }
  }
  return false;
}

export function updatePixelGrid(): Array<u8> {
  const strokeWidth: u32 = 1;
  const strokeColor: Color = new Color(0, 0, 0);
  const selectedStrokeColor: Color = new Color(255, 0, 0);

  canvas.clear();

  for (let i = 0; i < layer.stones.length; i++)
    canvas.setStone(layer.stones[i], strokeColor, selectedStrokeColor, strokeWidth);

  return canvas.pixels;
}

// export function drawL2(width: u32, height: u32, r: u8, g: u8, b: u8): Array<u8> {
//   const color: Color = new Color(r, g, b);
//   const stone: Point = new Point(0, 0);
//   const stoneSize: Size = new Size(2, 6);
//   const stoneGap: Size = new Size(4, 1); // L2

//   const strokeWidth: u32 = 0;
//   const strokeColor: Color = new Color(0, 0, 0);

//   const canvas: Canvas = new Canvas(width, height);

//   while (stone.x < width) {
//     while (stone.y < height) {
//       for (let x: u32 = stone.x; x < stone.x + stoneSize.width && x < width; x++) {
//         for (let y: u32 = stone.y; y < stone.y + stoneSize.height && y < height; y++) {
//           if (
//             y < stone.y + strokeWidth ||
//             y >= stone.y + stoneSize.height - strokeWidth ||
//             x < stone.x + strokeWidth ||
//             x >= stone.x + stoneSize.width - strokeWidth
//           )
//             canvas.setPixel(x, y, strokeColor);
//           else canvas.setPixel(x, y, color);
//         }
//       }

//       stone.y += stoneSize.height + stoneGap.height;
//     }
//     stone.x += stoneSize.width + stoneGap.width;
//     stone.y = 0;
//   }

//   return canvas.pixels;
// }
