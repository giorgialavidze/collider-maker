import {pawn  } from "/ColiderMaker/colidermaker/phaser3-rollup-typescript/src/data/shape.json";
export default class Road extends Phaser.Scene {
    constructor() {
      super('Road');
    }
    create(){
      const pown = pawn
      console.log(pown)
      var roadCurve = new Phaser.Curves.Spline([
        new Phaser.Math.Vector2(0, 80),
        new Phaser.Math.Vector2(400, 400),
        new Phaser.Math.Vector2(800, 80),
    ]);
    const graphics = this.add.graphics();
    var roadPath = this.add.path(0, 0);
    roadPath.add(roadCurve);
    var roadGraphics = this.add.graphics();
    roadGraphics.lineStyle(20, 0x777777, 1);  
    roadGraphics.fillStyle(0x000000);
    roadGraphics.beginPath();
    roadPath.draw(roadGraphics);


// create the image
var image = this.add.image(300, 390, 'Ground').setDepth(3);
image.scale = 3.2;

// create the curve graphics object
var curve = this.add.graphics();

// create the path for the curve
var path = new Phaser.Curves.Path();
path.moveTo(0, 100);
path.quadraticBezierTo(400, 200, 200, 700);
path.quadraticBezierTo(900, 300, 700, 500);

// draw the curve
curve.lineStyle(15, 0xffffff, 1);
path.draw(curve);

// create a mask for the image using the curve graphics object
var mask = curve.createGeometryMask();

// set the mask property of the image to the new mask
image.setMask(mask);

       
    }
}  