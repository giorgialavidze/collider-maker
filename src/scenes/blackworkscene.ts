import { Bodies } from "matter";
import Matter from "matter-js";

export default class BlackWork extends Phaser.Scene {
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
      super('BlackWork');
    }  
     preload() {
        
    }
    draw() {
    
        this.body = this.matter.add.sprite(
          this.game.canvas.width/2,
          this.game.canvas.height/2,
          "",
          undefined,
          {  
              shape: this.shapeData.mainShape,
              isStatic : true
          } as Phaser.Types.Physics.Matter.MatterBodyConfig
        ).setOrigin(0);
      }
     create() {
            var image = this.add.image(300, 390, 'Ground').setDepth(2);
            image.scale = 3.2;
        
            var groundCurve = new Phaser.Curves.Spline([
            new Phaser.Math.Vector2(0, 100),
            new Phaser.Math.Vector2(400, 400),
            new Phaser.Math.Vector2(800, 100),
        ]);

        var roadCurve = new Phaser.Curves.Spline([
            new Phaser.Math.Vector2(0, 80),
            new Phaser.Math.Vector2(400, 380),
            new Phaser.Math.Vector2(800, 80),
        ]);
        //-x -(this.game.canvas.width/2) - width/2
        // - y - (this.game.canvas.height/4)-height/2- curveposy
        this.vertices.push({"x":-(this.game.canvas.width/2)-80,"y":(this.game.canvas.height/4)-47.5-80});
        this.vertices.push({"x":100,"y":95});
        this.vertices.push({"x":200,"y":20});
        
        this.draw();
        
          
        
          //Create a Matter.js body from the adjusted vertices
         
        //   const body = this.matter.add. fromVertices(
        //     this.game.canvas.width/2, 
        //     380, 
        //     [
        //         [
        //             new Phaser.Math.Vector2(0, 0),
        //             new Phaser.Math.Vector2(0, 520),
        //             new Phaser.Math.Vector2(800, 0),
                    
        //         ]
        //     ], {
        //     isStatic: true,
        //   });






    //     const path =
    //     'M -10.837105,399.91531 C -10.837105,399.91531 360.95089,618.41855 633.74796,640.65452 933.27973,665.06975 1194.6484,497.3518 1498.1559,507.62844 1727.0472,515.37863 1898.3125,665.99098 2109.7652,650.73232 2479.5945,624.04507 2737.3742,278.22805 3107.1744,251.27988 3425.2674,283.59165 3926.4207,433.05255 4489.1112,512.4571 4597.6107,527.76814 4722.879,469.1338 4833.3691,482.03476 4868.8117,486.17313 4939.2658,567.09253 4974.475,571.28218 5639.6416,650.43241 6256.8855,671.72797 6588.8994,674.43736 6943.2645,673.42027 7277.3722,403.89083 7743.1187,388.41574 8023.5431,379.09821 8167.268,733.32913 8445.1661,682.98562 9142.1521,556.72082 9382.633,653.43022 9660.1193,642.80088 9803.5716,637.30582 10351.968,200.05637 10670.53,200.2844 10999.895,200.52023 11134.798,-19.470908 11345.368,0.88878878 11664.594,31.754353 12026.765,223.6594 12296.609,161.811 12838.032,37.716588 12837.788,533.42456 12847.221,532.71357';
      
    //   const svgNS = 'http://www.w3.org/2000/svg';
    //   const pathElement = document.createElementNS(svgNS, 'path');
    //   pathElement.setAttribute('d', path);
    //   pathElement.setAttribute('id', 'path3780');
    //   document.body.appendChild(pathElement); // Append the path element to the DOM
      
    //   const vertexSets: { x: number; y: number }[][] = [];
    //   vertexSets.push(Matter.Svg.pathToVertices(pathElement, 30));
    //   const curveBody = Matter.Bodies.fromVertices(0, 0, vertexSets, { isStatic: true });
      
        // const curveBody = Matter.Bodies.fromVertices(0, 0, vertexSets, { isStatic: true });
        
        


        const graphics = this.add.graphics();

       

       
        
        var groundPath = this.add.path(0, 0);
        groundPath.add(groundCurve);
        var roadPath = this.add.path(0, 0);
        roadPath.add(roadCurve);
        
       
        var groundGraphics = this.add.graphics();
        groundGraphics.lineStyle(20, 0x777777, 1);  
        groundGraphics.fillStyle(0x000000);
        groundGraphics.beginPath();
        groundPath.draw(groundGraphics);

        var roadGraphics = this.add.graphics();
        roadGraphics.lineStyle(20, 0x777777, 1);  
        roadGraphics.fillStyle(0x000000);
        roadGraphics.beginPath();
        roadPath.draw(roadGraphics);
       
          
        groundGraphics.lineTo(800, 600);
        groundGraphics.lineTo(0, 600);
         
        groundGraphics.fill();
        var mask = groundGraphics.createGeometryMask();
        image.setMask(mask);
    
   
    }
}  