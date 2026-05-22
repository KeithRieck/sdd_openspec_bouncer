import { Bouncer } from "./Bouncer.js";

export class Circle extends Bouncer {
  static DIAMETER = 50;
  static RADIUS = 25;
  static MASS = 4;
  static START_SPEED = 100;

  constructor(scene, x, y, opts = {}) {
    const circleClass = new.target ?? Circle;
    const diameter = opts.diameter ?? circleClass.DIAMETER;
    const radius = diameter / 2;
    const color = opts.color ?? circleClass.randomColor();
    const textureKey = Circle.getOrCreateTextureKey(scene, diameter, color);

    super(scene, x, y, textureKey, { speed: opts.speed ?? circleClass.START_SPEED, radius });

    this._color = color;
    this._diameter = diameter;
  }

  get color() {
    return this._color;
  }

  get diameter() {
    return this._diameter;
  }

  static getOrCreateTextureKey(scene, diameter, color) {
    const colorHex = color.toString(16).padStart(6, "0");
    const key = `circle-${diameter}-${colorHex}`;

    if (scene.textures.exists(key)) {
      return key;
    }

    const g = scene.make.graphics({ x: 0, y: 0, add: false });
    g.fillStyle(color, 1);
    g.fillCircle(diameter / 2, diameter / 2, diameter / 2);
    g.generateTexture(key, diameter, diameter);
    g.destroy();

    return key;
  }

  static randomColor() {
    const hue = Phaser.Math.Between(0, 359);
    const saturation = Phaser.Math.Between(45, 65);
    const lightness = Phaser.Math.Between(72, 85);
    return Phaser.Display.Color.HSLToColor(
      hue / 360,
      saturation / 100,
      lightness / 100,
    ).color;
  }
}
