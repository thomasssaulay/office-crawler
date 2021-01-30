import PlayerCard from "./PlayerCard";
import EnemyCard from "./EnemyCard";
import HealCard from "./HealCard";
import ItemCard from "./ItemCard";
import ChestCard from "./ChestCard";
import InvSlot from "./InvSlot";
import PowerButton from "./PowerButton";

export function initPreload(scene) {
  scene.load.setPath("./assets/sprites");
  scene.load.image("playersprite", "player/player.png");
  scene.load.image("back", "./assets/sprites/ui/ui_back.png");

  // UI PRELOAD
  scene.load.image("card", "ui/ui_card.png");
  scene.load.image("cardplayer", "ui/ui_cardplayer.png");
  scene.load.image("cardback", "ui/ui_cardback.png");
  scene.load.image("slot", "ui/ui_slot.png");
  scene.load.image("slotcard", "ui/ui_slotcard.png");
  scene.load.image("deficon", "ui/ui_deficon.png");
  scene.load.image("atkicon", "ui/ui_atkicon.png");
  scene.load.image("special", "ui/ui_special.png");
  scene.load.image("score", "ui/ui_score.png");
  scene.load.image("quit", "ui/ui_quit.png");
  scene.load.image("info", "ui/ui_info.png");
  scene.load.image("infobox", "ui/ui_infobox.png");

  // ENEMIES PRELOAD
  scene.load.image("itguy", "enemies/en_itguy.png");
  scene.load.image("intern", "enemies/en_intern.png");
  scene.load.image("photocop", "enemies/en_photocop.png");
  scene.load.image("ceojohnson", "enemies/en_ceojohnson.png");
  scene.load.image("lindafromhr", "enemies/en_lindafromhr.png");
  scene.load.image("hrassistant", "enemies/en_hrassistant.png");
  scene.load.image("ghost", "enemies/en_ghost.png");
  scene.load.image("janitor", "enemies/en_janitor.png");
  scene.load.image("faxman", "enemies/en_faxman.png");

  // ITEMS PRELOAD
  scene.load.image("stapler", "items/it_stapler.png");
  scene.load.image("chest", "items/it_chest.png");
  scene.load.image("scissors", "items/it_scissors.png");
  scene.load.image("plant", "items/it_plant.png");
  scene.load.image("cofee", "items/it_cofee.png");
  scene.load.image("proteinbar", "items/it_proteinbar.png");
  scene.load.image("paperball", "items/it_paperball.png");

  // HEAL PRELOAD
  scene.load.image("ramen", "heal/hl_ramen.png");

  // PARTICLES PRELOAD
  scene.load.image("bits", "particles/pt_bits.png");
  scene.load.image("clip", "particles/pt_clip.png");
}

export function initVars(scene) {
  scene.cameraWidth = 0;
  scene.cameraHeight = 0;
  scene.background = null;
  scene.cardPadding = 10;
  scene.cardWidth = 100;
  scene.cardHeight = 142;
  scene.cardArr = [];
  scene.playerStarterIndex = 4;
  scene.player = null;
  scene.nRow = 3;
  scene.nCol = 3;
  scene.seed = "";
  scene.curCardIndex = 0;
  scene.score = 0;
  scene.gameOffsetX = 0;
  scene.gameOffsetY = 0;
  scene.pool = 1;
  scene.itemDisplay = [];
  scene.nTour = 0;
  scene.playersTurn = true;
  scene.itemSelected = "";
  scene.powerSelected = false;

  scene.explodingParticles = null;
  scene.explodingBossParticles = null;
  scene.slashingParticles = null;
  scene.healParticles = null;

  scene.powerButtonDisplay = null;
  scene.quitDisplay = null;
  scene.scoreDisplay = null;
  scene.roundDisplay = null;
  scene.infoBoxDisplay = null;
}

export function initCardArray(scene, cardArr, col, row, offX, offY) {
  console.log("----GENERATING-NEW-LEVEL----");
  scene.seed = scene.generateSeed();
  console.log("THE SEED IS : " + scene.seed);

  for (let y = 0; y < row; y++) {
    for (let x = 0; x < col; x++) {
      if (scene.seed[scene.curCardIndex] === "p") {
        cardArr.push(
          (scene.player = new PlayerCard(
            scene,
            offX + scene.cardPadding * (x + 1) + scene.cardWidth * x,
            offY + scene.cardPadding * (y + 1) + scene.cardHeight * y,
            scene.curCardIndex,
            2,
            12,
            "Player"
          ))
        );
      } else if (scene.seed[scene.curCardIndex] === "h") {
        cardArr.push(
          new HealCard(
            scene,
            offX + scene.cardPadding * (x + 1) + scene.cardWidth * x,
            offY + scene.cardPadding * (y + 1) + scene.cardHeight * y,
            scene.curCardIndex,
            5,
            "Ramen"
          )
        );
      } else if (scene.seed[scene.curCardIndex] === "i") {
        cardArr.push(
          new ItemCard(
            scene,
            offX + scene.cardPadding * (x + 1) + scene.cardWidth * x,
            offY + scene.cardPadding * (y + 1) + scene.cardHeight * y,
            scene.curCardIndex
          )
        );
      } else if (scene.seed[scene.curCardIndex] === "c") {
        cardArr.push(
          new ChestCard(
            scene,
            offX + scene.cardPadding * (x + 1) + scene.cardWidth * x,
            offY + scene.cardPadding * (y + 1) + scene.cardHeight * y,
            scene.curCardIndex
          )
        );
      } else {
        cardArr.push(
          new EnemyCard(
            scene,
            offX + scene.cardPadding * (x + 1) + scene.cardWidth * x,
            offY + scene.cardPadding * (y + 1) + scene.cardHeight * y,
            scene.curCardIndex
          )
        );
      }
      scene.curCardIndex++;
    }
  }

  this.showRoundScreen(scene);
  scene.flipCardsRoutine();
}

export function initItemDisplay(scene) {
  for (let i = 0; i < scene.player.maxInvSlots; i++) {
    scene.itemDisplay.push(
      new InvSlot(
        scene,
        scene.gameWidth / 2 - 110 + i * 110,
        scene.gameHeight - 40,
        i
      )
    );
  }
}

export function initHudDisplay(scene) {
  scene.scoreHudDisplay = scene.add
    .sprite(scene.gameOffsetX + 32, 45, "score")
    .setScale(2)
    .setTint("0x008bd5");

  scene.scoreDisplay = scene.add.text(
    scene.gameOffsetX - 16,
    35,
    "SCORE : " + scene.score,
    {
      font: "20px pearsoda",
      fill: "#008bd5"
    }
  );
  scene.powerButtonDisplay = new PowerButton(
    scene,
    scene.gameWidth / 2 + 48,
    45,
    "power-button",
    "SPECIAL"
  );
  scene.quitDisplay = scene.add
    .sprite(scene.gameWidth - 48, 45, "quit")
    .setTint(0x008bd5)
    .setScale(2)
    .setInteractive()
    .on("pointerup", () => {
      scene.scene.start("SceneMainMenu");
    });
}

export function initRoundDisplay(scene) {
  scene.roundDisplay = scene.add.text(
    0,
    scene.gameHeight / 2 - 50,
    "FLOOR " + scene.pool,
    {
      font: "65px doomed",
      fill: "#d01208",
      shadow: {
        offsetX: -4,
        offsetY: 4,
        color: "#101010",
        blur: 1,
        stroke: true,
        fill: true
      }
    }
  );
  scene.roundDisplay.x = -scene.roundDisplay.width;
  scene.roundDisplay.angle = -6;
  scene.roundDisplay.setDepth(5);
}

export function initParticles(scene) {
  scene.explodingParticles = scene.add
    .particles("bits")
    .setDepth(5)
    .createEmitter({
      angle: { min: 0, max: 360 },
      speed: 100,
      lifespan: 250,
      scale: { start: 1, end: 0.0 },
      blendMode: "NORMAL",
      quantity: 50,
      on: false
    });
  scene.explodingBossParticles = scene.add
    .particles("bits")
    .setDepth(5)
    .createEmitter({
      angle: { min: 0, max: 360 },
      speed: 100,
      lifespan: 1550,
      tint: 0xda3c8f,
      scale: { start: 1.2, end: 0.0 },
      blendMode: "NORMAL",
      quantity: 100,
      on: false
    });
  scene.slashingParticles = scene.add.particles("bits").setDepth(5);
  scene.slashingParticles = scene.slashingParticles.createEmitter({
    angle: { min: 0, max: 100 },
    speed: 100,
    lifespan: 250,
    tint: 0xda3c8f,
    scale: { start: 1, end: 0.0 },
    blendMode: "NORMAL",
    quantity: 20,
    on: false
  });
  scene.healParticles = scene.add
    .particles("bits")
    .setDepth(5)
    .createEmitter({
      angle: { min: 0, max: 360 },
      speed: 100,
      lifespan: 800,
      gravityY: -800,
      tint: 0x88c93b,
      scale: { start: 0.5, end: 0.0 },
      blendMode: "NORMAL",
      quantity: 100,
      on: false
    });
}

export function destroyCardArray(scene, cardArr) {
  scene.updateHud(0);
  scene.nTour = 0;
  for (let i = 0; i < cardArr.length; i++) {
    cardArr[i].destroy();
  }
  cardArr = [];
  scene.cardArr = cardArr;
  scene.player = null;
  scene.curCardIndex = 0;
  scene.score = 0;
}

export function destroyItemDisplay(scene) {
  for (let i = 0; i < scene.player.maxInvSlots; i++) {
    scene.itemDisplay[i].holdedCard = null;
    scene.itemDisplay[i].destroy();
  }
  scene.itemDisplay = [];
}

export function showRoundScreen(scene) {
  scene.playersTurn = false;
  scene.roundDisplay.setText("FLOOR " + scene.pool);
  var timeline = scene.tweens.createTimeline();

  timeline.add({
    targets: scene.roundDisplay,
    x: scene.gameWidth / 2 - scene.roundDisplay.width / 2,
    ease: "Power2",
    duration: 1000,
    onUpdate: function () {}
  });
  timeline.add({
    targets: scene.roundDisplay,
    x: scene.gameWidth / 2 - scene.roundDisplay.width / 2,
    ease: "Power2",
    duration: 1000
  });
  timeline.add({
    targets: scene.roundDisplay,
    x: scene.gameWidth,
    ease: "Power1",
    duration: 1000,
    onCompleteScope: this,
    onComplete: function () {
      scene.playersTurn = true;
    }
  });
  timeline.play();
}
