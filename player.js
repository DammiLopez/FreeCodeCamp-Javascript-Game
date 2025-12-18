import {
  Dead,
  Diving,
  Falling,
  Hit,
  Jumping,
  Rolling,
  Running,
  Sitting,
} from "./playerState.js";
import { CollisionAnimation } from "./collisionAnimation.js";
import { FloatingMessage } from "./floatingMessages.js";

export default class Player {
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 91.3;
    this.image = player;

    // Animation
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 6;

    // Position
    this.x = 10;
    this.y = this.game.height - this.height - this.game.groundMargin;

    // Velocity
    this.vy = 0;
    this.gravity = 0.5;
    this.speed = 0;
    this.maxSpeed = 5;

    // States
    this.states = [
      new Sitting(this, this.game),
      new Running(this, this.game),
      new Jumping(this, this.game),
      new Falling(this, this.game),
      new Rolling(this, this.game),
      new Diving(this, this.game),
      new Hit(this, this.game),
      new Dead(this, this.game),
    ];
    this.currentState = this.states[0];
    this.currentState.enter();

    // Animation speed
    this.fps = 20; // Frames per second
    this.frameTimer = 0; // Time elapsed since last frame
    this.frameInterval = 1000 / this.fps; // Every frame should stay on screen for 1/30 of a second
  }

  draw(context) {
    if (this.game.debug)
      context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }

  setState(state, speed) {
    this.currentState = this.states[state];
    this.game.gameSpeed = this.game.MaxGameSpeed * speed;
    this.currentState.enter();
  }
  update(input, deltaTime) {
    this.checkCollision();
    this.currentState.handleInput(input);

    // Horizontal movement
    this.x += this.speed;
    if (this.currentState !== this.states[6]) {
      // Not in hit state
      if (this.currentState !== this.states[7]) {
        if (input.includes("ArrowLeft")) this.speed = -this.maxSpeed;
        else if (input.includes("ArrowRight")) this.speed = this.maxSpeed;
        else this.speed = 0;
      }
    }

    // Horizontal screen bounds
    if (this.x < 0) this.x = 0;
    if (this.x >= this.game.width - this.width)
      this.x = this.game.width - this.width;

    // Vertical movement
    this.y += this.vy;
    if (!this.onGround()) this.vy += this.gravity;
    else this.vy = 0;

    // Vertical screen bounds
    if (this.y < 0) this.y = 0;
    if (this.y >= this.game.height - this.height - this.game.groundMargin)
      this.y = this.game.height - this.height - this.game.groundMargin;

    // Animation
    if (this.frameTimer > this.frameInterval) {
      // 1. Verificamos si ya llegamos al frame 11 y el estado es "DEAD"
      if (this.currentState.state === "DEAD" && this.frameX === 11) {
        // No hacemos nada: bloqueamos el avance de frameX
        this.frameX = 11;
      } else {
        // 2. Lógica normal de animación
        if (this.frameX < this.maxFrame) {
          this.frameX++;
        } else {
          this.frameX = 0;
        }
      }
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
  }
  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }
  checkCollision() {
    this.game.enemies.forEach((e) => {
      if (
        this.x < e.x + e.width &&
        this.x + this.width > e.x &&
        this.y < e.y + e.height &&
        this.y + this.height > e.y
      ) {
        this.game.collisions.push(
          new CollisionAnimation(
            this.game,
            e.x + e.width / 2,
            e.y + e.height / 2,
          ),
        );

        if (this.game.lives <= 1) {
          this.game.gameOver = true;
        }
        e.markedForDeletion = true;
        if (
          this.currentState === this.game.player.states[4] ||
          this.currentState === this.game.player.states[5]
        ) {
          // this.game.score++;
          this.game.floatingMessages.push(
            new FloatingMessage(this.game, "+1", e.x, e.y, 100, 40),
          );
        } else {
          this.game.lives--;
          this.setState(6, 0);
        }
      }
    });
  }
}
