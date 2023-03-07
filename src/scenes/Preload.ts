import Phaser from 'phaser';

export default class Preload extends Phaser.Scene {


  constructor() {
    super('Preload');
  }

  preload() {
    this.load.image("shape","src/images/shape.png")
    this.load.json('mainShape', 'src/data/shape.json');
    this.load.image('drawButton', 'src/images/drawbtn.png');
    this.load.image('Ground', 'src/images/groundicn.jpg');


  }
  create() {
    //this.scene.start("Road")
    this.scene.start("BlackWork")
    //this.scene.start("GameScene")
    }

 
}
