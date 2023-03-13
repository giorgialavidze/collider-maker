import Phaser, { CANVAS } from 'phaser';
export default class GameScene extends Phaser.Scene {
  shapeName:any
  inputelement:any
  collider!:Phaser.Physics.Matter.Sprite
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

  drawColider() {  
    this.collider = this.matter.add.sprite(
      this.game.canvas.width/2,
      this.game.canvas.height/2,
      "",
      undefined,
      {  
          shape: this.shapeData.mainShape,
          isStatic:true
      } as Phaser.Types.Physics.Matter.MatterBodyConfig
    );
  }

  getVericesWithOurName(value:any){
      const inputElement = document.getElementById("input-id") as HTMLInputElement;
      const shapeName = inputElement.value;
      this.shapeData[shapeName] = this.shapeData["mainShape"];
      delete this.shapeData['mainShape'];
      console.log(shapeName,this.shapeData); 
  }

  createImageUploader(){
    const currentScene = this;
    const gamescene =this.game.canvas;

    let profileImage;
    let imgElement = document.querySelector('#localImage');
    if (imgElement) {
      imgElement.addEventListener('change', _ => {
        //@ts-ignore
        const [file] = imgElement!.files
        if (file) {
          let reader = new FileReader();
          reader.onload = function(e) {
            let img = new Image();
            img.onload = _ => { 
              let txt = currentScene
                  .textures
                  .createCanvas('profile',  img.width, img.height);

              txt.draw(0, 0, img);               
              profileImage = currentScene.add
                  .image(gamescene.width/2, gamescene.height/2, 'profile')
                  .setOrigin(0.5);
              profileImage.setScale(180 / img.height);
            }     
            //@ts-ignore          
            img.src = reader.result;
          }
          reader.readAsDataURL(file);
        }
      });
    }
  }

  createInputElement(){
    this.inputelement = this.add.dom(100, 100, "input", "height: 30px;","phaser");
    this.inputelement.node.id = "input-id";
  }

  createDrawButton(){
    this.add.image(500,500,"drawButton")
    .setOrigin(0.5)
    .setScale(0.5)
    .setDepth(100)
    .setInteractive()
    .on(Phaser.Input.Events.POINTER_DOWN,() => {
      this.drawColider();
      this.getVericesWithOurName(this.shapeName);
    });
  }

  createDrawPointWithMouseDown(){
    
    this.input.on(Phaser.Input.Events.POINTER_DOWN, (pointer: Phaser.Input.Pointer) => {
      const { x, y } = pointer
      this.vertices.push({"x":x,"y":y})
      this.add.circle(x,y,5,0xFA150C)
    }) 
  }
  create() {
    this.createInputElement();
    this.createImageUploader();
    this.createDrawPointWithMouseDown(); 
    this.createDrawButton();
  }
}
