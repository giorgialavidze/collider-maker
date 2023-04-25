import Phaser from 'phaser';

export default class Preload extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.load.image("shape","src/images/shape.png")
    this.load.json('mainShape', 'src/data/shape.json');
    this.load.image('drawButton', 'src/images/drawbtn.png');
    this.load.image('Kakheti', 'src/images/Kakheti.png');
    this.load.image('Ground', 'src/images/groundicn.jpg');
    this.load.image('myImage', 'src/images/mySvg.svg');
    this.load.image('zoom', 'src/images/zoom.png');
    this.load.xml("mySvg","src/images/mySvg.svg")
  }
  create() {
    //this.scene.start("Road")
    //this.scene.start("GameScene")
    //this.scene.start("Working")
    this.scene.start("Loading")
    }

 
}

