export class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }

  preload() {
    this.load.atlas(
      "dodecahedron-spritesheet",
      "./assets/spritesheet.png",
      "./assets/spritesheet.json",
    );
  }

  create() {
    if (!this.anims.exists("dodecahedron-spin")) {
      this.anims.create({
        key: "dodecahedron-spin",
        frames: this.anims.generateFrameNames("dodecahedron-spritesheet", {
          prefix: "dodecahedron_",
          start: 0,
          end: 11,
          zeroPad: 2,
        }),
        frameRate: 5,
        repeat: -1,
      });
    }

    this.scene.start("PlayScene");
  }
}
