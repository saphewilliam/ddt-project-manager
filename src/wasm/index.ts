import { Canvas } from './canvas';
import { PixelGridLayer } from './layers';
import { Color, Point, Stone } from './structs';

// Initialize global state
const canvas: Canvas = new Canvas(0, 0);
const layer: PixelGridLayer = new PixelGridLayer(20, 30);
// const layer: WallLayer = new WallLayer(20, 30);

const undoStore: Array<Array<Stone>> = new Array<Array<Stone>>();
const redoStore: Array<Array<Stone>> = new Array<Array<Stone>>();
const originStore: Point = new Point(0, 0);

export function setCanvasSize(width: u32, height: u32): boolean {
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}

export function saveUndo(): void {
  const maxUndoLength = 20;

  if (undoStore.length === maxUndoLength) undoStore.shift();
  undoStore.push(layer.getStones());
  redoStore.length = 0;
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

export function saveOrigin(): void {
  originStore.x = canvas.origin.x;
  originStore.y = canvas.origin.y;
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
    if (
      (x as i32) > canvas.origin.x + stone.origin.x * canvas.scale &&
      (x as i32) < canvas.origin.x + (stone.origin.x + stone.size.width) * canvas.scale &&
      (y as i32) > canvas.origin.y + stone.origin.y * canvas.scale &&
      (y as i32) < canvas.origin.y + (stone.origin.y + stone.size.height) * canvas.scale
    ) {
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
    if (
      (x as i32) > canvas.origin.x + stone.origin.x * canvas.scale &&
      (x as i32) < canvas.origin.x + (stone.origin.x + stone.size.width) * canvas.scale &&
      (y as i32) > canvas.origin.y + stone.origin.y * canvas.scale &&
      (y as i32) < canvas.origin.y + (stone.origin.y + stone.size.height) * canvas.scale
    ) {
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

  canvas.clear();

  for (let i = 0; i < layer.stones.length; i++)
    canvas.setStone(layer.stones[i], strokeColor, strokeWidth);

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
