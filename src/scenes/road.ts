export default class Road extends Phaser.Scene {
    constructor() {
      super('Road');
    }

    create(){



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