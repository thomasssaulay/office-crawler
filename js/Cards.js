import Phaser from "phaser";

export default class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, atk, def, name) {
    super(scene, x, y, key);

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.index = key;
    this.def = def;
    this.atk = atk;
    this.name = name;
    this.category = "";
    this.isBoss = false;
    this.isInSight = false;
    this.nameDisplay = null;
    this.defDisplay = null;
    this.iconDisplay = null;

    this.idleAnimation = null;

    this.textDebug = scene.add.text(x, y, "", {
      font: "17px pearsoda",
      fill: "#FDA"
    });
    this.textDebug.setDepth(1);
    this.textDebug.setOrigin(0.5, 0.5);
    if (scene.debug) this.displayDebug();

    this.textureName = "card";
    this.sprite = scene.add
      .sprite(x, y, "card", 0)
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .setScale(2)
      .on("pointerdown", this.onPointerDownHandler, this)
      .on("pointerup", this.onPointerUpHandler, this);

    this.charSpriteTextureName = "";
    this.charSprite = null;
  }

  onPointerDownHandler() {}
  onPointerUpHandler() {}
  displayDebugText() {
    this.textDebug.setText(
      "Index : " +
        this.index +
        "\n" +
        this.name +
        "\nATK : " +
        this.atk +
        "\nDEF : " +
        this.def +
        "\n" +
        this.x +
        " " +
        this.y
    );
  }
  hideDebug() {
    this.textDebug.setText("");
  }

  update() {}

  updateInSight() {
    if (this.index !== this.scene.player.index) {
      if (
        (this.index === this.scene.player.index + 1 &&
          (this.scene.player.index + 1) % this.scene.nCol !== 0) ||
        (this.index === this.scene.player.index - 1 &&
          (this.scene.player.index - 1) % this.scene.nCol !==
            this.scene.nCol - 1) ||
        this.index === this.scene.player.index + this.scene.nCol ||
        this.index === this.scene.player.index - this.scene.nCol
      ) {
        this.isInSight = true;
        this.showCard();
      } else {
        this.isInSight = false;
        this.hideCard();
      }
    }
  }

  destroy() {
    this.sprite.destroy();
    this.textDebug.destroy();
    this.nameDisplay.destroy();

    if (typeof this.defDisplay !== "undefined" && this.defDisplay !== null)
      this.defDisplay.destroy();
    if (this.charSprite !== null) this.charSprite.destroy();

    if (this.iconDisplay !== null && this.category === "ItemCard") {
      this.iconDisplay.destroy();
    }
    if (this.idleAnimation !== null) {
      this.idleAnimation.stop();
    }
  }
  showCard() {
    this.sprite.alpha = 1;
    this.nameDisplay.alpha = 1;
    if (this.defDisplay !== null) this.defDisplay.alpha = 1;
    if (this.charSprite !== null) this.charSprite.alpha = 1;
    if (this.iconDisplay !== null) this.iconDisplay.alpha = 1;
  }
  hideCard() {
    this.sprite.alpha = 0.5;
    this.nameDisplay.alpha = 0.5;
    if (this.defDisplay !== null) this.defDisplay.alpha = 0.5;
    if (this.charSprite !== null) this.charSprite.alpha = 0.5;
    if (this.iconDisplay !== null) this.iconDisplay.alpha = 0.5;
  }
  startIdleAnimation() {
    if (this.charSprite !== null) {
      this.idleAnimation = this.scene.tweens.add({
        targets: this.charSprite,
        y: this.y - 3,
        ease: "Power3",
        duration: 700,
        yoyo: true,
        loop: -1
      });
    }
  }
}
