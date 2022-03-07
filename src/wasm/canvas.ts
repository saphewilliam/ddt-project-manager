import { Color, Point, Size, Stone } from './structs';

export class CanvasUpdateInfo {
  shouldUpdate: boolean;
  origin: Point;
  size: Size;
  pixels: Array<u32>;

  constructor(
    shouldUpdate: boolean = false,
    origin: Point = new Point(0, 0),
    size: Size = new Size(0, 0),
    pixels: Array<u32> = new Array<u32>(),
  ) {
    this.shouldUpdate = shouldUpdate;
    this.origin = origin;
    this.size = size;
    this.pixels = pixels;
  }

  toArray(): Array<u32> {
    return [
      this.shouldUpdate ? (1 as u32) : (0 as u32),
      this.origin.x,
      this.origin.y,
      this.size.width,
      this.size.height,
    ].concat(this.pixels);
  }

  merge(other: CanvasUpdateInfo): void {
    // TODO
  }
}

export class Canvas {
  size: Size;
  origin: Point;
  scale: u32;
  pixels: Array<u32>;

  constructor(width: u32, height: u32) {
    this.origin = new Point(0, 0);
    this.size = new Size(width, height);
    this.scale = 5;
    this.pixels = new Array<u32>(width * height);
  }

  setStone(stone: Stone): CanvasUpdateInfo {
    const info = new CanvasUpdateInfo();
    if (stone.erased) info;

    const xLow: i32 = this.origin.x + this.scale * stone.origin.x;
    if (xLow > (this.size.width as i32)) return info;

    const xUp: i32 = this.origin.x + this.scale * (stone.origin.x + stone.size.width) + 1;
    if (xUp < 0) return info;

    const yLow: i32 = this.origin.y + this.scale * stone.origin.y;
    if (yLow > (this.size.height as i32)) return info;

    const yUp: i32 = this.origin.y + this.scale * (stone.origin.y + stone.size.height) + 1;
    if (yUp < 0) return info;

    const xLowClamped: i32 = Math.max(xLow, 0) as i32;
    const xUpClamped: i32 = Math.min(xUp, this.size.width) as i32;
    const yLowClamped: i32 = Math.max(yLow, 0) as i32;
    const yUpClamped: i32 = Math.min(yUp, this.size.height) as i32;

    info.size.width = xUpClamped - xLowClamped;
    info.size.height = yUpClamped - yLowClamped;
    info.pixels = new Array<u32>(info.size.width * info.size.height);

    // TODO move these somewhere globally?
    const strokeWidth: u32 = 1;
    const strokeColor: Color = new Color(0, 0, 0);
    const selectedStrokeColor: Color = new Color(255, 0, 0);

    const stoneStrokeColor: u32 = stone.selected ? selectedStrokeColor.color : strokeColor.color;

    for (let y: i32 = yLowClamped; y < yUpClamped; y++) {
      const rowIndex = this.size.width * y;
      const bufferRowIndex = info.size.width * y;
      if (y < yLow + strokeWidth || y >= yUp - strokeWidth) {
        // TODO do only one of the two?
        info.pixels.fill(
          stoneStrokeColor,
          bufferRowIndex,
          bufferRowIndex + xUpClamped - xLowClamped,
        );
        this.pixels.fill(stoneStrokeColor, rowIndex + xLowClamped, rowIndex + xUpClamped);
      } else {
        // Color fill

        info.pixels.fill(
          stone.color.color,
          bufferRowIndex,
          bufferRowIndex + xUpClamped - xLowClamped,
        );
        this.pixels.fill(stone.color.color, rowIndex + xLowClamped, rowIndex + xUpClamped);

        // Left stroke
        this.pixels.fill(
          stoneStrokeColor,
          rowIndex + xLowClamped,
          rowIndex + (Math.max(Math.min(xLow + strokeWidth, this.size.width), 0) as i32),
        );
        info.pixels.fill(
          stoneStrokeColor,
          bufferRowIndex,
          bufferRowIndex +
            (Math.max(Math.min(xLow + strokeWidth, this.size.width), 0) as i32) -
            xLowClamped,
        );

        // Right stroke
        this.pixels.fill(
          stoneStrokeColor,
          rowIndex + (Math.max(Math.min(xUp - strokeWidth, this.size.width), 0) as i32),
          rowIndex + xUpClamped,
        );
        info.pixels.fill(
          stoneStrokeColor,
          bufferRowIndex +
            (Math.max(Math.min(xUp - strokeWidth, this.size.width), 0) as i32) -
            xLowClamped,
          bufferRowIndex + xUpClamped - xLowClamped,
        );
      }
    }

    return info;
  }

  setStones(stones: Array<Stone>): CanvasUpdateInfo {
    // TODO make more sophisticated by merging info objects
    for (let i: i32 = 0; i < stones.length; i++) this.setStone(stones[i]);
    return new CanvasUpdateInfo(true, new Point(0, 0), this.size, this.pixels);
  }

  clear(): void {
    // FIXME somehow this.pixels (and maybe others?) are not set in the constructor (Assemblyscript bug?)
    this.pixels = new Array<u32>(this.size.width * this.size.height);
  }
}
