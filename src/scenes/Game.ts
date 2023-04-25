import Phaser, { CANVAS, GameObjects } from 'phaser';

export default class GameScene extends Phaser.Scene {
  shapeName:any
  drawButton :any
  inputelement:any
  circlesSize :any
  name = ""
  ismouse : any
  imgwidth=0
  imgheight=0
  body:any
  collider!:Phaser.Physics.Matter.Sprite
  circles: Phaser.GameObjects.Arc[] = []
  vertices:Array<object> = []
  positions = []
  uploadedImage:any
  uploadedTexture:any
  shapeData:any = {
          "shape":[ this.vertices]
  }
  
  constructor() {
    super('GameScene');  
  }

  drawColider() {   
      this.drawButton.addEventListener('click', () => {
      if (this.ismouse == true && this.vertices.length>1) {
          this.ismouse = false;      
          this.renameShapeData();
          this.ismouse =false;
          const lowestx = this.vertices.reduce((previous, current) => {
            //@ts-ignore
            return current.x < previous.x ? current : previous;
          });
          const highestx =  this.vertices.reduce((previous, current) => {
            //@ts-ignore
            return current.x > previous.x ? current : previous;
          });
          const lowesty = this.vertices.reduce((previous, current) => {
            //@ts-ignore
            return current.y < previous.y ? current : previous;
          });
          const highesty =  this.vertices.reduce((previous, current) => {
            //@ts-ignore
            return current.y > previous.y ? current : previous;
          });
          try {     
          //@ts-ignore
          this.body = this.matter.add.fromVertices(highestx.x-(highestx.x-lowestx.x)/2, highesty.y-(highesty.y-lowesty.y)/2, [this.vertices],{ isStatic: true });
          //@ts-ignore
          const position = { x: highestx.x-(highestx.x-lowestx.x)/2, y:highesty.y-(highesty.y-lowesty.y)/2 };
          this.matter.alignBody(this.body, position.x, position.y, Phaser.Display.Align.CENTER);
          this.vanishCircles();
          this.showDownloadButtons();  
          this.hideRenameInput();
          } catch (e) {
            alert("incorect places for verticies");
            this.reset();
          }      
      }
    });  
  }

  downloadJSON(){
    this.shapeData ={
      [this.name]:[ this.vertices]
    }
    let myData = this.shapeData;
    let jsonString = JSON.stringify(myData);
    this.cache.json.add('myData', jsonString);
    var jsonBlob = new Blob([jsonString], {type: "application/json"});
    var url = URL.createObjectURL(jsonBlob);
    var downloadLink = document.createElement("a");
    downloadLink.download = "myData.json";
    downloadLink.href = url;
    downloadLink.click();
    URL.revokeObjectURL(url);
  }

  downloadTextInstruction(){
    this.shapeData ={
      [this.name]:[ this.vertices]
    }
    let jsonString = JSON.stringify(this.shapeData);
    let textBlob = new Blob(
      ["Copy this code in your create function to draw collider.\n\nconst verticiesData = "+jsonString+";\n \nconst body = this.matter.add.fromVertices(this.game.canvas.width/2, this.game.canvas.height/2, verticiesData."+this.name+",{ isStatic: true });"]
    , {type: "text/plain"});
    let url2 = URL.createObjectURL(textBlob);
    let downloadText = document.createElement("a");
    downloadText.id ="text";
    downloadText.download = "instruction";
    downloadText.href = url2;
    downloadText.click();
    URL.revokeObjectURL(url2);
  }

  copyShapeCode(){
    this.shapeData ={
      [this.name]:[ this.vertices]
    }
    let myData = this.shapeData;
    let jsonString = JSON.stringify(myData);
    const code ="const verticiesData = "+jsonString+";\n \nconst body = this.matter.add.fromVertices(this.game.canvas.width/2, this.game.canvas.height/2, verticiesData."+this.name+",{ isStatic: true });"
    navigator.clipboard.writeText(code);
  }

  renameShapeData(){
      const inputElement = document.getElementById("inputshapename") as HTMLInputElement;
      this.name = inputElement.value;
      if(this.name  == "" || undefined || null) this.name="shape";
      this.shapeData[this.name] = this.shapeData["shape"];
      delete this.shapeData['shape'];
  }
  hideRenameInput(){
    //@ts-ignore
    document.getElementById("inputshapename").style.visibility = "hidden";
  }
  showDownloadButtons(){
     //@ts-ignore
     document.getElementById("downloadtxtbtn").style.visibility = "visible";
     //@ts-ignore
     document.getElementById("downloadjsonbtn").style.visibility = "visible";
      //@ts-ignore
      document.getElementById("copybtn").style.visibility = "visible";
  }
imageUploadIcon(){
  let imgElement = document.querySelector('#imageUploadbtn');
  if(imgElement){
    imgElement.addEventListener('click', () => {
      document.getElementById("imageUploader")?.click();
    }); 
  }
}
  createImageUploader(){
    const currentScene = this;
    const gamescene =this.game.canvas;
    
    let imgElement = document.querySelector('#imageUploader');
    if (imgElement) {
      imgElement.addEventListener('change', _ => {
        //@ts-ignore
        const [file] = imgElement!.files
        if (file) {
          let reader = new FileReader();
          reader.onload = function(e) {
            let img = new Image();
            img.onload = _ => { 
              if(currentScene.uploadedImage){
                currentScene.uploadedImage.destroy();
                
              }
              if(currentScene.uploadedTexture){
                currentScene.uploadedTexture.destroy();
                
              }
                currentScene.uploadedTexture = currentScene
                  .textures
                  .createCanvas('profile',  img.width, img.height);
                  currentScene.uploadedTexture.draw(0, 0, img);               
              currentScene.uploadedImage = currentScene.add
                  .image(gamescene.width/2, gamescene.height/2, 'profile')
                  .setOrigin(0.5);              
            }     
            //@ts-ignore          
            img.src = reader.result;
          }
          reader.readAsDataURL(file);
        }
      });
    }
  }

  menuControl(){
      
      const inputFieldwidth = document.getElementById('width') as HTMLInputElement;
      inputFieldwidth.style.visibility = "visible"
      const inputFieldheight = document.getElementById('height') as HTMLInputElement;
      inputFieldheight.style.visibility = "visible"
      const inputTextWidth = document.getElementById('txtwidth') as HTMLInputElement;
      inputTextWidth.style.visibility = "visible";
      const inputTextHeight = document.getElementById('txtheight') as HTMLInputElement;
      inputTextHeight.style.visibility = "visible";
      inputFieldwidth.addEventListener('input', (event: Event) => {
        const inputValueWidth = inputFieldwidth.value;
        const numericValueWidth = inputValueWidth.replace(/[^0-9]/g, '');
        inputFieldwidth.value = numericValueWidth;
      });
      inputFieldheight.addEventListener('input', (event: Event) => {
        const inputValueHeight = inputFieldheight.value;
        const numericValueheight = inputValueHeight.replace(/[^0-9]/g, '');
        inputFieldheight.value = numericValueheight;
      });
      
      const applyButton = document.getElementById('applybtn') as HTMLInputElement;
      applyButton.style.visibility = "visible"
      this.createImageUploader();
      this.imageUploadIcon();
      this.createDrawButton();
      
      applyButton.addEventListener('click', ()=>{ 
          if (inputFieldwidth.value != "" && inputFieldheight.value != "" && inputFieldheight.value[0]!="0" && inputFieldwidth.value[0]!="0") {
            this.movingCameraAccordingCursors();
            this.ismouse = true;
            //@ts-ignore
            document.getElementById("inputshapename").style.visibility = "visible";
            //@ts-ignore
            document.getElementById("imageUploadbtn").style.visibility = "visible";
            //@ts-ignore
            document.getElementById("deletevertice").style.visibility = "visible";
            //@ts-ignore
            document.getElementById("drawbtn").style.visibility = "visible";
            //@ts-ignore
            document.getElementById("zoom").style.visibility = "visible";
            //@ts-ignore
            document.getElementById("zoomout").style.visibility = "visible";
            //@ts-ignore
            document.getElementById("reset").style.visibility = "visible";
            //@ts-ignore
            document.getElementById("linediv").style.visibility = "visible";
            //@ts-ignore
            document.getElementById("txtwidth").style.visibility = "hidden";
            //@ts-ignore
            document.getElementById("txtheight").style.visibility = "hidden";
            //@ts-ignore
            document.getElementById("applybtn").style.visibility = "hidden";
            
          
            let width = document.getElementById("width") as HTMLInputElement;
            let height = document.getElementById("height") as HTMLInputElement;
            width.style.visibility = "hidden";
            height.style.visibility = "hidden";
            this.game.scale.resize(parseInt(width.value),parseInt(height.value));  
            this.circlesSize = (this.game.canvas.width+this.game.canvas.height)/600;
          }
      });
      const downloadJSON = document.querySelector('#downloadjsonbtn');
      if (downloadJSON) {
          downloadJSON.addEventListener('click', () => {
            this.downloadJSON();
        }); 
      }
      const downloadInstruction = document.querySelector('#downloadtxtbtn')!;
          downloadInstruction.addEventListener('click', () => {
            this.downloadTextInstruction();
        }); 
      
      const copyCode = document.querySelector('#copybtn');
      if (copyCode) {
            copyCode.addEventListener('click', () => {
            this.copyShapeCode();
        }); 
      }
      const camera =this.cameras.main;
      const zoom = document.querySelector('#zoom');
      let zoomNum = 1;
      if (zoom) {
          zoom.addEventListener('click', () => {
            if (parseFloat(zoomNum.toFixed(1))<12) {
              zoomNum=+(zoomNum + 0.1).toFixed(1);
              this.zoomCanvas(camera,zoomNum);
              this.adjustCirclesSizeforZooming("+");
              this.circlesSize = this.circlesSize-0.06
            }
        }); 
      }
      const zoomout = document.querySelector('#zoomout');

      if (zoomout) {
          zoomout.addEventListener('click', () => {
            if(parseFloat(zoomNum.toFixed(1))>1){
              zoomNum = +(+zoomNum - 0.1).toFixed(1);
              this.zoomOutCanvas(camera,zoomNum);
              this.adjustCirclesSizeforZooming("-");
              this.circlesSize = this.circlesSize+0.06
            }
        });  
      }
      const reset = document.querySelector('#reset');
      if (reset) {
          reset.addEventListener('click', () => {
          this.reset();
      }); 
    }
  } 

  deleteLastVertice(){
    if (this.circles[this.circles.length-1]) {
      this.circles[this.circles.length-1].destroy()
      this.circles.pop();
      this.vertices.pop(); 
    }  
  }
  createDrawButton(){
      this.drawButton = document.querySelector('#drawbtn');  
  }

  createDrawPointWithMouseDown(){ 
    let cam = this.cameras.main;
    
    this.input.on(Phaser.Input.Events.POINTER_DOWN, (pointer: Phaser.Input.Pointer) => {
      if (this.ismouse) {
        let worldPoint = cam.getWorldPoint(pointer.x, pointer.y);
        const { x, y } = pointer  
        this.vertices.push({"x":worldPoint.x,"y":worldPoint.y})
        const vert = [x,y];
        //@ts-ignore
        this.positions.push(vert);
        let circle = this.add.circle(x,y,this.circlesSize,0xff0eda) 
        circle.setPosition(worldPoint.x, worldPoint.y); 
        this.circles.push(circle)
        const deleteVertice = document.querySelector('#deletevertice');
      }
    }) 
    const deleteVertice = document.querySelector('#deletevertice');
    if (deleteVertice) {
      deleteVertice.addEventListener('click', () => {
      this.deleteLastVertice();
  }); 
}
  }

  vanishCircles(){
    for (const circle of this.circles) {
      circle.destroy()
    }
  }

  adjustCirclesSizeforZooming(mode:string){
    for (const circle of this.circles) {
      if (mode == "+") {
        circle.scale = circle.scale-0.02
      }
      if (mode == "-") {
        circle.scale = circle.scale+0.02
      }
    }
  }

  zoomOutCanvas(cam:any,number: number) {
    const camera = cam;
    camera.zoom = number;
  }
  zoomCanvas(cam:any,number:number){
    const camera = cam;
    camera.zoom=number;
}

movingCameraAccordingCursors(){
  const cursors = this.input.keyboard.createCursorKeys();
  let cameraSpeed = 6;
  let minX = -this.game.canvas.width/2; // adjust these to set the limits of the camera movement
  let maxX = this.game.canvas.width/2;
  let minY = -this.game.canvas.height/2;
  let maxY = this.game.canvas.height/2;
  // update the camera position every frame
  this.events.on('update', () => {
    if (cursors.up.isDown) {
      if (this.cameras.main.scrollY > minY) {
        this.cameras.main.scrollY -= cameraSpeed;
      }
    } else if (cursors.down.isDown) {
      if (this.cameras.main.scrollY < maxY) {
        this.cameras.main.scrollY += cameraSpeed;
      }
    }
    if (cursors.left.isDown) {
      if (this.cameras.main.scrollX > minX) {
        this.cameras.main.scrollX -= cameraSpeed;
      }
    } else if (cursors.right.isDown) {
      if (this.cameras.main.scrollX < maxX) {
        this.cameras.main.scrollX += cameraSpeed;
      }
    }
  });
}
reset(){
 this.ismouse=true;
 const size = this.vertices.length;
 this.vanishCircles();
 //@ts-ignore
 document.getElementById("downloadjsonbtn").style.visibility = "hidden";
 //@ts-ignore
 document.getElementById("copybtn").style.visibility = "hidden";
 //@ts-ignore
 document.getElementById("downloadtxtbtn").style.visibility = "hidden";
 //@ts-ignore
 document.getElementById("inputshapename").style.visibility = "visible";
 for (let i = 0; i < size; i++) {
  this.vertices.pop();
 }
 if(this.body){
  this.matter.world.remove(this.body);
 }
}
  create() {
    this.menuControl();
    this.createDrawPointWithMouseDown(); 
    this.drawColider();  

  }
}


