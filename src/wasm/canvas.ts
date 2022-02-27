import { Color, Point, Stone } from './structs';

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

  setStone(stone: Stone, strokeColor: Color, selectedStrokeColor: Color, strokeWidth: u32): void {
    if (stone.erased) return;

    const xLow: i32 = this.origin.x + this.scale * stone.origin.x;
    const xUp: i32 = this.origin.x + this.scale * (stone.origin.x + stone.size.width) + 1;
    const yLow: i32 = this.origin.y + this.scale * stone.origin.y;
    const yUp: i32 = this.origin.y + this.scale * (stone.origin.y + stone.size.height) + 1;

    if (xLow > (this.width as i32) || xUp < 0 || yLow > (this.height as i32) || yUp < 0) return;

    for (let x: i32 = xLow; x < xUp; x++) {
      for (let y: i32 = yLow; y < yUp; y++) {
        if (
          x < xLow + strokeWidth ||
          x >= xUp - strokeWidth ||
          y < yLow + strokeWidth ||
          y >= yUp - strokeWidth
        )
          this.setPixel(x, y, stone.selected ? selectedStrokeColor : strokeColor);
        else this.setPixel(x, y, stone.color);
      }
    }
  }

  clear(): void {
    this.pixels = new Array<u8>(this.width * this.height * 4);
  }
}
