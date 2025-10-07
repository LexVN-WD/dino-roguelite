import Phaser from "phaser";

const GAME_W = 960;
const GAME_H = 540;

/**
 * Scene lifecycle:
 * - preload(): load/generate assets
 * - create(): place things
 * - update(): runs every frame
 */
class MainScene extends Phaser.Scene {
  private t = 0;

  constructor() {
    super("main");
  }

  preload() {
    // generate a tiny green circle texture (no external files needed)
    const g = this.add.graphics();
    g.fillStyle(0x57ff88, 1);
    g.fillCircle(12, 12, 12);
    g.generateTexture("dino", 24, 24);
    g.destroy();
  }

  create() {
    this.cameras.main.setBackgroundColor("#0f0f12");
    this.add.text(GAME_W / 2, 60, "Dino Roguelite", { fontSize: "32px", color: "#ffffff" }).setOrigin(0.5);

    const dino = this.add.image(GAME_W / 2, GAME_H / 2, "dino");
    dino.setName("player");
  }

  update(_time: number, dtMs: number) {
    const dt = dtMs / 1000;
    this.t += dt;
    const dino = this.children.getByName("player") as Phaser.GameObjects.Image;
    if (dino) dino.y = GAME_H / 2 + Math.sin(this.t * 2) * 10; // gentle bob to prove the loop
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  width: GAME_W,
  height: GAME_H,
  parent: "app",
  backgroundColor: "#0f0f12",
  pixelArt: true, // keeps Aseprite pixels crisp later
  scene: [MainScene],
});
