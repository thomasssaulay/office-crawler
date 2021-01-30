import Phaser from "phaser";

export default class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: "SceneMainMenu" });
  }

  preload() {
    this.load.image("title", "./assets/title.png");
    this.load.image("back", "./assets/sprites/ui/ui_back.png");
  }

  create() {
    const { width, height } = this.sys.game.config;

    this.background = this.add
      .image(width / 2, height / 2, "back")
      .setAlpha(0.1)
      .setOrigin(0.5, 0.5);
    this.tweens.add({
      targets: this.background,
      y: 640,
      x: 360,
      ease: "Sine.easeInOut",
      duration: 8000,
      yoyo: true,
      loop: -1
    });

    this.titleScreen = this.add
      .sprite(width / 2, 150, "title")
      .setOrigin(0.5, 0.5);

    this.tweens.add({
      targets: this.titleScreen,
      y: 170,
      ease: "Sine.easeInOut",
      duration: 2000,
      yoyo: true,
      loop: -1
    });

    this.startButton = this.add
      .text(width / 2, height / 2 + 70, "START GAME", {
        font: "bold 45pt pearsoda",
        color: "#fafafa",
        shadow: {
          offsetX: -2,
          offsetY: 2,
          color: "#d01208",
          blur: 0,
          stroke: true,
          fill: true
        }
      })
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => {
        this.startButton.setColor("#aaaaaa");
      })
      .on("pointerdown", () => {
        this.startButton.setColor("#aaaaaa");
      })
      .on("pointerout", () => {
        this.startButton.setColor("#fafafa");
      })
      .on("pointerup", () => {
        this.scene.start("SceneMain");
      });

    this.add.text(width - 250, height - 50, "3D RAMEN - build 08 OCT '20", {
      font: "15pt pearsoda",
      color: "#da3c8f"
    });
  }
}
