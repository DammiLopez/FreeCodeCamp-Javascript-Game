export class CollisionAnimation {
  constructor(game, x, y) {
    this.game = game;
    this.sizeModifier = Math.random() * 0.5 + 0.5;
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.image = boom
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = x  - this.width * 0.5;
    this.y = y - this.height * 0.5;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrames = 4;
    this.markedForDeletion = false;
     // Animation speed
    this.fps = 20; // Frames per second
    this.frameTimer = 0; // Time elapsed since last frame
    this.frameInterval = 2000 / this.fps; // Every frame should stay on screen for 1/30 of a second
  
  }
  update(delta) {
    this.x -= this.game.gameSpeed;
    this.frameTimer += delta;
    if (this.frameTimer > this.frameInterval) {
      this.frameX++ ;
      this.frameTimer = 0;
      if (this.frameX >= this.maxFrames) {
        this.markedForDeletion = true;
      }
    }
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth, 
      this.frameY * this.spriteHeight,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height,  
    );

    
  }
}

