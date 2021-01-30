import Phaser from "phaser";

import SceneGameOver from "./SceneGameOver";
import SceneSplash from "./SceneSplash";
import SceneMainMenu from "./SceneMainMenu";
import SceneMain from "./SceneMain";

const config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  pixelArt: true,
  roundPixel: true,
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "game-container",
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  parent: "game-container",
  backgroundColor: "#101010",
  scene: [SceneSplash, SceneMainMenu, SceneMain, SceneGameOver]
};

new Phaser.Game(config);
