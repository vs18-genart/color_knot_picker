

let AVAILABLE_COLOR_SPACES = ["RGB", "HSB"];
let CURRENT_COLOR_SPACE = "HSB";
let bg = "#505050";


function setup() {
  createCanvas(windowWidth,windowHeight, WEBGL);
  background(bg);
}

function draw() {
  background(bg);
  rotateX(PI);
  rotateY(frameCount*0.01);
  drawBox();
}

function keyPressed(){
  if (CURRENT_COLOR_SPACE == "HSB") {CURRENT_COLOR_SPACE = "RGB";}
  else {CURRENT_COLOR_SPACE = "HSB";}
}

// draws the boundary of the color domain to the canvas
function drawBox(){
  if(CURRENT_COLOR_SPACE == "HSB"){
    HSB_space.drawBox();
  }
  else{
    RGB_space.drawBox();
  }

}


// TODO: COLOR_SPACE class that implements the domain and has the drawBox inside
// it should have max boundaries for the 3 dimensions, label, 

// TODO: KNOT class that implements knots mathematically

// TODO: MAP knots to the current color space

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
    let b_steps = 4;
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
  drawBox: function() {
    //translate(-width/2,-height/2);
    
    push();
    colorMode(RGB,255,255,255);
    translate(-255/2,-255/2,-255/2);
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
  }
};