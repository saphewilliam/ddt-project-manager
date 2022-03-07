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

  setStone(stone: Stone): CanvasUpdateInfo {
    const info = new CanvasUpdateInfo();
    // if (stone.erased) return info;
    // const xLow: i32 = this.origin.x + this.scale * stone.origin.x;
    // if (xLow > (this.size.width as i32)) return info;
    // const xUp: i32 = this.origin.x + this.scale * (stone.origin.x + stone.size.width) + 1;
    // if (xUp < 0) return info;
    // const yLow: i32 = this.origin.y + this.scale * stone.origin.y;
    // if (yLow > (this.size.height as i32)) return info;
    // const yUp: i32 = this.origin.y + this.scale * (stone.origin.y + stone.size.height) + 1;
    // if (yUp < 0) return info;
    // const xLowClamped: i32 = Math.max(xLow, 0) as i32;
    // const xUpClamped: i32 = Math.min(xUp, this.size.width) as i32;
    // const yLowClamped: i32 = Math.max(yLow, 0) as i32;
    // const yUpClamped: i32 = Math.min(yUp, this.size.height) as i32;
    // info.size.width = xUpClamped - xLowClamped;
    // info.size.height = yUpClamped - yLowClamped;
    // info.pixels = new Array<u32>(info.size.width * info.size.height);
    // // TODO move these somewhere globally?
    // const strokeWidth: u32 = 1;
    // const strokeColor: Color = new Color(0, 0, 0);
    // const selectedStrokeColor: Color = new Color(255, 0, 0);
    // const stoneStrokeColor: u32 = stone.selected ? selectedStrokeColor.color : strokeColor.color;
    // for (let y: i32 = yLowClamped; y < yUpClamped; y++) {
    //   const rowIndex = this.size.width * y;
    //   const bufferRowIndex = info.size.width * y;
    //   if (y < yLow + strokeWidth || y >= yUp - strokeWidth) {
    //     // TODO do only one of the two?
    //     info.pixels.fill(
    //       stoneStrokeColor,
    //       bufferRowIndex,
    //       bufferRowIndex + xUpClamped - xLowClamped,
    //     );
    //     this.pixels.fill(stoneStrokeColor, rowIndex + xLowClamped, rowIndex + xUpClamped);
    //   } else {
    //     // Color fill
    //     info.pixels.fill(
    //       stone.color.color,
    //       bufferRowIndex,
    //       bufferRowIndex + xUpClamped - xLowClamped,
    //     );
    //     this.pixels.fill(stone.color.color, rowIndex + xLowClamped, rowIndex + xUpClamped);
    //     // Left stroke
    //     this.pixels.fill(
    //       stoneStrokeColor,
    //       rowIndex + xLowClamped,
    //       rowIndex + (Math.max(Math.min(xLow + strokeWidth, this.size.width), 0) as i32),
    //     );
    //     info.pixels.fill(
    //       stoneStrokeColor,
    //       bufferRowIndex,
    //       bufferRowIndex +
    //         (Math.max(Math.min(xLow + strokeWidth, this.size.width), 0) as i32) -
    //         xLowClamped,
    //     );
    //     // Right stroke
    //     this.pixels.fill(
    //       stoneStrokeColor,
    //       rowIndex + (Math.max(Math.min(xUp - strokeWidth, this.size.width), 0) as i32),
    //       rowIndex + xUpClamped,
    //     );
    //     info.pixels.fill(
    //       stoneStrokeColor,
    //       bufferRowIndex +
    //         (Math.max(Math.min(xUp - strokeWidth, this.size.width), 0) as i32) -
    //         xLowClamped,
    //       bufferRowIndex + xUpClamped - xLowClamped,
    //     );
    //   }
    // }
    return info;
  }

  setStones(stones: Array<Stone>): CanvasUpdateInfo {
    const info = new CanvasUpdateInfo();

    // Calculate bounding box for stones to be updated
    for (let i: i32 = 0; i < stones.length; i++) {
      const stone = stones[i];
      if (stone.erased) continue;

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

    // Create pixels array
    // TODO staticarray?
    info.pixels = new Array<u32>(info.size.width * info.size.height);

    for (let i: i32 = 0; i < stones.length; i++) {
      const stone = stones[i];
      if (stone.erased) continue;

      const xLow: i32 = this.origin.x + this.scale * stone.origin.x - info.size.width;
      if (xLow > (info.size.width as i32)) continue;

      const xUp: i32 =
        this.origin.x + this.scale * (stone.origin.x + stone.size.width) + 1 - info.size.width;
      if (xUp < 0) continue;

      const yLow: i32 = this.origin.y + this.scale * stone.origin.y - info.size.height;
      if (yLow > (info.size.height as i32)) continue;

      const yUp: i32 =
        this.origin.y + this.scale * (stone.origin.y + stone.size.height) + 1 - info.size.height;
      if (yUp < 0) continue;

      info.shouldUpdate = true;

      const xLowClamped: i32 = Math.max(xLow, 0) as i32;
      const xUpClamped: i32 = Math.min(xUp, info.size.width) as i32;
      const yLowClamped: i32 = Math.max(yLow, 0) as i32;
      const yUpClamped: i32 = Math.min(yUp, info.size.height) as i32;

      // TODO move these somewhere globally?
      const strokeWidth: u32 = 1;
      const strokeColor: Color = new Color(0, 0, 0);
      const selectedStrokeColor: Color = new Color(255, 0, 0);

      const stoneStrokeColor: u32 = stone.selected ? selectedStrokeColor.color : strokeColor.color;

      for (let y: i32 = yLowClamped; y < yUpClamped; y++) {
        const rowIndex = info.size.width * y;
        if (y < yLow + strokeWidth || y >= yUp - strokeWidth) {
          info.pixels.fill(
            stoneStrokeColor,
            rowIndex + xLowClamped,
            rowIndex + xUpClamped - xLowClamped,
          );
        } else {
          /*
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
          */
        }
      }
    }

    return info;
  }
}
