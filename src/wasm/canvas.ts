import { Color, Point, Stone } from './structs';

export class Canvas {
  width: u32;
  height: u32;
  size: u32;
  origin: Point;
  scale: u32;
  pixels: Array<u32>;

  constructor(width: u32, height: u32) {
    this.width = width;
    this.height = height;
    this.size = this.width * this.height;
    this.origin = new Point(0, 0);
    this.scale = 5;
    this.pixels = new Array<u32>(this.size);
  }

  setStone(stone: Stone, strokeColor: Color, selectedStrokeColor: Color, strokeWidth: u32): void {
    if (stone.erased) return;

    const xLow: i32 = this.origin.x + this.scale * stone.origin.x;
    if (xLow > (this.width as i32)) return;

    const xUp: i32 = this.origin.x + this.scale * (stone.origin.x + stone.size.width) + 1;
    if (xUp < 0) return;

    const yLow: i32 = this.origin.y + this.scale * stone.origin.y;
    if (yLow > (this.height as i32)) return;

    const yUp: i32 = this.origin.y + this.scale * (stone.origin.y + stone.size.height) + 1;
    if (yUp < 0) return;

    const xLowClamped: i32 = Math.max(xLow, 0) as i32;
    const xUpClamped: i32 = Math.min(xUp, this.width) as i32;
    const yLowClamped: i32 = Math.max(yLow, 0) as i32;
    const yUpClamped: i32 = Math.min(yUp, this.height) as i32;
    const stoneStrokeColor: u32 = stone.selected ? selectedStrokeColor.color : strokeColor.color;

    for (let y: i32 = yLowClamped; y < yUpClamped; y++) {
      const rowIndex = this.width * y;
      if (y < yLow + strokeWidth || y >= yUp - strokeWidth)
        this.pixels.fill(stoneStrokeColor, rowIndex + xLowClamped, rowIndex + xUpClamped);
      else {
        // Color fill
        this.pixels.fill(stone.color.color, rowIndex + xLowClamped, rowIndex + xUpClamped);

        // Left stroke
        this.pixels.fill(
          stoneStrokeColor,
          rowIndex + xLowClamped,
          rowIndex + (Math.max(Math.min(xLow + strokeWidth, this.width), 0) as i32),
        );

        // Right stroke
        this.pixels.fill(
          stoneStrokeColor,
          rowIndex + (Math.max(Math.min(xUp - strokeWidth, this.width), 0) as i32),
          rowIndex + xUpClamped,
        );
      }
    }
  }

  clear(): void {
    // FIXME somehow this.size is not set in the constructor (Assemblyscript bug?)
    this.size = this.width * this.height;
    this.pixels = new Array<u32>(this.size);
  }
}
