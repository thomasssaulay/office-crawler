import Card from "./Cards";

export default class HealCard extends Card {
  constructor(scene, x, y, key, def, name) {
    super(scene, x, y, key, null, def, name);

    this.category = "HealCard";
    this.color = "#88c93b";
    this.hexColor = 0x88c93b;

    const defOffsetX = -25;
    const defOffsetY = 60;

    const nameOffsetY = -30;

    this.defDisplay = scene.add.text(x, y, "+" + this.def, {
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

    this.charSpriteTextureName = "ramen";

    this.charSprite = scene.add
      .sprite(x, y, this.charSpriteTextureName, 0)
      .setScale(2)
      .setTint(this.hexColor)
      .setOrigin(0.5, 0.6);

    this.sprite.setTint(this.hexColor);
  }

  displayDebug() {
    this.textDebug.setText(
      "Index : " +
        this.index +
        "\n" +
        this.name +
        "\nHEAL : " +
        this.def +
        "\n" +
        this.x +
        " " +
        this.y
    );
  }
  onPointerUpHandler(pointer) {
    this.scene.onCardPointerUpHandler(this.index, pointer);
  }
}
