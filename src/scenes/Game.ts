import Phaser from 'phaser';
import shapeJson from "../data/shape.json"
export default class GameScene extends Phaser.Scene {

  mesh:any
  body!:Phaser.Physics.Matter.Sprite
  vertices:Array<object> = []
  shapeData:any = {
    "mainShape": {
      "type": "fromPhysicsEditor",
      "fixtures": [
        {
          "vertices": [
            this.vertices
          ]
        }
          ]
      }
  }

  constructor() {
    super('GameScene');
    
   
    
  }

  preload() {
   
    this.mesh = this.cache.json.get('mainShape');
    


  }

  draw() {
    
    this.body = this.matter.add.sprite(
      this.game.canvas.width/2,
      this.game.canvas.height/2,
      "shape",
      undefined,
      {  
          shape: this.shapeData.mainShape,
          isStatic:true
      } as Phaser.Types.Physics.Matter.MatterBodyConfig
    );
  }

  create() {
     this.add.image(
      this.game.canvas.width/2,
      this.game.canvas.height/2,
      "",
      undefined,
    ).setOrigin(0.5);
    this.add.image(500,500,"drawButton")
    .setOrigin(0.5)
    .setScale(0.5)
    .setDepth(100)
    .setInteractive()
    .on(Phaser.Input.Events.POINTER_DOWN,() => {
      //shapeJson.mainShape.fixtures[0].vertices
      this.draw();
    });
    this.input.on(Phaser.Input.Events.POINTER_DOWN, (pointer: Phaser.Input.Pointer) => {
      const { x, y } = pointer
      
      // this.vertices = [[{"x":x,"y":y}]];
      this.vertices.push({"x":x,"y":y})
    
      
      

      this.add.circle(x,y,5,0xFA150C)
  
      // use startVec and targetVec
  
    })
  
    
  }
  update() {
    // console.log(this.file.get());
  }
}
