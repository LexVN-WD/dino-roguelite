import Phaser from "phaser";

const GAME_W = 960;
const GAME_H = 540;

/**
 * WASD movement:
 * - dt for frame independence
 * - normalize input so diagonals aren't faster
 * - clamp to canvas bounds
 */
class MainScene extends Phaser.Scene {
  private keys!: Record<"W"|"A"|"S"|"D", Phaser.Input.Keyboard.Key>;
  private player!: Phaser.GameObjects.Image;
  private speed = 180;

  constructor() { super("main"); }

  preload() {
    const g = this.add.graphics();
    g.fillStyle(0x57ff88, 1);
    g.fillCircle(12, 12, 12);
    g.generateTexture("dino", 24, 24);
    g.destroy();
  }

  create() {
    this.cameras.main.setBackgroundColor("#0f0f12");
    this.add.text(GAME_W / 2, 60, "Dino Roguelite", { fontSize: "32px", color: "#ffffff" }).setOrigin(0.5);
    this.player = this.add.image(GAME_W / 2, GAME_H / 2, "dino").setName("player");
    this.keys = this.input.keyboard!.addKeys({ W: "W", A: "A", S: "S", D: "D" }) as any;
  }

  update(_time: number, dtMs: number) {
    const dt = dtMs / 1000;
    const ix = (this.keys.D.isDown ? 1 : 0) - (this.keys.A.isDown ? 1 : 0);
    const iy = (this.keys.S.isDown ? 1 : 0) - (this.keys.W.isDown ? 1 : 0);

    let vx = 0, vy = 0;
    if (ix || iy) {
      const len = Math.hypot(ix, iy);
      vx = (ix / len) * this.speed;
      vy = (iy / len) * this.speed;
    }

    const nx = Phaser.Math.Clamp(this.player.x + vx * dt, 12, GAME_W - 12);
    const ny = Phaser.Math.Clamp(this.player.y + vy * dt, 12, GAME_H - 12);
    this.player.setPosition(nx, ny);
  }
}

new Phaser.Game({
  type: Phaser.AUTO,
  width: GAME_W,
  height: GAME_H,
  parent: "app",
  backgroundColor: "#0f0f12",
  pixelArt: true,
  scene: [MainScene],
});
