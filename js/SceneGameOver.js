import Phaser from "phaser";

export default class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: "SceneGameOver" });
  }

  init(params) {
    this.score = params.score;
    this.pb = localStorage.getItem("score");
  }

  preload() {
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

    if (this.score > this.pb) {
      localStorage.setItem("score", this.score);
      this.pb = this.score;
    }

    this.titleScreen = this.add
      .text(width / 2, 150, "YOU ARE\n   DEAD", {
        font: "bold 50pt doomed",
        color: "#da3c8f"
      })
      .setOrigin(0.5, 0.5);

    this.tweens.add({
      targets: this.titleScreen,
      y: 170,
      ease: "Sine.easeInOut",
      duration: 2000,
      yoyo: true,
      loop: -1
    });

    this.scoreDisplay = this.add
      .text(width / 2, 270, "Your score : " + this.score, {
        font: "bold 20pt pearsoda",
        color: "#da3c8f"
      })
      .setOrigin(0.5, 0.5);

    this.add
      .text(width / 2, 300, "Your best : " + this.pb, {
        font: "bold 20pt pearsoda",
        color: "#da3c8f"
      })
      .setOrigin(0.5, 0.5);

    this.startButton = this.add
      .text(width / 2, 350, "TRY AGAIN", {
        font: "bold 50pt pearsoda",
        color: "#fafafa"
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
    this.quitButton = this.add
      .text(width / 2, 450, "BACK TO MENU", {
        font: "bold 46pt pearsoda",
        color: "#fafafa"
      })
      .setOrigin(0.5, 0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => {
        this.quitButton.setColor("#aaaaaa");
      })
      .on("pointerdown", () => {
        this.quitButton.setColor("#aaaaaa");
      })
      .on("pointerout", () => {
        this.quitButton.setColor("#fafafa");
      })
      .on("pointerup", () => {
        this.scene.start("SceneMainMenu");
      });
  }
}
