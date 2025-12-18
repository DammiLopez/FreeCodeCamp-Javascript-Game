export class FloatingMessage {
  constructor(game, value, x, y, targetX, targetY) {
    this.game = game;
    this.value = value;
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.markedForDeletion = false;
    this.timer = 0;
  }

  update() {
    this.x += (this.targetX - this.x) * 0.05;
    this.y += (this.targetY - this.y) * 0.05;
    this.timer++;
    if (this.timer > 100) {
      this.markedForDeletion = true;
      this.game.score++;
    }
  }

  draw(context) {
    context.font = "20px creepster";
    context.fillStyle = "black";
    context.fillText(this.value, this.x, this.y);
  }
}
