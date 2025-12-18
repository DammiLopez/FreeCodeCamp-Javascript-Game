class Enemy {
  constructor(game) {
    this.game = game;
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
    this.markedForDeletion = false;
  }
  update(deltaTime) {
    this.x -= this.speedX + this.game.gameSpeed;
    this.y -= this.speedY;
    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX >= this.maxFrame) this.frameX = 0;
      else this.frameX++;
    } else {
      this.frameTimer += deltaTime;
    }

    // If off screen
    if (this.x < 0 - this.width || this.y < 0 - this.height) {
      this.markedForDeletion = true;
    }
  }

  draw(context) {
    if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      // Source
      this.frameX * this.width,
      this.frameY,
      this.width,
      this.height,
      // Destination
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}

export class FlyingEnemy extends Enemy {
  constructor(game) {
    super(game);
    this.width = 60;
    this.height = 44;
    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.5;
    this.speedX = Math.random() + 0.5;
    this.speedY = 0;
    this.maxFrame = 5;
    this.image = document.getElementById("fly");
    this.angle = 0;
    this.velocityAngle = Math.random() * 0.1 + 0.1;
  }
  update(deltaTime) {
    super.update(deltaTime);
    this.angle += this.velocityAngle;

    this.y += Math.sin(this.angle);
  }
  draw(context) {
    super.draw(context);
  }
}
export class GroundEnemy extends Enemy {
  constructor(game) {
    super(game);
    this.game = game;
    this.width = 60;
    this.height = 87;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.image = plant;
    this.speedX = 0;
    this.speedY = 0;
    this.maxFrame = 1;
  }
  update(deltaTime) {
    super.update(deltaTime);
  }
  draw(context) {
    super.draw(context);
  }
}

export class ClimbingEnemy extends Enemy {
  constructor(game) {
    super(game);
    this.game = game;
    this.width = 120;
    this.height = 144;
    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.5;
    this.image = spider;
    this.speedX = 0;
    this.speedY = Math.random() > 0.5 ? 1 : -1;
    this.maxFrame = 5;
  }
  update(deltaTime) {
    super.update(deltaTime);
    if (this.y > this.game.height - this.height - this.game.groundMargin ) {
      this.speedY *= -1;
    }
  }
  draw(context) {
    context.beginPath();
    context.moveTo(this.x + this.width * 0.5, 0);
    context.lineTo(this.x + this.width * 0.5, this.y + this.height *0.5);
    context.stroke();
    super.draw(context);
  }
}
