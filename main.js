import Player from "./player.js";
import InputHandler from "./input.js";
import Background from "./background.js";
import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from "./enemies.js";
import { UI } from "./UI.js";

window.addEventListener("load", () => {
  // Get canvas element
  const canvas = document.getElementById("canvas1");
  /** @type {CanvasRenderingContext2D} */
  const context = canvas.getContext("2d");

  // Set canvas dimensions
  canvas.width = 889;
  canvas.height = 500;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 80;
      this.gameSpeed = 0;
      this.MaxGameSpeed = 3;
      this.player = new Player(this);
      this.input = new InputHandler(this.player, this);
      this.background = new Background(this);
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      this.floatingMessages = [];
      this.time = 0;
      this.maxTime = 10000;
      this.enemyTimer = 0;
      this.enemyInterval = 2000;
      this.debug = false;
      this.score = 0;
      this.ui = new UI(this);
      this.gameOver = false;
      this.lives = 3;
    }

    update(deltaTime) {
      this.time += deltaTime;
      this.background.update(deltaTime);
      this.player.update(this.input.keys, deltaTime);
      if (this.enemyTimer >= this.enemyInterval) {
        this.addEnemies();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      [...this.enemies].forEach((e) => e.update(deltaTime));
      this.enemies = this.enemies.filter((e) => !e.markedForDeletion);
      this.handleParticles();
      this.collisions.forEach((c) => c.update(deltaTime));
      this.collisions = this.collisions.filter((c) => !c.markedForDeletion);
      this.floatingMessages.forEach((m) => m.update());
      this.floatingMessages = this.floatingMessages.filter(
        (m) => !m.markedForDeletion,
      );
    }

    draw(context) {
      this.background.draw(context);
      this.particles.forEach((p) => p.draw(context));
      this.player.draw(context);
      [...this.enemies].forEach((e) => e.draw(context));
      this.ui.draw(context);
      this.collisions.forEach((c) => c.draw(context));
      this.floatingMessages.forEach((m) => m.draw(context));
    }
    addEnemies() {
      if (this.gameSpeed > 0 && Math.random() > 0.5) {
        this.enemies.push(new GroundEnemy(this));
      }
      if (this.gameSpeed > 0) this.enemies.push(new ClimbingEnemy(this));
      this.enemies.push(new FlyingEnemy(this));
    }
    handleParticles() {
      this.particles.forEach((p) => p.update());
      this.particles = this.particles.filter((p) => !p.markedForDeletion);
      if (this.particles.length > 50) {
        this.particles.slice(0, 50);
      }
    }

    restart() {
      this.gameOver = false;
      this.lives = 3;
      this.time = 0;
      this.gameSpeed = 0;
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      this.floatingMessages = [];
      this.player = new Player(this);
    }
  }

  const game = new Game(canvas.width, canvas.height);

  let lastTime = 0;
  const animationLoop = (timestamp) => {
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    context.clearRect(0, 0, canvas.width, canvas.height);

    game.update(deltaTime);
    game.draw(context);

      requestAnimationFrame(animationLoop);
    
    // if (game.input.keys.includes("Enter")) {
    //   game.restart();
    // }
  };

  animationLoop(0);
});
