import { log } from './util';

// export function addString(a: string, b: string): string {
//   return a + ' ' + b;
// }

// function addColor(result: Array<u8>, r: u8, g: u8, b: u8): void {
//   result.push(r);
//   result.push(g);
//   result.push(b);
//   result.push(255);
// }

// export function checkerBoard(r: u8, g: u8, b: u8, size: u32): Array<u8> {
//   const result: Array<u8> = new Array<u8>();
//   for (let x: u32 = 0; x < size; x++) {
//     for (let y: u32 = 0; y < size; y++) {
//       let isDark: boolean = y % 2 === 0;
//       if (x % 2 === 0) isDark = !isDark;
//       if (isDark) addColor(result, r, g, b);
//       else addColor(result, 255, 255, 255);
//     }
//   }
//   return result;
// }

export class Point {
  x: u32;
  y: u32;

  constructor(x: u32, y: u32) {
    this.x = x;
    this.y = y;
  }
}

export class Size {
  width: u32;
  height: u32;

  constructor(width: u32, height: u32) {
    this.width = width;
    this.height = height;
  }
}

export class Color {
  r: u8;
  g: u8;
  b: u8;

  constructor(r: u8, g: u8, b: u8) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  // print function
}

export function drawL2(width: u32, height: u32, r: u8, g: u8, b: u8): Array<u8> {
  const color: Color = new Color(r, g, b);
  const stone: Point = new Point(0, 0);
  const stoneSize: Size = new Size(8, 24);
  const stoneGap: Size = new Size(16, 4);

  const strokeWidth: u32 = 1;
  const strokeColor: Color = new Color(0, 0, 0);
  // const backgroundColor: Color = new Color(255, 255, 255);

  const result: Array<u8> = new Array<u8>(width * height * 4);

  while (stone.x < width) {
    while (stone.y < height) {
      // log(`Cursor: (${stone.x}, ${stone.y})`);

      // Draw stone
      for (let x: u32 = stone.x; x < stone.x + stoneSize.width && x < width; x++) {
        for (let y: u32 = stone.y; y < stone.y + stoneSize.height && y < height; y++) {
          const i: u32 = (width * y + x) * 4;
          if (
            y < stone.y + strokeWidth ||
            y >= stone.y + stoneSize.height - strokeWidth ||
            x < stone.x + strokeWidth ||
            x >= stone.x + stoneSize.width - strokeWidth
          ) {
            result[i] = strokeColor.r;
            result[i + 1] = strokeColor.g;
            result[i + 2] = strokeColor.b;
            result[i + 3] = 255;
          } else {
            result[i] = color.r;
            result[i + 1] = color.g;
            result[i + 2] = color.b;
            result[i + 3] = 255;
          }
        }
        log(`${x}`);
      }

      stone.y += stoneSize.height + stoneGap.height;
    }
    stone.x += stoneSize.width + stoneGap.width;
    stone.y = 0;
  }

  return result;
}
