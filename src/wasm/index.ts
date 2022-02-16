import { Color, Point, Size, Stone } from './structs';

export class Canvas {
  pixels: Array<u8>;
  width: u32;
  height: u32;

  constructor(width: u32, height: u32) {
    this.width = width;
    this.height = height;
    this.pixels = new Array<u8>(this.width * this.height * 4);
  }

  setPixel(x: u32, y: u32, color: Color): void {
    const i: u32 = (this.width * y + x) * 4;
    this.pixels[i] = color.r;
    this.pixels[i + 1] = color.g;
    this.pixels[i + 2] = color.b;
    this.pixels[i + 3] = 255;
  }

  setStone(stone: Stone, strokeColor: Color, strokeWidth: u32): void {
    const xLow: u32 = stone.offset.x;
    const xUp: u32 = stone.offset.x + stone.size.width;
    const yLow: u32 = stone.offset.y;
    const yUp: u32 = stone.offset.y + stone.size.height;

    for (let x: u32 = xLow; x < xUp; x++) {
      for (let y: u32 = yLow; y < yUp; y++) {
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

    const stoneSize = new Size(10, 10);
    for (let x: u32 = 0; x < width; x++) {
      for (let y: u32 = 0; y < height; y++) {
        this.stones[width * y + x] = new Stone(
          new Point(x * stoneSize.width, y * stoneSize.height),
          new Size(stoneSize.width + 1, stoneSize.height + 1),
          new Color(23, 104, 47),
        );
      }
    }
  }
}

// Initialize global state
const layer: PixelGridLayer = new PixelGridLayer(21, 11);
let canvas: Canvas;

export function setCanvasSize(width: u32, height: u32): void {
  if (canvas.width !== width && canvas.height !== height) canvas = new Canvas(width, height);
}

export function erase(x: u32, y: u32): boolean {
  for (let i = 0; i < layer.stones.length; i++) {
    const stone = layer.stones[i];
    if (
      x > stone.offset.x &&
      x < stone.offset.x + stone.size.width &&
      y > stone.offset.y &&
      y < stone.offset.y + stone.size.height
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
      x > stone.offset.x &&
      x < stone.offset.x + stone.size.width &&
      y > stone.offset.y &&
      y < stone.offset.y + stone.size.height
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
  // const bgColor: Color = new Color(0, 255, 0);

  canvas.clear();

  for (let i = 0; i < layer.stones.length; i++)
    if (!layer.stones[i].erased) canvas.setStone(layer.stones[i], strokeColor, strokeWidth);

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
