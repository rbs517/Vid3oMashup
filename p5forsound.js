// let myVideo;

var mySound;
var amp;


function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('Trippy Audio .mp3');
}

function setup() {
  noCanvas();
  mySound.setVolume(0.1);
  mySound.loop();
  
  // create a new Amplitude analyzer
  amp = new p5.Amplitude();

  // Patch the input to an volume analyzer
  amp.setInput(mySound);
  // myVideo = createVideo("assets/fingers.mov");

}


function draw() { 
  // rms = amp.getLevel();
  // init(rms);
  // console.log(rms *1000);
  // background(255);
   
 //move the camera away from the plane by a sin wave
 //camera(0, 0, sin(frameCount * 0.01) * 100, 0, 0, 0, 0, 1, 0);
 // plane(120, 120);
	
    
  //background circles
	// noFill();
	// stroke(200, 100, 100);
	// push();
	// ellipse(10, 10, 10+rms*2500, 10+rms*2500);
	// pop();
  
  // eyeballs
  // fill(0, 0, 255);
  // stroke(0);
  // ellipse(80, 30, 10+rms*200, 10+rms*200);
  // ellipse(-80, 30, 10+rms*200, 10+rms*200);
  
  // //eyes
  // fill(0);
  // translate(90, 0, 0);
  // push();
  // rotateZ(frameCount * 0.01);
  // rotateX(frameCount * 0.01);
  // rotateY(frameCount * 0.01);
  // torus(60, 20);
  // pop();
  
   
  // translate(-180, 0, 0);
  // push();
  // rotateZ(frameCount * 0.01);
  // rotateX(frameCount * 0.01);
  // rotateY(frameCount * 0.01);
  // torus(60, 20);
  // pop();
  
  // //nose
  // translate(-180, 0, 0);
  // push();
  // rotateZ(frameCount * 0.01);
  // rotateX(frameCount * 0.01);
  // rotateY(frameCount * 0.01);
  // // image(img, 0, height/2, img.width/2, img.height/2);
  // pop();
  
//   //lips
//   fill(100, 230, 100);
// 	translate(80, 200, 20);

//   // noFill();
//   fill(0,0);
//   texture(img);
// 	plane(90, 90);
// //image(img, 90 ,90);

//   var locY = (mouseY / height - 0.5) * (-2);
//   var locX = (mouseX / width - 0.5) * 2;

//   ambientLight(100, 80, 80);
//   pointLight(200, 200, 200, locX, locY, 0);
  
//   rotateX(frameCount * 0.01);
//   rotateZ(frameCount * 0.01);
//   cylinder(200, 200);
  
 // camera(0, 0, sin(frameCount * 0.01) * 100, mouseX, mouseY, 0, 0, 1, 0);
}


