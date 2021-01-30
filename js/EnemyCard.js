import Phaser from "phaser";
import Card from "./Cards";

export default class EnemyCard extends Card {
  constructor(scene, x, y, key, atk = 0, def = 0, name = null, isBoss = false) {
    super(scene, x, y, key, atk, def, name);
    this.isBoss = isBoss;
    this.scene = scene;

    const defOffsetX = -35;
    const defOffsetY = 60;

    const nameOffsetY = -30;

    this.category = "EnemyCard";
    if (isBoss) {
      this.color = "#d01208";
      this.hexColor = "0xd01208";

      // list is : [name, def, charSpriteName]
      const bossList = [
        ["C.E.O. Johnson", 8 + this.scene.pool * 2, "ceojohnson"],
        ["Linda from H.R.", 6 + this.scene.pool * 2, "lindafromhr"]
      ];

      const r = Phaser.Math.RND.pick(bossList);

      this.name = r[0];
      this.def = r[1];
      this.charSpriteTextureName = r[2];
    } else if (name === null || name === undefined) {
      this.color = "#da3c8f";
      this.hexColor = "0xda3c8f";

      // list is : [name, def, charSpriteName]
      const enList = [
        [
          ["I.T. Guy", 3, "itguy"],
          ["Photocop", 4, "photocop"],
          ["H.R. Assistant", 2, "hrassistant"],
          ["Intern", 1, "intern"]
        ],
        [
          ["I.T. Nerd", 4, "itguy"],
          ["FaxMan", 4, "faxman"],
          ["Cool Janitor", 3, "janitor"],
          ["Accountant", 2, "ceojohnson"]
        ],
        [
          ["Intern's Ghost", 5, "ghost"],
          ["Cool Janitor", 4, "janitor"],
          ["Head Accountant", 4, "ceojohnson"]
        ],
        [
          ["Janitor's Ghost", 6, "ghost"],
          ["Haunted Fax", 8, "faxman"],
          ["Fat Larry", 7, "itguy"]
        ],
        [
          ["Mad Secretary", 10, "hrassistant"],
          ["Possesed Intern", 8, "intern"],
          ["Nuclear Copier", 9, "photocop"]
        ]
      ];

      let curPool = this.scene.pool - 1;
      if (curPool >= enList.length - 1) {
        curPool = enList.length - 1;
      }

      const r = Phaser.Math.RND.pick(enList[curPool]);

      this.name = r[0];
      this.def = r[1];
      this.charSpriteTextureName = r[2];
    }
    this.charSprite = scene.add
      .sprite(x, y, this.charSpriteTextureName, 0)
      .setScale(2)
      .setTint(this.hexColor)
      .setOrigin(0.5, 0.55);

    this.sprite.setTint(this.hexColor);

    this.defDisplay = scene.add.text(x, y, this.def, {
      font: "22px pearsoda",
      fill: this.color
    });
    this.nameDisplay = scene.add.text(x, y, this.name, {
      font: "20px pearsoda",
      fill: this.color
    });
    if (this.def >= 10) this.defDisplay.setFontSize("20px");
    if (this.name.length > 10) this.nameDisplay.setFontSize("16px");

    this.defDisplay.setDisplayOrigin(
      this.defDisplay.displayWidth / 2 + defOffsetX,
      defOffsetY
    );
    this.nameDisplay.setDisplayOrigin(
      this.nameDisplay.displayWidth / 2,
      nameOffsetY
    );

    this.startIdleAnimation();
  }

  updateDef(ndef = null) {
    const defOffsetX = -35;
    const defOffsetY = 60;

    if (ndef === null) this.defDisplay.setText(this.def);
    else {
      this.def = ndef;

      this.defDisplay.setText(this.def);

      if (this.def >= 10) this.defDisplay.setFontSize("20px");
      else this.defDisplay.setFontSize("22px");

      this.defDisplay.setDisplayOrigin(
        this.defDisplay.displayWidth / 2 + defOffsetX,
        defOffsetY
      );
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
  onPointerUpHandler(pointer) {
    // this.sprite.setTint(0xffffff);

    this.scene.onCardPointerUpHandler(this.index, pointer);
  }
}
