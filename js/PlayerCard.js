import Card from "./Cards";

export default class PlayerCard extends Card {
  constructor(scene, x, y, key, atk, def, name) {
    super(scene, x, y, key, atk, def, name);

    this.maxDef = 12;
    this.maxInvSlots = 3;
    this.itemList = [];
    this.inSightIndexes = [];

    const defOffsetX = 18;
    const defOffsetY = 61;

    const nameOffsetY = -30;

    this.category = "PlayerCard";
    this.color = "#1592d5";
    this.hexColor = "0x1592d5";

    this.charSprite = scene.add
      .sprite(x, y, "playersprite", 0)
      .setScale(2)
      .setTint(this.hexColor)
      .setOrigin(0.5, 0.5);

    this.textureName = "cardplayer";
    this.sprite.setTint(this.hexColor);

    this.defDisplay = scene.add.text(x, y, this.def + "/" + this.maxDef, {
      font: "22px pearsoda",
      fill: this.color
    });
    this.defDisplay.setDisplayOrigin(defOffsetX, defOffsetY);

    this.nameDisplay = scene.add.text(x, y, this.name, {
      font: "20px pearsoda",
      fill: this.color
    });
    this.nameDisplay.setDisplayOrigin(
      this.nameDisplay.displayWidth / 2,
      nameOffsetY
    );

    this.startIdleAnimation();
  }

  updateDef() {
    if (this.def < 10) {
      this.defDisplay.setText(" " + this.def + "/" + this.maxDef);
    } else {
      this.defDisplay.setText(this.def + "/" + this.maxDef);
    }
  }

  displayDebug() {
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
  onPointerUpHandler() {}
}
