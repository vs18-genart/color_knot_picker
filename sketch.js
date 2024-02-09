

// ======================================================
//                     COLOR SPACES
// ======================================================

const HSB_space = {
  label: "HSB",
  x: "H",
  y: "S",
  z: "B",
  drawBox: function() {
    push();
    colorMode(HSB,255,255,255);
    let h_steps = 50;
    let s_steps = 5;
    let b_steps = 2;
    for(let i =0;i<h_steps;i++){
      for(let j =0; j<b_steps; j++){
        for(let k =0; k<s_steps; k++){
            let p = new createVector(j/(b_steps-1)*255*cos(i/h_steps*TWO_PI),
                                    1.0*k/s_steps*255 -255/2,
                                    j/(b_steps-1)*255*sin(i/h_steps*TWO_PI));
            let h = map(atan2(p.z,p.x),-PI,PI,0,255);
            let s = dist(0,0,p.x,p.z);
            let b = p.y+255/2;
            stroke(h,s,b);
            point(p.x,p.y,p.z);
        }
      }  
    }
    pop();
  }
};


const RGB_space = {
  label: "RGB",
  x: "R",
  y: "G",
  z: "B",
  minX: 0,
  minY: 0,
  minZ: 0,
  maxX: 255,
  maxY: 255,
  maxZ: 255,

  drawBox: function() {
    push();
    translate(-255/2,-255/2,-255/2);
    colorMode(RGB,255,255,255);

    let n_steps = 20;
    // x axis = R
    for(let i =0;i<=1;i+=1.0/n_steps){
      for(let j =0; j<=1; j++){
        for(let k =0; k<=1; k++){
            stroke(i*255,j*255,k*255);
            point(i*255 ,j*255,k*255);
        }
      }  
    }
    // y axis = G
    for(let i =0;i<=1;i++){
      for(let j =0; j<=1; j+=1.0/n_steps){
        for(let k =0; k<=1; k++){
            stroke(i*255,j*255,k*255);
            point(i*255 ,j*255,k*255);
        }
      }  
    }
    // z axis = B
    for(let i =0;i<=1;i++){
      for(let j =0; j<=1; j++){
        for(let k =0; k<=1; k+=1.0/n_steps){
            stroke(i*255,j*255,k*255);
            point(i*255 ,j*255,k*255);
        }
      }  
    }
    pop();
  },
  getColor: function(p){
    let r = map(p.x, -1,1, this.minX, this.maxX);
    let g = map(p.y, -1,1, this.minY, this.maxY);
    let b = map(p.z, -1,1, this.minZ, this.maxZ);
    return createVector(r,g,b);
  },
  mapPoint: function(p){
    let x = map(p.x, -1,1, this.minX, this.maxX);
    let y = map(p.y, -1,1, this.minY, this.maxY);
    let z = map(p.z, -1,1, this.minZ, this.maxZ);
    return createVector(x,y,z);
  }
};

// ================================================

let AVAILABLE_COLOR_SPACES = ["RGB", "HSB"];
let CURRENT_COLOR_SPACE = RGB_space;
let bg = "#505050";

let knot;

function setup() {
  createCanvas(windowWidth,windowHeight, WEBGL);
  background(bg);
  knot = new Knot(4,3);
}

function draw() {
  background(bg);
  rotateX(PI);
  rotateY(frameCount*0.01);
  CURRENT_COLOR_SPACE.drawBox();

  push();
  translate(-255/2,-255/2, -255/2);
  for(let i =0; i<1; i+=0.01){
    let pt = knot.getPoint(i);
    let color = CURRENT_COLOR_SPACE.getColor(pt);
    if (CURRENT_COLOR_SPACE.label=="RGB") {colorMode(RGB, 255,255,255);}
    if (CURRENT_COLOR_SPACE.label=="HSB") {colorMode(HSB, 255,255,255);}
    stroke(color.x, color.y, color.z);
    strokeWeight(10);
    pt = CURRENT_COLOR_SPACE.mapPoint(pt);
    point(pt.x,pt.y,pt.z);
  }
  pop();
  //noLoop();
}

function keyPressed(){
  if (CURRENT_COLOR_SPACE.label == "HSB") {CURRENT_COLOR_SPACE = RGB_space;}
  else {CURRENT_COLOR_SPACE = HSB_space;}

  CURRENT_COLOR_SPACE = RGB_space;

}

// draws the boundary of the color domain to the canvas
function drawBox(){
  CURRENT_COLOR_SPACE.drawBox();
}


// TODO: KNOT class that implements knots mathematically

// TODO: MAP knots to the current color space

// TODO: improve COLOR_SPACES usability and parameterization


