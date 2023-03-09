interface mousePoints{
    x : number,
    y : number
}

export default class Editor extends Phaser.Scene{
    width! : number;
    height! : number;

    mousePoints:Array<mousePoints> = []
    readonly roadHeight: number = 13;
    readonly roadColor: number = 0x1F1145;
    readonly roadOpacity: number = 1;

    constructor(){
        super("Editor")
    }  

    create(){
        // this.width = this.game.canvas.width;
        // this.height = this.game.canvas.height;
        
        // this.addEvents();
        // this.addInterface();

        const PATH = "M 9.2 112.5 C 20.1667 12.0667 28.4246 39.5251 70 52.1 C 99.7424 71.4584 116.7735 29.2354 161.8 58.6 C 239 91 231.0239 30.6547 339.5972 85.2962 C 442.8483 65.4266 606 47.7 579.1 104.5";

        let pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathElement.setAttributeNS(null, 'd', PATH);
        pathElement.setAttributeNS(null, 'id', 'path3780');
        
        const setVerts = this.matter.svg.pathToVertices(pathElement, 10);
        const collider = this.matter.add.fromVertices(400, 300, setVerts, {isStatic: true});
        const groundPath = this.add.path(0, 0);
        const asd =this.add.image(400,300,"myImage").setScale(2);
        //groundPath.add(collider);
        const groundGraphics = this.add.graphics();
        groundGraphics.beginPath();
        groundPath.draw(groundGraphics);

        groundGraphics.lineTo(this.width, this.height);
        groundGraphics.lineTo(0, this.height);
        groundGraphics.fill();

        const maskImage = this.add.image(0, 0, 'Ground')
        .setDepth(2)
        .setOrigin(0)
        .setDisplaySize(this.width,this.height)
        const mask = groundGraphics.createGeometryMask();
        maskImage.setMask(mask);
    }

    addCollider(){
        var colliderCurve = new Phaser.Curves.Spline([
            new Phaser.Math.Vector2(this.mousePoints[0].x, this.mousePoints[0].y),
            new Phaser.Math.Vector2(this.mousePoints[1].x, this.mousePoints[1].y),
            new Phaser.Math.Vector2(this.mousePoints[2].x, this.mousePoints[2].y),
            new Phaser.Math.Vector2(this.mousePoints[1].x, this.height)
        ]);

        // const shapeWidth = this.mousePoints[2].x - this.mousePoints[0].x;
        // console.log(this.width)
        // colliderCurve.points[1].x - colliderCurve.points[0].x,

        console.log(colliderCurve.points)

        this.matter.add.fromVertices(
            this.width/2,
            this.height/2, 
            colliderCurve.getPoints(40),
            {
                isStatic:true
            }
        )
    }

    drawRoad(){
        const vectors = this.mousePoints.map( (x,y) => {
            return new Phaser.Math.Vector2(x, y)
        })
        const roadCurve = new Phaser.Curves.Spline(vectors);
        
        const roadPath = this.add.path(0, 0);
        roadPath.add(roadCurve);

        const roadGraphics = this.add.graphics();
        roadGraphics.lineStyle(this.roadHeight, this.roadColor, this.roadOpacity);  
        roadGraphics.beginPath();
        roadPath.draw(roadGraphics);
    }

    drawGround(){
        const vectors = this.mousePoints.map( (x,y) => {
            return new Phaser.Math.Vector2(x, y)
        })
        const groundCurve = new Phaser.Curves.Spline(vectors);

        const groundPath = this.add.path(0, 0);
        groundPath.add(groundCurve);

        const groundGraphics = this.add.graphics();
        groundGraphics.beginPath();
        groundPath.draw(groundGraphics);

        groundGraphics.lineTo(this.width, this.height);
        groundGraphics.lineTo(0, this.height);
        groundGraphics.fill();

        //add Set Mask
        const maskImage = this.add.image(0, 0, 'Ground')
        .setDepth(2)
        .setOrigin(0)
        .setDisplaySize(this.width,this.height)
        const mask = groundGraphics.createGeometryMask();
        maskImage.setMask(mask);
    }

    addEvents(){
        this.input.on(Phaser.Input.Events.POINTER_DOWN, (pointer: Phaser.Input.Pointer) => {
            this.addPoint(pointer.x,pointer.y) 
        })
    }

    addPoint(x : number,y : number){
        this.mousePoints.push({"x":x,"y":y})
        this.drawPoint(x,y)
    }

    drawPoint(x : number,y : number){
        const color = 0xFA150C;
        const radius = 3;
        this.add.circle(x,y,radius,color)
    }

    addInterface(){
        const menuContainer = this.add.container(0,500);
        const drawImage = this.add.image(750,50,"drawButton")
        .setInteractive()
        .setOrigin(0.5)
        .setScale(0.3)
        .setDepth(300)
        drawImage.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.drawRoad();
            this.drawGround();
            this.addCollider();
        })
        menuContainer.add(drawImage)
    }
}

