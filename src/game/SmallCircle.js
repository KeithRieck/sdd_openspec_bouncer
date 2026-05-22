import { Circle } from "./Circle.js";

export class SmallCircle extends Circle {
  static DIAMETER = 25;
  static RADIUS = 12.5;
  static MASS = 1;
  static START_SPEED = 200;

  constructor(scene, x, y, opts = {}) {
    super(scene, x, y, {
      ...opts,
      diameter: opts.diameter ?? SmallCircle.DIAMETER,
      speed: opts.speed ?? SmallCircle.START_SPEED,
    });
  }

  static randomColor() {
    const hue = Phaser.Math.Between(0, 359);
    const saturation = Phaser.Math.Between(80, 100);
    const lightness = Phaser.Math.Between(40, 60);
    return Phaser.Display.Color.HSLToColor(
      hue / 360,
      saturation / 100,
      lightness / 100,
    ).color;
  }
}
