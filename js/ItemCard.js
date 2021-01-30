import Phaser from "phaser";
import Card from "./Cards";

export default class ItemCard extends Card {
  constructor(scene, x, y, key, atk = 0, def = 0, objid = null) {
    super(scene, x, y, key, atk, def, objid);

    const defOffsetX = -26;
    const defOffsetY = 60;

    const nameOffsetY = -30;

    const iconOffsetX = -8;
    const iconOffsetY = 58;

    this.category = "ItemCard";
    this.color = "#e6e125";
    this.hexColor = "0xe6e125";

    // TODO :  JSON list
    // TYPE : 10 -> 4-way damage
    //        11 -> 1-way damage
    //        12 -> heal
    //        13 -> power atk buff
    const itemList = [
      [
        10,
        "Stapler",
        0,
        2,
        "stapler",
        "A gorgeous office\nstapler. I love it.\n\nCan shoot in every\nfour directions!"
      ],
      [
        11,
        "Paper ball",
        0,
        1,
        "paperball",
        "A simple ball made of\nrecycled printing paper.\n\nBetter throw it\nin somebody's face ! "
      ],
      [
        11,
        "Paper ball",
        0,
        2,
        "paperball",
        "A simple ball made of\nrecycled printing paper.\n\nBetter throw it\nin somebody's face ! "
      ],
      [
        12,
        "Medium cofee",
        2,
        0,
        "cofee",
        "A disgusting coffee\nmade by a machine.\n\nDrinking it will grant\nyou some health points"
      ],
      [
        11,
        "Scissors",
        0,
        3,
        "scissors",
        "Careful! The tip\nis not rounded!\n\nThe perfect weapon to\nassault a coworker."
      ],
      [
        13,
        "Protein bar",
        2,
        0,
        "proteinbar",
        "Can get stuck\ninside your tooth...\n\nYour special attack\nwill be buffed!."
      ],
      [
        10,
        "Stapler",
        0,
        1,
        "stapler",
        "A gorgeous office\nstapler. I love it.\n\nCan shoot in every\nfour directions!"
      ],
      [
        11,
        "Plastic plant",
        0,
        3,
        "plant",
        "An Aloe Vera made\nof cheap plastic.\n\nBetter throw it\nin somebody's face ! "
      ],
      [
        11,
        "Plastic plant",
        0,
        4,
        "plant",
        "An Aloe Vera made\nof cheap plastic.\n\nBetter throw it\nin somebody's face ! "
      ],
      [
        12,
        "Large cofee",
        3,
        0,
        "cofee",
        "A disgusting coffee\nmade by a machine.\n\nDrinking it will grant\nyou some health points"
      ],
      [
        11,
        "Scissors",
        0,
        4,
        "scissors",
        "Careful! The tip\nis not rounded!\n\nThe perfect weapon to\nassault a coworker."
      ]
    ];

    if (objid === null || objid === undefined) {
      let r = Phaser.Math.RND.pick(itemList);

      this.type = r[0];
      this.name = r[1];
      this.def = r[2];
      this.atk = r[3];
      this.charSpriteTextureName = r[4];
      this.desc = r[5];
    } else {
      this.type = itemList[objid][0];
      this.name = itemList[objid][1];
      this.def = itemList[objid][2];
      this.atk = itemList[objid][3];
      this.charSpriteTextureName = itemList[objid][4];
      this.desc = itemList[objid][5];
    }
    this.charSprite = scene.add
      .sprite(x, y, this.charSpriteTextureName, 0)
      .setScale(2)
      .setTint(this.hexColor)
      .setOrigin(0.5, 0.6);

    if (this.type === 12) {
      this.iconDisplay = scene.add
        .sprite(x, y, "deficon")
        .setTint(this.hexColor);
      this.defDisplay = scene.add.text(x, y, "+" + this.def, {
        font: "20px pearsoda",
        fill: this.color
      });
    } else if (this.type === 10 || this.type === 11) {
      this.iconDisplay = scene.add
        .sprite(x, y, "atkicon")
        .setTint(this.hexColor);
      this.defDisplay = scene.add.text(x, y, "+" + this.atk, {
        font: "22px pearsoda",
        fill: this.color
      });
    } else {
      this.iconDisplay = null;
      this.defDisplay = null;
    }

    this.sprite.setTint(this.hexColor);

    if (this.name.length > 10) {
      this.nameDisplay = scene.add.text(x, y, this.name, {
        font: "16px pearsoda",
        fill: this.color
      });
    } else {
      this.nameDisplay = scene.add.text(x, y, this.name, {
        font: "20px pearsoda",
        fill: this.color
      });
    }

    if (this.iconDisplay !== null)
      this.iconDisplay.setDisplayOrigin(iconOffsetX, iconOffsetY);
    if (this.defDisplay !== null)
      this.defDisplay.setDisplayOrigin(defOffsetX, defOffsetY);
    this.nameDisplay.setDisplayOrigin(
      this.nameDisplay.displayWidth / 2,
      nameOffsetY
    );
  }

  displayDebug() {
    this.textDebug.setText(
      "Index : " +
        this.index +
        "\nITEM\n" +
        this.name +
        "\n+" +
        this.atk +
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
