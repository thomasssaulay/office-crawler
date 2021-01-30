import Phaser from "phaser";

export default class SceneSplash extends Phaser.Scene {
  constructor() {
    super({ key: "SceneSplash" });
  }

  preload() {
    this.load.image("splash", "./assets/splash.png");
  }

  create() {
    const { width, height } = this.sys.game.config;

    let splash = this.add
      .image(width / 2, height / 2, "splash")
      .setOrigin(0.5, 0.5);

    this.tweens.addCounter({
      from: 255,
      to: 0,
      duration: 150,
      onUpdate: function (tween) {
        var value = Math.floor(tween.getValue());

        splash.setTint(Phaser.Display.Color.GetColor(value, -value, value));
      },
      yoyo: true,
      loop: 5,
      onComplete: function () {
        this.scene.start("SceneMainMenu");
      },
      onCompleteScope: this
    });
  }
}
