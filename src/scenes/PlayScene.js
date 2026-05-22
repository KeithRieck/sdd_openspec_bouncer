import { Circle } from "../game/Circle.js";

const CIRCLE_COUNT = 64;
const CIRCLE_DIAMETER = 50;
const CIRCLE_RADIUS = CIRCLE_DIAMETER / 2;
const SPEED = 200;
const MAX_SPAWN_RETRIES = 200;

export class PlayScene extends Phaser.Scene {
  constructor() {
    super("PlayScene");
    this.circles = [];
  }

  create() {
    this.physics.world.setBounds(0, 0, this.scale.width, this.scale.height);

    this.spawnCircles();

    this.physics.add.collider(this.circles, this.circles, (a, b) => {
      a.renormalizeSpeed();
      b.renormalizeSpeed();
    });
  }

  update() {
    for (const circle of this.circles) {
      circle.renormalizeSpeed();
      circle.clampToBounds(this.scale.width, this.scale.height);
    }
  }

  handleResize(width, height) {
    this.physics.world.setBounds(0, 0, width, height);

    for (const circle of this.circles) {
      circle.clampToBounds(width, height);
      circle.renormalizeSpeed();
    }
  }

  spawnCircles() {
    this.circles.length = 0;

    for (let i = 0; i < CIRCLE_COUNT; i += 1) {
      const { x, y } = this.findSpawnPoint();
      const circle = new Circle(this, x, y, {
        speed: SPEED,
        diameter: CIRCLE_DIAMETER,
      }).initializeBody();

      circle.setRandomHeading();
      this.circles.push(circle);
    }
  }

  findSpawnPoint() {
    const minX = CIRCLE_RADIUS;
    const maxX = Math.max(CIRCLE_RADIUS, this.scale.width - CIRCLE_RADIUS);
    const minY = CIRCLE_RADIUS;
    const maxY = Math.max(CIRCLE_RADIUS, this.scale.height - CIRCLE_RADIUS);

    let fallbackX = Phaser.Math.Between(minX, maxX);
    let fallbackY = Phaser.Math.Between(minY, maxY);

    for (let attempt = 0; attempt < MAX_SPAWN_RETRIES; attempt += 1) {
      const x = Phaser.Math.Between(minX, maxX);
      const y = Phaser.Math.Between(minY, maxY);

      fallbackX = x;
      fallbackY = y;

      if (!this.overlapsExisting(x, y)) {
        return { x, y };
      }
    }

    return { x: fallbackX, y: fallbackY };
  }

  overlapsExisting(x, y) {
    const minDistance = CIRCLE_DIAMETER;

    for (const circle of this.circles) {
      const dx = circle.x - x;
      const dy = circle.y - y;
      const distance = Math.hypot(dx, dy);

      if (distance < minDistance) {
        return true;
      }
    }

    return false;
  }
}
