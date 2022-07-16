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
  zIndex: u8;
  erased: boolean;
  selected: boolean;

  constructor(
    origin: Point = new Point(0, 0),
    size: Size = new Size(0, 0),
    color: Color = new Color(0, 0, 0),
    type: u8 = 0,
    zIndex: u8 = 0,
    angle: f32 = 0,
    erased: boolean = false,
    selected: boolean = false,
  ) {
    this.origin = origin;
    this.size = size;
    this.color = color;
    this.type = type;
    this.zIndex = zIndex;
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
      this.zIndex,
      this.angle,
      this.erased,
      this.selected,
    );
  }

  /** Create string representation of a stone */
  toString(): string {
    return `${this.origin.x}:${this.origin.y}:${this.size.width}:${this.size.height}:${
      this.color.color
    }:${this.type}:${this.zIndex}:${this.angle}:${this.erased ? 1 : 0}`;
  }

  /** Load string representation of a stone. If false is returned, the string is invalid */
  fromString(input: string): boolean {
    const inputs: string[] = input.split(':');

    // Input validation
    if (
      inputs.length !== 9 ||
      isNaN(parseInt(inputs[0])) ||
      isNaN(parseInt(inputs[1])) ||
      isNaN(parseInt(inputs[2])) ||
      isNaN(parseInt(inputs[3])) ||
      isNaN(parseInt(inputs[4])) ||
      isNaN(parseInt(inputs[5])) ||
      isNaN(parseInt(inputs[6])) ||
      isNaN(parseFloat(inputs[7])) ||
      isNaN(parseInt(inputs[8]))
    )
      return false;

    this.origin = new Point(parseInt(inputs[0]), parseInt(inputs[1]));
    this.size = new Size(parseInt(inputs[2]), parseInt(inputs[3]));
    this.color.color = parseInt(inputs[4]);
    this.type = parseInt(inputs[5]);
    this.zIndex = parseInt(inputs[6]);
    this.angle = parseFloat(inputs[7]);
    this.erased = parseInt(inputs[8]) === 1 ? true : false;

    return true;
  }
}
