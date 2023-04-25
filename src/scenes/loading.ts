import Phaser, { CANVAS, GameObjects } from 'phaser';

export default class Loading extends Phaser.Scene {
  constructor() {
    super('Loading');  
  }

  create(){
    console.log("loading scene");
    // Create a sprite to animate
var sprite = this.add.sprite(100, 100, 'myImage');
sprite.x= this.game.canvas.width/2;
sprite.y= this.game.canvas.height/2;

// Create a tween to animate the opacity of the sprite
var tween = this.tweens.add({
  targets: sprite,
  alpha: 0,
  duration: 4000,
  ease: 'Linear',
  repeat: -1,
  yoyo: true
});
    const scene = this;
    setTimeout(function() {
        scene.game.scene.start('GameScene');
        sprite.destroy();
    }, 4000); // 3 second delay
  }
}