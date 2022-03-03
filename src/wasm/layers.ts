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
      stonesClone.push(
        new Stone(
          stone.origin,
          stone.size,
          stone.color,
          stone.type,
          stone.angle,
          stone.erased,
          stone.selected,
        ),
      );
    }
    return stonesClone;
  }
}

export class PixelGridLayer extends Layer {
  constructor(width: u32, height: u32) {
    super();

    const initColor = new Color(0, 162, 232);
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

    const initColor = new Color(0, 162, 232);
    for (let y: u32 = 0; y < height; y++) {
      for (let x: u32 = 0; x < width; x++) {
        // Short stone row
        if ((y % 2 === 0 && height % 2 === 1) || (y % 2 === 1 && height % 2 === 0))
          this.stones.push(new Stone(new Point(x * 5, y * 3), new Size(1, 3), initColor, 0));
        // Long stone row
        else {
          if (x === width - 1) continue;
          if ((x % 2 === 0 && y % 4 < 2) || (x % 2 === 1 && y % 4 > 1))
            this.stones.push(new Stone(new Point(x * 5, y * 3), new Size(6, 3), initColor, 1));
          else if (x === 0)
            this.stones.push(new Stone(new Point(x * 5, y * 3), new Size(5, 3), initColor, 1));
          else if (x === width - 2)
            this.stones.push(new Stone(new Point(x * 5 + 1, y * 3), new Size(5, 3), initColor, 2));
          else
            this.stones.push(new Stone(new Point(x * 5 + 1, y * 3), new Size(4, 3), initColor, 3));
        }
      }
    }
  }
}
