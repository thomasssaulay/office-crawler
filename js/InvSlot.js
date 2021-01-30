import Phaser from "phaser";

export default class InvSlot extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);
    this.key = key;
    this.color = "#e6e125";
    this.hexColor = "0xe6e125";

    this.sprite = scene.add
      .sprite(x, y, "slot", 0)
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .setTint(this.hexColor)
      .setDepth(2)
      .setScale(1)
      .on("pointerup", this.onPointerUpHandler, this);

    this.holdedCard = null;
    this.selected = false;

    this.defDisplay = scene.add.text(x + 15, y - 24, "", {
      font: "16px pearsoda",
      fill: this.color
    });
    this.defDisplay.setDepth(2);

    this.nameDisplay = scene.add.text(x, y, "", {
      font: "16px pearsoda",
      fill: this.color
    });
    this.nameDisplay.setDepth(2);
    this.iconDisplay = null;
    this.nameDisplay.setOrigin(0.5, 0.4);
    this.infoDisplay = null;
  }

  insertCard(targetitemcard) {
    if (targetitemcard != null) {
      this.holdedCard = targetitemcard;
      this.sprite.setTexture("slotcard");
      this.nameDisplay.setText(this.holdedCard.name);

      if (this.holdedCard.type === 12) {
        this.iconDisplay = this.scene.add
          .sprite(this.sprite.x + 8, this.sprite.y - 16, "deficon")
          .setTint(this.hexColor);
        this.defDisplay.setText("+" + this.holdedCard.def);
      } else if (this.holdedCard.type === 10 || this.holdedCard.type === 11) {
        this.iconDisplay = this.scene.add
          .sprite(this.sprite.x + 8, this.sprite.y - 16, "atkicon")
          .setTint(this.hexColor);
        this.defDisplay.setText("+" + this.holdedCard.atk);
      } else {
        this.iconDisplay = null;
        this.defDisplay.setText("");
      }
      if (this.iconDisplay !== null) this.iconDisplay.setDepth(2);
      this.infoDisplay = this.scene.add
        .sprite(this.sprite.x, this.sprite.y - 48, "info")
        .setTint(this.hexColor)
        .setScale(2)
        .setInteractive()
        .setDepth(2)
        .on("pointerup", () => {
          this.openInfoBox();
        });
    }
  }

  openInfoBox() {
    if (this.scene.infoBoxDisplay === null) {
      this.scene.playersTurn = false;
      this.scene.infoBoxDisplay = this.scene.add
        .sprite(this.scene.gameWidth / 2, this.scene.gameHeight / 2, "infobox")
        .setTint(this.hexColor)
        .setInteractive()
        .setDepth(10)
        .on("pointerup", () => {
          this.closeInfoBox();
        });
      this.scene.infoBoxContent = this.scene.add
        .text(
          this.scene.infoBoxDisplay.x,
          this.scene.gameHeight / 2 - 32,
          this.holdedCard.desc,
          {
            font: "26px pearsoda",
            fill: this.color
          }
        )
        .setOrigin(0.5, 0)
        .setDepth(10);
      this.scene.infoBoxContentSprite = this.scene.add
        .sprite(
          this.scene.gameWidth / 2,
          this.scene.infoBoxDisplay.y -
            this.scene.infoBoxDisplay.displayHeight / 2 +
            48,
          this.holdedCard.charSpriteTextureName
        )
        .setTint(this.hexColor)
        .setScale(2)
        .setDepth(10);
    } else {
      this.closeInfoBox();
    }
  }

  closeInfoBox() {
    if (this.scene.infoBoxDisplay !== null) {
      this.scene.playersTurn = true;
      this.scene.infoBoxDisplay.destroy();
      this.scene.infoBoxDisplay = null;
      this.scene.infoBoxContent.destroy();
      this.scene.infoBoxContent = null;
      this.scene.infoBoxContentSprite.destroy();
      this.scene.infoBoxContentSprite = null;
    }
  }

  resetSlot() {
    this.holdedCard.destroy();
    this.holdedCard = null;
    this.resetTint();
    this.sprite.setTexture("slot");
    this.nameDisplay.setText("");
    this.defDisplay.setText("");
    if (this.infoDisplay != null) this.infoDisplay.destroy();
    if (this.iconDisplay != null) this.iconDisplay.destroy();
  }
  resetTint() {
    this.sprite.setTint(this.hexColor);
    this.defDisplay.setTint(this.hexColor);
    this.nameDisplay.setTint(this.hexColor);
    if (this.iconDisplay != null) this.iconDisplay.setTint(this.hexColor);
  }

  onPointerDownHandler(pointer) {}
  onPointerUpHandler(pointer) {
    this.sprite.setTint(this.hexColor);
    if (this.scene.playersTurn) {
      if (this.scene.itemSelected === "" && !this.scene.powerSelected) {
        if (this.holdedCard != null) {
          if (this.holdedCard.type === 10) {
            this.scene.itemShuriken(this.holdedCard.atk);
            this.resetSlot();
          } else if (this.holdedCard.type === 11) {
            this.scene.itemSelected = this.key;
            this.sprite.setTint(0xff7700);
            this.defDisplay.setTint(0xff7700);
            this.nameDisplay.setTint(0xff7700);
            if (this.iconDisplay != null) this.iconDisplay.setTint(0xff7700);
          } else if (this.holdedCard.type === 12) {
            this.scene.itemHeal(this.holdedCard.def);
            this.resetSlot();
          } else if (this.holdedCard.type === 13) {
            this.scene.itemPowerBuff(this.holdedCard.def);
            this.resetSlot();
          }
        }
      } else {
        this.resetTint();
        this.scene.itemSelected = "";
      }
    }
  }
  destroy() {
    this.nameDisplay.destroy();
    this.defDisplay.destroy();
    this.sprite.destroy();
    if (this.iconDisplay != null) this.iconDisplay.destroy();
  }
}
