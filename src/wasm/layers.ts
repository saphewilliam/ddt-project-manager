import { Stone, Color, Size, Point } from './structs';

// 4.8 cm hoog = 6
// 2.4 cm breed = 3
// 0.8 cm diep = 1

abstract class Layer {
  stones: Array<Stone>;

  constructor() {
    this.stones = new Array<Stone>();
  }

  getStones(): Array<Stone> {
    const stonesClone: Array<Stone> = new Array<Stone>();
    for (let i = 0; i < this.stones.length; i++) {
      const stone = this.stones[i];
      stonesClone.push(stone.clone());
    }
    return stonesClone;
  }
}

export class PixelGridLayer extends Layer {
  constructor(width: u32, height: u32) {
    super();

    const initColor = new Color(51, 171, 242);
    const stoneSize = new Size(3, 3);
    for (let x: u32 = 0; x < width; x++) {
      for (let y: u32 = 0; y < height; y++) {
        this.stones.push(
          new Stone(
            new Point(x * stoneSize.width, y * stoneSize.height),
            new Size(stoneSize.width, stoneSize.height),
            initColor,
          ),
        );
      }
    }
  }
}

export class WallLayer extends Layer {
  constructor(width: u32, height: u32) {
    super();

    const initColor = new Color(51, 171, 242);
    for (let y: u32 = 0; y < height; y++) {
      for (let x: u32 = 0; x < width; x++) {
        // Short stone row
        if (y % 2 !== height % 2)
          this.stones.push(
            new Stone(
              new Point(x * 5, y * 3),
              new Size(1, 3),
              initColor,
              (y % 4 < 2 ? x % 2 : 1 - (x % 2)) as u8,
            ),
          );
        // Long stone row
        else {
          if (x === width - 1) continue;
          if ((x % 2 === 0 && y % 4 < 2) || (x % 2 === 1 && y % 4 > 1))
            this.stones.push(new Stone(new Point(x * 5, y * 3), new Size(6, 3), initColor, 2));
          else if (x === 0)
            this.stones.push(new Stone(new Point(x * 5, y * 3), new Size(5, 3), initColor, 3));
          else if (x === width - 2)
            this.stones.push(new Stone(new Point(x * 5 + 1, y * 3), new Size(5, 3), initColor, 3));
          else
            this.stones.push(new Stone(new Point(x * 5 + 1, y * 3), new Size(4, 3), initColor, 3));
        }
      }
    }
  }
}

export class CubeLayer extends Layer {
  constructor(width: u32, height: u32) {
    super();

    const initColor = new Color(51, 171, 242);
    for (let y: u32 = 0; y < height; y++) {
      for (let x: u32 = 0; x < width; x++) {
        // Row 1
        if (y % 4 === (height + 3) % 4) {
          this.stones.push(new Stone(new Point(x * 10, y * 3), new Size(1, 3), initColor, 0));
          this.stones.push(new Stone(new Point(x * 10 + 5, y * 3), new Size(1, 3), initColor, 1));
        }
        // Row 2
        else if (y % 4 === (height + 2) % 4)
          this.stones.push(new Stone(new Point(x * 10, y * 3), new Size(6, 3), initColor, 2));
        // Row 3
        else if (y % 4 === (height + 1) % 4) {
          if (x === 0)
            this.stones.push(new Stone(new Point(x * 10, y * 3), new Size(1, 3), initColor, 3));
          else {
            if (x === width - 1)
              this.stones.push(
                new Stone(new Point(x * 10 + 5, y * 3), new Size(1, 3), initColor, 4),
              );
            this.stones.push(new Stone(new Point(x * 10 - 5, y * 3), new Size(6, 3), initColor, 5));
          }
          // Row 4
        } else if (y % 4 === height % 4) {
          this.stones.push(new Stone(new Point(x * 10, y * 3), new Size(6, 3), initColor, 6));
          if (x !== width - 1)
            this.stones.push(new Stone(new Point(x * 10 + 6, y * 3), new Size(4, 3), initColor, 7));
        }
      }
    }
  }
}
