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

export class Stone {
  offset: Point;
  size: Size;
  color: Color;
  angle: f32;
  erased: boolean;

  constructor(offset: Point, size: Size, color: Color, angle: f32 = 0) {
    this.offset = offset;
    this.size = size;
    this.color = color;
    this.angle = angle;
  }
}
