export class UI {
  constructor(game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = "creepster";
    this.color = "Black";
    this.fontWeight = "bold";
    this.livesImage = life
  }
  draw(context) {
    context.font = this.fontSize + "px " + this.fontFamily;
    context.fontWeight = this.fontWeight;
    context.textAlign = "left";
    context.fillStyle = this.color;
    context.fillText("Score: " + this.game.score, 20, 40);
    context.font = this.fontSize - 10 + "px " + this.fontFamily;
    context.fillText("Time: " + Math.floor(this.game.time * 0.001), 20, 80);
    
    if (this.game.gameOver) {
      context.textAlign = "center";
      context.font = this.fontSize + 20 + "px " + this.fontFamily ;
      context.fillStyle = "black";
      context.fillText(
        "Game Over!",
        this.game.width * 0.5,
        this.game.height * 0.5,
      );
      context.textAlign = "center";
      context.font = this.fontSize + 10 + "px " + this.fontFamily ;
      context.fillStyle = "black";
      context.fillText(
        "Press ACTION to restart",
        this.game.width * 0.46 + 40,
        this.game.height * 0.5 + 45,
      );
    }
    // Draw lives
    
      const lifeWidth = 25;
      const lifeHeight = 25;
      for (let i = 0; i < this.game.lives; i++) {
        context.drawImage(
          this.livesImage,
          i * (lifeWidth + 5) + 20,
          100,
          lifeWidth,
          lifeHeight
        );
      }
    
  }
}
