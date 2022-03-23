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
  color: u32;
  private _r: u8;
  private _g: u8;
  private _b: u8;

  constructor(r: u8, g: u8, b: u8, a: u8 = 255) {
    // TODO determine the endianness of the processor http://jsfiddle.net/andrewjbaker/Fnx2w/
    // this.color = ((r as u32) << 24) | ((g as u32) << 16) | ((b as u16) << 8) | a;
    this.color = ((a as u32) << 24) | ((b as u32) << 16) | ((g as u16) << 8) | r;
    this._r = r;
    this._g = g;
    this._b = b;
  }

  get r(): u8 {
    return this._r;
  }

  get g(): u8 {
    return this._g;
  }

  get b(): u8 {
    return this._b;
  }
}

export class Stone {
  origin: Point;
  size: Size;
  color: Color;
  angle: f32;
  type: u8;
  erased: boolean;
  selected: boolean;

  constructor(
    origin: Point,
    size: Size,
    color: Color,
    type: u8 = 0,
    angle: f32 = 0,
    erased: boolean = false,
    selected: boolean = false,
  ) {
    this.origin = origin;
    this.size = size;
    this.color = color;
    this.type = type;
    this.angle = angle;
    this.erased = erased;
    this.selected = selected;
  }

  clone(): Stone {
    return new Stone(
      new Point(this.origin.x, this.origin.y),
      new Size(this.size.width, this.size.height),
      new Color(this.color.r, this.color.g, this.color.b),
      this.type,
      this.angle,
      this.erased,
      this.selected,
    );
  }
}
