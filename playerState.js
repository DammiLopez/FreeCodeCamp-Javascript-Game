import { Dust, Fire, Splash } from "./particle.js";

export const states = {
  SITTING: 0,
  RUNNING: 1,
  JUMPING: 2,
  FALLING: 3,
  ROLLING: 4,
  DIVING: 5,
  HIT: 6,
  DEAD: 7,
};

class State {
  constructor(state, game) {
    this.state = state;
    this.game = game;
  }
}

export class Sitting extends State {
  constructor(player, game) {
    super("SITTING", game);
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 4;
    this.player.frameY = 5;
  }

  handleInput(input) {
    if (input.includes("ArrowLeft") || input.includes("ArrowRight")) {
      this.player.setState(states.RUNNING, 1);
    } else if (input.includes("ArrowUp")) {
      this.player.setState(states.JUMPING, 1);
    }
  }
}
export class Running extends State {
  constructor(player, game) {
    super("RUNNING", game);
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 8;
    this.player.frameY = 3;
  }

  handleInput(input) {
    this.game.particles.unshift(
      new Dust(this.game, this.player.x, this.player.y),
    );
    if (input.includes("ArrowDown")) {
      this.player.setState(states.SITTING, 0);
    } else if (input.includes("ArrowUp")) {
      this.player.setState(states.JUMPING, 1);
    } else if (input.includes("Enter")) {
      this.player.setState(states.ROLLING, 2.5);
    }
  }
}

export class Jumping extends State {
  constructor(player, game) {
    super("JUMPING", game);
    this.player = player;
  }

  enter() {
    if (this.player.onGround()) this.player.vy -= 17;
    this.player.frameX = 0;
    this.player.maxFrame = 6;
    this.player.frameY = 1;
  }

  handleInput(input) {
    if (this.player.vy > this.player.gravity) {
      this.player.setState(states.FALLING, 1);
    } else if (input.includes("Enter")) {
      this.player.setState(states.ROLLING, 2.5);
    } else if (input.includes("ArrowDown")) {
      this.player.setState(states.DIVING, 0);
    }
  }
}

export class Falling extends State {
  constructor(player, game) {
    super("FALLING", game);
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 6;
    this.player.frameY = 2;
  }

  handleInput(input) {
    if (this.player.onGround()) {
      this.player.setState(states.RUNNING, 1);
    } else if (input.includes("ArrowDown")) {
      this.player.setState(states.DIVING, 0);
    }
  }
}

export class Rolling extends State {
  constructor(player, game) {
    super("ROLLING", game);
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 6;
    this.player.frameY = 6;
  }

  handleInput(input) {
    this.game.particles.unshift(
      new Fire(this.game, this.player.x, this.player.y),
    );
    if (!input.includes("Enter") && this.player.onGround()) {
      this.player.setState(states.RUNNING, 1);
    } else if (!input.includes("Enter") && !this.player.onGround()) {
      this.player.setState(states.FALLING, 1);
    } else if (
      input.includes("Enter") &&
      input.includes("ArrowUp") &&
      this.player.onGround()
    ) {
      this.player.vy -= 27;
    } else if (input.includes("ArrowDown") && !this.player.onGround()) {
      this.player.setState(states.DIVING, 0);
    }
  }
}
export class Diving extends State {
  constructor(player, game) {
    super("DIVING", game);
    this.player = player;
  }

  enter() {
    this.player.frameX = 0;
    this.player.maxFrame = 6;
    this.player.frameY = 6;
    this.player.vy = 15;
  }

  handleInput(input) {
    this.game.particles.unshift(
      new Fire(this.game, this.player.x, this.player.y),
    );
    if (this.player.onGround()) {
      for (let i = 0; i < 50; i++) {
        this.game.particles.unshift(
          new Splash(
            this.game,
            this.player.x + this.player.width * 0.5,
            this.player.y + this.player.height,
          ),
        );
      }
      this.player.setState(states.RUNNING, 1);
    } else if (input.includes("Enter") && this.player.onGround()) {
      this.player.setState(states.ROLLING, 2.5);
    }
  }
}
export class Hit extends State {
  constructor(player, game) {
    super("HIT", game);
    this.player = player;
  }

  enter() {
    this.player.speed = 0;
    this.player.vy = 0;
    this.player.frameX = 0;
    this.player.maxFrame = 11;
    this.player.frameY = 4;
  }

  handleInput(input) {
    if (this.player.frameX >= 10 && this.player.onGround()) {
      this.player.setState(states.RUNNING, 1);
    } else if (this.player.frameX > 10 && !this.player.onGround()) {
      this.player.setState(states.FALLING, 1);
    }else if (this.game.lives <= 0){
      this.player.setState(states.DEAD, 0);
    }
  }
}
export class Dead extends State {
  constructor(player, game) {
    super("DEAD", game);
    this.player = player;
  }

  enter() {
    this.player.speed = 0;
    this.player.vy = 0;
    this.player.frameX = 0;
    this.player.maxFrame = 12;
    this.player.frameY = 8;
  }

  handleInput(input) {
     if (input.includes("Enter")) {
      this.player.setState(states.SITTING, 0)
      this.game.restart();
    }
  }
}
