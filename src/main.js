import { BootScene } from "./scenes/BootScene.js";
import { PlayScene } from "./scenes/PlayScene.js";

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: "game-root",
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: "#111111",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  scene: [BootScene, PlayScene],
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
});

function resizeGame() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  game.scale.resize(width, height);

  const playScene = game.scene.getScene("PlayScene");
  if (playScene && playScene.scene.isActive()) {
    playScene.handleResize(width, height);
  }
}

window.addEventListener("resize", resizeGame);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {
      // Ignore registration failures to avoid UI overlays/log spam in-app.
    });
  });
}
