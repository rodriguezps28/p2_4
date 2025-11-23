let lamparas = [];
let abrilFont;
function preload(){
  //abrilFont = loadFont("assets/AbrilFatface-Regular.woff");
}
function setup() {
  createCanvas(windowWidth, windowHeight, true);
  frameRate(9);
  for (let i = 0; i < 30; i++) {
   lamparas[i] =new Lampara(random(100, width - 100), random(height - 150, height - 50));
  }
}

function draw() {
  background(30, 30, 45);
  fill(247, 237, 190, random(255));
  textSize(windowWidth*0.092);
  //textFont(abrilFont);
  text("TURN ON THE LIGHT",windowWidth*0.05,windowHeight*0.3);
  
  for (let i= 0; i <lamparas.length; i++) {
    lamparas[i].show();
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  for (let i= lamparas.length-1; i>=0; i--) {
    lamparas[i].mousePressed(); 
  }
}

function mouseDragged() {
  for (let i= 0; i <lamparas.length; i++) {
    lamparas[i].mouseDragged();
  }
}

function mouseReleased() {
  for (let i = 0; i < lamparas.length; i++) {
    lamparas[i].mouseReleased();
  }
}


class Lampara {

  constructor(x, y) {
    this.x=x; 
    this.y=y;
    
    this.encendida = false;
    this.colorPantalla = color(random(150, 255), random(100, 200), random(100, 200));
    
    this.arrastrando = false;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  show() {
    push(); 
    translate(this.x, this.y); 
    
    // Luz 
    if (this.encendida) {
      noStroke(); 
      fill(255, 255, 180, 100); 
      quad(-40, -75, 40, -75, 90, 0, -90, 0);
    }
    
    // Estructura
    stroke(0); strokeWeight(3);
    line(0, 0, 0, -85); 
    line(-25, 0, 25, 0); 
    
    // Cabeza (Pantalla)
    fill(this.colorPantalla); 
    stroke(0); strokeWeight(2);
    quad(-30, -85, 30, -85, 40, -75, -40, -75);

    // Interruptor 
    stroke(50); strokeWeight(1.5); 
    line(15, -75, 15, -40);
    noStroke(); fill(100); 
    circle(15, -40, 8); 
    
    pop();
  }

  
  
  
  mousePressed() {
    if (dist(mouseX, mouseY, this.x + 15, this.y - 40) < 10) {
      this.encendida= !this.encendida; 
      this.colorPantalla = color(random(150, 255), random(100, 200), random(100, 200)); 
    }
    
    
    if (mouseX > this.x - 40 && mouseX < this.x + 40 && mouseY > this.y - 90 && mouseY < this.y) {
      this.arrastrando = true; 
      this.offsetX = this.x - mouseX; 
      this.offsetY = this.y - mouseY;
    }
  }
  mouseDragged() {
    if (this.arrastrando) {
      this.x = mouseX + this.offsetX;
      this.y = mouseY + this.offsetY;
    }
  }

  mouseReleased() {
    this.arrastrando = false;
  }
}