import { Color, Point, Size, Stone } from './structs';

export class Canvas {
  width: u32;
  height: u32;
  origin: Point;
  scale: u32;
  pixels: Array<u8>;

  constructor(width: u32, height: u32) {
    this.width = width;
    this.height = height;
    this.origin = new Point(0, 0);
    this.scale = 5;
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

    const xLow: i32 = this.origin.x + this.scale * stone.origin.x;
    const xUp: i32 = this.origin.x + this.scale * (stone.origin.x + stone.size.width);
    const yLow: i32 = this.origin.y + this.scale * stone.origin.y;
    const yUp: i32 = this.origin.y + this.scale * (stone.origin.y + stone.size.height);

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

    const stoneSize = new Size(3, 3);
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

// 4.8 cm hoog = 6
// 2.4 cm breed = 3
// 0.8 cm diep = 1

export class WallLayer {
  stones: Array<Stone>;

  constructor(width: u32, height: u32) {
    this.stones = new Array<Stone>(width);

    const initColor = new Color(23, 104, 47);
    for (let y: u32 = 0; y < height; y++) {
      for (let x: u32 = 0; x < width; x++) {
        if (y % 2 === 0)
          this.stones[width * y + x] = new Stone(
            new Point(x * 5, y * 3),
            new Size(1, 3),
            initColor,
          );
        else if (y % 2 === 1)
          this.stones[width * y + x] = new Stone(
            new Point(x * 5, y * 3),
            new Size(6, 3),
            initColor,
          );
      }
    }
  }
}

// Initialize global state
const layer: PixelGridLayer = new PixelGridLayer(20, 30);
// const layer: WallLayer = new WallLayer(20, 30);

let savedOrigin: Point;
let canvas: Canvas;

export function setCanvasSize(width: u32, height: u32): boolean {
  if (canvas.width !== width || canvas.height !== height) {
    canvas = new Canvas(width, height);
    return true;
  }
  return false;
}

export function saveOrigin(): void {
  savedOrigin = canvas.origin;
}

export function setOrigin(x: u32, y: u32, startX: u32, startY: u32): boolean {
  const threshold = 10;
  const newX = ((savedOrigin.x - startX) as i32) + x;
  const newY = ((savedOrigin.y - startY) as i32) + y;

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
