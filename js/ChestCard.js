import Card from "./Cards";

export default class ItemCard extends Card {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    const defOffsetX = -30;
    const defOffsetY = 59;

    const nameOffsetY = -30;

    this.category = "ChestCard";
    this.color = "#e68125";
    this.hexColor = "0xe68125";
    this.name = "Lunchbox";
    this.defRequired = 9;
    this.def = 0;

    this.charSprite = scene.add
      .sprite(x, y, "chest", 0)
      .setScale(2)
      .setTint(this.hexColor)
      .setOrigin(0.5, 0.6);

    this.sprite.setTint(this.hexColor);

    this.nameDisplay = scene.add.text(x, y, this.name, {
      font: "20px pearsoda",
      fill: this.color
    });

    this.defDisplay = scene.add.text(x, y, this.defRequired, {
      font: "20px pearsoda",
      fill: this.color
    });

    this.defDisplay.setDisplayOrigin(defOffsetX, defOffsetY);
    this.nameDisplay.setDisplayOrigin(
      this.nameDisplay.displayWidth / 2,
      nameOffsetY
    );
  }

  updateDef(ndefreq = null) {
    const defOffsetX = -35;
    const defOffsetY = 60;

    if (ndefreq === null) this.defDisplay.setText(this.defRequired);
    else {
      this.defRequired = ndefreq;

      this.defDisplay.setText(this.defRequired);

      if (this.defRequired >= 10) this.defDisplay.setFontSize("20px");
      else this.defDisplay.setFontSize("22px");

      this.defDisplay.setDisplayOrigin(
        this.defDisplay.displayWidth / 2 + defOffsetX,
        defOffsetY
      );
    }
  }

  onPointerUpHandler(pointer) {
    this.scene.onCardPointerUpHandler(this.index, pointer);
  }
}
