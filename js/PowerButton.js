import Phaser from "phaser";

export default class PowerButton extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, powerName = "SPECIAL") {
    super(scene, x, y, key);
    this.key = key;
    this.scene = scene;

    this.color = "#1592d5";
    this.hexColor = "0x1592d5";

    this.activeColor = "#008bd5";
    this.activeHexColor = "0x008bd5";
    this.sprite = scene.add
      .sprite(x, y, "special", 0)
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .setScale(2)
      .setTint(this.hexColor)
      .on("pointerup", this.onPointerUpHandler, this);
    this.sprite.setDepth(2);

    this.atkMin = 2;
    this.atkMax = 3;
    this.selected = false;
    this.cooldown = 5;
    this.turnsSinceUsed = 0;
    this.powerDesc = this.atkMin + " ~ " + this.atkMax;

    this.defDisplay = scene.add
      .text(x, y + 10, this.powerDesc, {
        font: "14px pearsoda",
        fill: this.color
      })
      .setOrigin(0.5, 0.5);
    this.defDisplay.setDepth(2);

    this.nameDisplay = scene.add
      .text(x, y - 2, powerName, {
        font: "20px pearsoda",
        fill: this.color
      })
      .setOrigin(0.5, 0.5);
    this.nameDisplay.setDepth(2);

    this.enabledParticles = this.scene.add
      .particles("bits")
      .setDepth(5)
      .createEmitter({
        x: x,
        y: y,
        angle: { min: 0, max: 360 },
        speed: 150,
        lifespan: 500,
        gravityY: 200,
        tint: 0x1592d5,
        scale: { start: 0.4, end: 0.0 },
        blendMode: "NORMAL",
        emitZone: {
          type: "edge",
          source: new Phaser.Geom.Rectangle(
            -this.sprite.displayWidth / 2,
            -this.sprite.displayHeight / 2,
            this.sprite.displayWidth,
            this.sprite.displayHeight
          ),
          quantity: 75
        }
      });

    this.disableButton();
  }
  resetTint() {
    this.sprite.alpha = 1;
    this.defDisplay.alpha = 1;
    this.nameDisplay.alpha = 1;
    this.nameDisplay.setFill(this.color);
    this.sprite.setTint(this.hexColor);
  }
  disableButton() {
    this.disabled = true;
    this.enabledParticles.stop();
    this.sprite.alpha = 0.5;
    this.defDisplay.alpha = 0.5;
    this.nameDisplay.alpha = 0.5;
    this.sprite.setTint(this.hexColor);
    this.nameDisplay.setFill(this.color);
    this.sprite.removeListener("pointerup");
  }
  enableButton() {
    this.disabled = false;
    this.enabledParticles.start();
    this.turnsSinceUsed = 0;
    this.resetTint();
    this.sprite.on("pointerup", this.onPointerUpHandler, this);
  }
  updateAtk(nAtkMin, nAtkMax) {
    this.atkMin = nAtkMin;
    this.atkMax = nAtkMax;
    this.powerDesc = this.atkMin + " ~ " + this.atkMax;
    this.defDisplay.setText(this.powerDesc);
  }

  onPointerDownHandler(pointer) {}

  onPointerUpHandler(pointer) {
    if (this.scene.playersTurn && this.scene.itemSelected === "") {
      if (!this.scene.powerSelected) {
        this.scene.powerSelected = true;
        this.sprite.clearTint();
        this.nameDisplay.setFill("#fafafa");
      } else {
        this.resetTint();
        this.scene.powerSelected = false;
      }
    }
  }
}
