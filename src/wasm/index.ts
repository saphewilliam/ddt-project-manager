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
  a: u8;

  constructor(r: u8, g: u8, b: u8, a: u8 = 255) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }
}

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
}

export function drawL2(width: u32, height: u32, r: u8, g: u8, b: u8): Array<u8> {
  const color: Color = new Color(r, g, b);
  const stone: Point = new Point(0, 0);
  const stoneSize: Size = new Size(2, 6);
  const stoneGap: Size = new Size(4, 1);

  const strokeWidth: u32 = 0;
  const strokeColor: Color = new Color(0, 0, 0);

  const canvas: Canvas = new Canvas(width, height);

  while (stone.x < width) {
    while (stone.y < height) {
      for (let x: u32 = stone.x; x < stone.x + stoneSize.width && x < width; x++) {
        for (let y: u32 = stone.y; y < stone.y + stoneSize.height && y < height; y++) {
          if (
            y < stone.y + strokeWidth ||
            y >= stone.y + stoneSize.height - strokeWidth ||
            x < stone.x + strokeWidth ||
            x >= stone.x + stoneSize.width - strokeWidth
          )
            canvas.setPixel(x, y, strokeColor);
          else canvas.setPixel(x, y, color);
        }
      }

      stone.y += stoneSize.height + stoneGap.height;
    }
    stone.x += stoneSize.width + stoneGap.width;
    stone.y = 0;
  }

  return canvas.pixels;
}
