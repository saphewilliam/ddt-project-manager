import { Color, Point, Size, Stone } from './structs';

export class CanvasUpdateInfo {
  shouldUpdate: boolean;
  shouldClear: boolean;
  origin: Point;
  size: Size;
  pixels: Array<u32>;

  constructor(
    shouldUpdate: boolean = false,
    shouldClear: boolean = false,
    origin: Point = new Point(-1, -1),
    size: Size = new Size(0, 0),
    pixels: Array<u32> = new Array<u32>(),
  ) {
    this.shouldUpdate = shouldUpdate;
    this.shouldClear = shouldClear;
    this.origin = origin;
    this.size = size;
    this.pixels = pixels;
  }

  toArray(): Array<u32> {
    if (!this.shouldUpdate) return [0];
    else
      return [
        1 as u32,
        this.shouldClear ? 1 : 0,
        this.origin.x,
        this.origin.y,
        this.size.width,
        this.size.height,
      ].concat(this.pixels);
  }
}

export class Canvas {
  size: Size;
  origin: Point;
  scale: u32;

  constructor(width: u32, height: u32) {
    this.origin = new Point(0, 0);
    this.size = new Size(width, height);
    this.scale = 5;
  }

  /** Checks if a stone is in bounds of a canvas (x1, y1), (x2, y2) area */
  stoneIsInBounds(stone: Stone, x1: i32, y1: i32, x2: i32, y2: i32): boolean {
    return (
      (Math.max(x1, x2) as i32) > this.origin.x + stone.origin.x * this.scale &&
      (Math.min(x1, x2) as i32) <
        this.origin.x + (stone.origin.x + stone.size.width) * this.scale &&
      (Math.max(y1, y2) as i32) > this.origin.y + stone.origin.y * this.scale &&
      (Math.min(y1, y2) as i32) < this.origin.y + (stone.origin.y + stone.size.height) * this.scale
    );
  }

  /** Update the scale of the canvas */
  setScale(originX: i32, originY: i32, scaleBy: f32): void {
    this.scale = ((this.scale as f32) * scaleBy) as u32;
    this.origin.x = originX - ((((originX - this.origin.x) as f32) * scaleBy) as i32);
    this.origin.y = originY - ((((originY - this.origin.y) as f32) * scaleBy) as i32);
  }

  setStone(stone: Stone): CanvasUpdateInfo {
    return this.setStones([stone]);
  }

  /** Adds an instruction to clear the canvas before placing the stones on it */
  clearSetStones(stones: Array<Stone>): CanvasUpdateInfo {
    const info = this.setStones(stones);
    info.shouldClear = true;
    return info;
  }

  setStones(stones: Array<Stone>): CanvasUpdateInfo {
    const info = new CanvasUpdateInfo();

    // Calculate bounding box for stones to be updated
    for (let i: i32 = 0; i < stones.length; i++) {
      const stone = stones[i];

      const xLow: i32 = this.origin.x + this.scale * stone.origin.x;
      if (xLow > (this.size.width as i32)) continue;

      const xUp: i32 = this.origin.x + this.scale * (stone.origin.x + stone.size.width) + 1;
      if (xUp < 0) continue;

      const yLow: i32 = this.origin.y + this.scale * stone.origin.y;
      if (yLow > (this.size.height as i32)) continue;

      const yUp: i32 = this.origin.y + this.scale * (stone.origin.y + stone.size.height) + 1;
      if (yUp < 0) continue;

      const xLowClamped: i32 = Math.max(xLow, 0) as i32;
      const xUpClamped: i32 = Math.min(xUp, this.size.width) as i32;
      const yLowClamped: i32 = Math.max(yLow, 0) as i32;
      const yUpClamped: i32 = Math.min(yUp, this.size.height) as i32;

      if (
        info.origin.x === -1 ||
        info.origin.y === -1 ||
        info.size.width === 0 ||
        info.size.height === 0
      ) {
        info.origin = new Point(xLowClamped, yLowClamped);
        info.size = new Size(xUpClamped - xLowClamped, yUpClamped - yLowClamped);
      } else {
        if (xLowClamped < info.origin.x) {
          info.size.width += info.origin.x - xLowClamped;
          info.origin.x = xLowClamped;
        }
        if (yLowClamped < info.origin.y) {
          info.size.height += info.origin.y - yLowClamped;
          info.origin.y = yLowClamped;
        }
        if (xUpClamped > info.origin.x + info.size.width)
          info.size.width = xUpClamped - info.origin.x;
        if (yUpClamped > info.origin.y + info.size.height)
          info.size.height = yUpClamped - info.origin.y;
      }
    }

    if (
      info.origin.x === -1 ||
      info.origin.y === -1 ||
      info.size.width === 0 ||
      info.size.height === 0
    )
      return info;
    info.shouldUpdate = true;

    // Create pixels array
    // TODO staticarray?
    info.pixels = new Array<u32>(info.size.width * info.size.height);

    for (let i: i32 = 0; i < stones.length; i++) {
      const stone = stones[i];
      if (stone.erased) continue;

      // TODO memoize all this shit
      const xLow: i32 = this.origin.x + this.scale * stone.origin.x;
      if (xLow > (this.size.width as i32)) continue;

      const xUp: i32 = this.origin.x + this.scale * (stone.origin.x + stone.size.width) + 1;
      if (xUp < 0) continue;

      const yLow: i32 = this.origin.y + this.scale * stone.origin.y;
      if (yLow > (this.size.height as i32)) continue;

      const yUp: i32 = this.origin.y + this.scale * (stone.origin.y + stone.size.height) + 1;
      if (yUp < 0) continue;

      const xLowClamped: i32 = Math.max(xLow, 0) as i32;
      const xUpClamped: i32 = Math.min(xUp, this.size.width) as i32;
      const yLowClamped: i32 = Math.max(yLow, 0) as i32;
      const yUpClamped: i32 = Math.min(yUp, this.size.height) as i32;

      // TODO move these somewhere globally?
      const strokeWidth: u32 = 1;
      const strokeColor: Color = new Color(0, 0, 0);
      const selectedStrokeColor: Color = new Color(255, 0, 0);

      const stoneStrokeColor: u32 = stone.selected ? selectedStrokeColor.color : strokeColor.color;

      for (let y: i32 = yLowClamped - info.origin.y; y < yUpClamped - info.origin.y; y++) {
        const rowIndex = info.size.width * y;
        if (y < yLow - info.origin.y + strokeWidth || y >= yUp - info.origin.y - strokeWidth) {
          // Top stroke
          info.pixels.fill(
            stoneStrokeColor,
            rowIndex + xLowClamped - info.origin.x,
            rowIndex + xUpClamped - info.origin.x,
          );
        } else {
          // Color fill
          info.pixels.fill(
            // stone.type === 0 ? new Color(255, 0, 0).color : new Color(0, 255, 0).color,
            stone.color.color,
            rowIndex + xLowClamped - info.origin.x,
            rowIndex + xUpClamped - info.origin.x,
          );

          // Left stroke
          info.pixels.fill(
            stoneStrokeColor,
            rowIndex + xLowClamped - info.origin.x,
            rowIndex +
              (Math.max(Math.min(xLow + strokeWidth, this.size.width), 0) as i32) -
              info.origin.x,
          );

          // Right stroke
          info.pixels.fill(
            stoneStrokeColor,
            rowIndex +
              (Math.max(Math.min(xUp - strokeWidth, this.size.width), 0) as i32) -
              info.origin.x,
            rowIndex + xUpClamped - info.origin.x,
          );
        }
      }
    }

    return info;
  }
}
