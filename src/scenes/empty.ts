import { Bodies } from "matter";
import Matter from "matter-js";

export default class empty extends Phaser.Scene {
    constructor() {
        super('empty');
      }  

      create(){
        //road
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


        //collider
        var asd = new Phaser.Curves.Spline([
            new Phaser.Math.Vector2(0, 80),
            new Phaser.Math.Vector2(400, -100),
            new Phaser.Math.Vector2(800, 80),
            new Phaser.Math.Vector2(400, 600)
          
        ]);
        // const startPoint = new Phaser.Math.Vector2(0, 80);
        // const controlPoint1 = new Phaser.Math.Vector2(500, 25);
        // const controlPoint2 = new Phaser.Math.Vector2(320, 370);
        // const endPoint = new Phaser.Math.Vector2(735, 550);
            
        //const bezierCurve = new Phaser.Curves.CubicBezier(asd);
        
        this.matter.add.fromVertices(
            400,
            300, 
            asd.getPoints(40),
            {
                isStatic:true
            }
        )}
    }