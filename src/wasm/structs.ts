export class Point {
  x: i32;
  y: i32;

  constructor(x: i32, y: i32) {
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
  origin: Point;
  size: Size;
  color: Color;
  angle: f32;
  erased: boolean;
  selected: boolean;

  constructor(
    origin: Point,
    size: Size,
    color: Color,
    angle: f32 = 0,
    erased: boolean = false,
    selected: boolean = false,
  ) {
    this.origin = origin;
    this.size = size;
    this.color = color;
    this.angle = angle;
    this.erased = erased;
    this.selected = selected;
  }
}
