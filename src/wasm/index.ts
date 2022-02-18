import { Color, Point, Size, Stone } from './structs';
import { log } from './util';

export class Canvas {
  width: u32;
  height: u32;
  offset: Point;
  scale: u32;
  pixels: Array<u8>;

  constructor(width: u32, height: u32) {
    this.width = width;
    this.height = height;
    this.offset = new Point(0, 0);
    this.scale = 10;
    this.pixels = new Array<u8>(this.width * this.height * 4);
  }

  setPixel(x: i32, y: i32, color: Color): void {
    const i: i32 = (this.width * y + x) * 4;
    if (x >= 0 && x < (this.width as i32) && y >= 0 && y < (this.height as i32)) {
      this.pixels[i] = color.r;
      this.pixels[i + 1] = color.g;
      this.pixels[i + 2] = color.b;
      this.pixels[i + 3] = 255;
    }
  }

  setStone(stone: Stone, strokeColor: Color, strokeWidth: u32): void {
    if (stone.erased) return;

    const xLow: i32 = this.offset.x + this.scale * stone.offset.x;
    const xUp: i32 = this.offset.x + this.scale * (stone.offset.x + stone.size.width);
    const yLow: i32 = this.offset.y + this.scale * stone.offset.y;
    const yUp: i32 = this.offset.y + this.scale * (stone.offset.y + stone.size.height);

    for (let x: i32 = xLow; x < xUp; x++) {
      for (let y: i32 = yLow; y < yUp; y++) {
        if (
          x < xLow + strokeWidth ||
          x >= xUp - strokeWidth ||
          y < yLow + strokeWidth ||
          y >= yUp - strokeWidth
        )
          this.setPixel(x, y, strokeColor);
        else this.setPixel(x, y, stone.color);
      }
    }
  }

  clear(): void {
    this.pixels = new Array<u8>(this.width * this.height * 4);
  }
}

export class PixelGridLayer {
  stones: Array<Stone>;

  constructor(width: u32, height: u32) {
    this.stones = new Array<Stone>(width * height);

    const stoneSize = new Size(1, 1);
    for (let x: u32 = 0; x < width; x++) {
      for (let y: u32 = 0; y < height; y++) {
        this.stones[width * y + x] = new Stone(
          new Point(x * stoneSize.width, y * stoneSize.height),
          new Size(stoneSize.width, stoneSize.height),
          // TODO
          new Color(23, 104, 47),
        );
      }
    }
  }
}

// Initialize global state
const layer: PixelGridLayer = new PixelGridLayer(20, 30);
let savedOffset: Point;
let canvas: Canvas;

export function setCanvasSize(width: u32, height: u32): boolean {
  if (canvas.width !== width || canvas.height !== height) {
    canvas = new Canvas(width, height);
    return true;
  }
  return false;
}

export function saveOffset(): void {
  savedOffset = canvas.offset;
}

export function setOffset(x: u32, y: u32, startX: u32, startY: u32): boolean {
  const threshold = 10;
  const newX = ((savedOffset.x - startX) as i32) + x;
  const newY = ((savedOffset.y - startY) as i32) + y;

  if (
    Math.abs((canvas.offset.x - newX) as i32) > threshold ||
    Math.abs((canvas.offset.y - newY) as i32) > threshold
  ) {
    canvas.offset = new Point(newX, newY);
    return true;
  }
  return false;
}

// TODO make better
function setScale(origin: Point, scale: u32): void {
  const factor: f32 = (scale as f32) / (canvas.scale as f32);
  const originOffset = new Point(
    canvas.offset.x - (((origin.x as f32) * factor) as i32),
    canvas.offset.y - (((origin.y as f32) * factor) as i32),
  );

  // log(
  //   `{x: ${canvas.offset.x}, y: ${canvas.offset.y}}, {x: ${origin.x}, y: ${origin.y}} ${factor}, ${originOffset.x}, ${originOffset.y}`,
  // );

  canvas.offset = originOffset;
  canvas.scale = scale;
}

export function zoomIn(x: u32, y: u32): boolean {
  const maxZoom: u32 = 70;
  const origin: Point = new Point(x, y);

  if (canvas.scale < maxZoom) {
    setScale(origin, Math.min(canvas.scale * 1.5, maxZoom) as u32);
    return true;
  }
  return false;
}

export function zoomOut(x: u32, y: u32): boolean {
  const minZoom: u32 = 2;
  const origin: Point = new Point(x, y);

  if (canvas.scale > minZoom) {
    setScale(origin, Math.max(canvas.scale / 1.5, minZoom) as u32);
    return true;
  }
  return false;
}

export function erase(x: u32, y: u32): boolean {
  for (let i = 0; i < layer.stones.length; i++) {
    const stone = layer.stones[i];
    if (
      (x as i32) > canvas.offset.x + stone.offset.x * canvas.scale &&
      (x as i32) < canvas.offset.x + (stone.offset.x + stone.size.width) * canvas.scale &&
      (y as i32) > canvas.offset.y + stone.offset.y * canvas.scale &&
      (y as i32) < canvas.offset.y + (stone.offset.y + stone.size.height) * canvas.scale
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
      (x as i32) > canvas.offset.x + stone.offset.x * canvas.scale &&
      (x as i32) < canvas.offset.x + (stone.offset.x + stone.size.width) * canvas.scale &&
      (y as i32) > canvas.offset.y + stone.offset.y * canvas.scale &&
      (y as i32) < canvas.offset.y + (stone.offset.y + stone.size.height) * canvas.scale
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
