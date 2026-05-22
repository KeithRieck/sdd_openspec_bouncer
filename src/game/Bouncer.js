export class Bouncer extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, textureKey, opts = {}) {
    super(scene, x, y, textureKey);
    this._speed = opts.speed ?? 200;
    this._radius = opts.radius ?? 25;
  }

  get speed() {
    return this._speed;
  }

  get radius() {
    return this._radius;
  }

  initializeBody() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setBounce(1, 1);

    this.syncCollisionBody();
    return this;
  }

  setHeading(angleRad) {
    this.body.setVelocity(
      Math.cos(angleRad) * this._speed,
      Math.sin(angleRad) * this._speed,
    );
    return this;
  }

  setRandomHeading() {
    const angle = Phaser.Math.FloatBetween(0, Math.PI * 2);
    return this.setHeading(angle);
  }

  renormalizeSpeed() {
    const vx = this.body.velocity.x;
    const vy = this.body.velocity.y;
    const mag = Math.hypot(vx, vy);

    if (mag === 0) {
      return this.setRandomHeading();
    }

    const scale = this._speed / mag;
    this.body.setVelocity(vx * scale, vy * scale);
    return this;
  }

  clampToBounds(worldWidth, worldHeight) {
    const clampedX = Phaser.Math.Clamp(this.x, this._radius, worldWidth - this._radius);
    const clampedY = Phaser.Math.Clamp(this.y, this._radius, worldHeight - this._radius);
    this.setPosition(clampedX, clampedY);
    return this;
  }

  syncCollisionBody() {
    const size = this._radius * 2;
    this.body.setCircle(this._radius);
    this.body.setSize(size, size);
    this.body.setOffset(
      (this.width - size) / 2,
      (this.height - size) / 2,
    );
    return this;
  }
}
