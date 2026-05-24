import { Circle } from "../game/Circle.js";
import { Dodecahedron } from "../game/Dodecahedron.js";
import { SmallCircle } from "../game/SmallCircle.js";

const CIRCLE_COUNT = 16;
const SMALL_CIRCLE_COUNT = 32;
const DODECAHEDRON_COUNT = 4;
const MAX_SPAWN_RETRIES = 200;
const DEFAULT_NORMAL_X = 1;
const DEFAULT_NORMAL_Y = 0;

export class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
    this.circles = [];
  }

  create() {
    this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height);
    if (!this.textures.exists(Dodecahedron.TEXTURE_KEY)) {
      throw new Error("Missing dodecahedron spritesheet texture.");
    }

    this.spawnEntities(Circle, CIRCLE_COUNT);
    this.spawnEntities(SmallCircle, SMALL_CIRCLE_COUNT);
    this.spawnEntities(Dodecahedron, DODECAHEDRON_COUNT);

    this.physics.add.overlap(this.circles, this.circles, (a, b) => {
      if (a === b) {
        return;
      }
      this.resolveMassWeightedCollision(a, b);
    });
  }

  update() {
    for (const circle of this.circles) {
      circle.clampToBounds(this.scale.width, this.scale.height);
    }
  }

  handleResize(width, height) {
    this.physics.world.setBounds(0, 0, width, height);

    for (const circle of this.circles) {
      circle.clampToBounds(width, height);
    }
  }

  spawnEntities(CircleClass, count) {
    for (let i = 0; i < count; i += 1) {
      const radius = CircleClass.RADIUS;
      const { x, y } = this.findSpawnPoint(radius);
      const circle = new CircleClass(this, x, y).initializeBody();

      circle.setRandomHeading();
      this.circles.push(circle);
    }
  }

  findSpawnPoint(radius) {
    const minX = radius;
    const maxX = Math.max(radius, this.scale.width - radius);
    const minY = radius;
    const maxY = Math.max(radius, this.scale.height - radius);

    let fallbackX = Phaser.Math.Between(minX, maxX);
    let fallbackY = Phaser.Math.Between(minY, maxY);

    for (let attempt = 0; attempt < MAX_SPAWN_RETRIES; attempt += 1) {
      const x = Phaser.Math.Between(minX, maxX);
      const y = Phaser.Math.Between(minY, maxY);

      fallbackX = x;
      fallbackY = y;

      if (!this.overlapsExisting(x, y, radius)) {
        return { x, y };
      }
    }

    return { x: fallbackX, y: fallbackY };
  }

  overlapsExisting(x, y, radius) {
    for (const circle of this.circles) {
      const minDistance = radius + circle.radius;
      const dx = circle.x - x;
      const dy = circle.y - y;
      const distance = Math.hypot(dx, dy);

      if (distance < minDistance) {
        return true;
      }
    }

    return false;
  }

  resolveMassWeightedCollision(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    let distance = Math.hypot(dx, dy);

    let nx = DEFAULT_NORMAL_X;
    let ny = DEFAULT_NORMAL_Y;

    if (distance > 0) {
      nx = dx / distance;
      ny = dy / distance;
    } else {
      distance = 0;
    }

    const overlap = a.radius + b.radius - distance;
    if (overlap > 0) {
      const separate = overlap / 2;
      a.x -= nx * separate;
      a.y -= ny * separate;
      b.x += nx * separate;
      b.y += ny * separate;
      a.body.updateFromGameObject();
      b.body.updateFromGameObject();
    }

    const rvx = b.body.velocity.x - a.body.velocity.x;
    const rvy = b.body.velocity.y - a.body.velocity.y;
    const normalVelocity = rvx * nx + rvy * ny;

    if (normalVelocity >= 0) {
      return;
    }

    const tx = -ny;
    const ty = nx;

    const v1n = a.body.velocity.x * nx + a.body.velocity.y * ny;
    const v1t = a.body.velocity.x * tx + a.body.velocity.y * ty;
    const v2n = b.body.velocity.x * nx + b.body.velocity.y * ny;
    const v2t = b.body.velocity.x * tx + b.body.velocity.y * ty;

    const m1 = a.mass;
    const m2 = b.mass;

    const v1nAfter = (v1n * (m1 - m2) + 2 * m2 * v2n) / (m1 + m2);
    const v2nAfter = (v2n * (m2 - m1) + 2 * m1 * v1n) / (m1 + m2);

    const v1x = v1nAfter * nx + v1t * tx;
    const v1y = v1nAfter * ny + v1t * ty;
    const v2x = v2nAfter * nx + v2t * tx;
    const v2y = v2nAfter * ny + v2t * ty;

    a.body.setVelocity(v1x, v1y);
    b.body.setVelocity(v2x, v2y);

    a.clampToBounds(this.scale.width, this.scale.height);
    b.clampToBounds(this.scale.width, this.scale.height);
  }
}
