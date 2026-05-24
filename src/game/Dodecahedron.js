import { Bouncer } from "./Bouncer.js";
import { Circle } from "./Circle.js";

export class Dodecahedron extends Bouncer {
  static TEXTURE_KEY = "dodecahedron-spritesheet";
  static ANIM_KEY = "dodecahedron-spin";
  static FRAME_WIDTH = 75;
  static FRAME_HEIGHT = 75;
  static FRAME_COUNT = 12;
  static RADIUS = 37.5;
  static START_SPEED = 50;
  static MASS = Circle.MASS * 2;

  constructor(scene, x, y, opts = {}) {
    super(scene, x, y, Dodecahedron.TEXTURE_KEY, {
      speed: opts.speed ?? Dodecahedron.START_SPEED,
      radius: opts.radius ?? Dodecahedron.RADIUS,
    });
  }

  initializeBody() {
    super.initializeBody();
    this.play(Dodecahedron.ANIM_KEY);
    return this;
  }
}
