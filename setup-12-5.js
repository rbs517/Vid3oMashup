//NODE JS CONNECTION SETUP
var connection = new WebSocket('ws://127.0.0.1:8000');
var resultString;
var splitString;
var control1;
var control2;
var control3;
var control4;
var control5;
var control6;
var control7;
var control8;
var control9;
var control10;
// var evt1;

// connection is opened and ready to use
connection.onopen = function () {
    console.log("connected");
};

// an error occurred when sending/receiving data
connection.onerror = function (error) {
    console.log("error", error);
};

// handle incoming message data
connection.onmessage = function (message) {
    resultString = message.data;
    // console.log(resultString);
// split the data string:
    splitString = resultString.split(",");

    //controls
    control1 = splitString[16];   //rotary bkg notch1
    // console.log(control1);
    control2 = splitString[15];   //rotary bkg notch2
    control3 = splitString[14];   //rotary bkg notch3
    control4 = splitString[13];   //rotary bkg notch4

    control5 = splitString[2];   //pushbutton 1, bkg
    
    control6 = splitString[12];   //rotary sound notch1
    control7 = splitString[11];   //rotary sound notch2
    control8 = splitString[10];   //rotary sound notch3
    control9 = splitString[9];    //rotary sound notch4

    control10 = splitString[1];   //pushbutton 2, song

    //data functions
    knobSerialData1(control1);    
    knobSerialData2(control2);
    knobSerialData3(control3);
    knobSerialData4(control4);
    pushButtonData1(control5);

    knobSerialData5(control6);    
    knobSerialData6(control7);
    knobSerialData7(control8);
    knobSerialData8(control9);
    pushButtonData2(control10);
};

//DECLARE GLOBAL VARIABLES
var current;
var scene  = [];
var container;
var animate;
var threeRenderer;
var lastRenderTime;
var threeCamera;
var rotation = 0.008;
var sketchWidth = window.innerWidth;
var sketchHeight = window.innerHeight;

//variables for text- scenes 0, 1, 2,  and 7
var textGeo, textMat, title;
var height = 4,
size = 25,
curveSegments = 4,
bevelThickness = 2,
bevelSize = 0,
bevelSegments = 1,
bevelEnabled = true,
  // = undefined,     
fontName = "helvetiker", 
fontWeight = "normal", 
fontLoader = new THREE.FontLoader();
ImageLoader = new THREE.TextureLoader();

window.addEventListener('load', onLoad);

//ONLOAD 
function onLoad(){

  // initialize
  threeRenderer = new THREE.WebGLRenderer({ });
  threeRenderer.setPixelRatio(window.devicePixelRatio);
  threeRenderer.setSize(sketchWidth, sketchHeight);
  document.body.appendChild(threeRenderer.domElement);  

  // camera
  // threeCamera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,.1, 1000);
  threeCamera = new THREE.PerspectiveCamera (45, sketchWidth / sketchHeight, 1, 1000);
  threeCamera.position.x = 40;
  threeCamera.position.y = 40;
  threeCamera.position.z = 40;

  //establish the scenes
  scene[0]  = new THREE.Scene();  // intro
  scene[1]  = new THREE.Scene();  // choose background
  scene[2]  = new THREE.Scene();  // choose soundfile
  scene[3]  = new THREE.Scene();  // 
  scene[4]  = new THREE.Scene();  // 
  scene[5]  = new THREE.Scene();  //  
  scene[6]  = new THREE.Scene();  // 
  current = 0;                    // scene selector
  // current = 1;  
// EVENT LISTENERS
  window.addEventListener('resize', onWindowResize, true );

  createScenes();

  window.requestAnimationFrame(animate);

  //after 5 seconds of intro, go to page1
  setTimeout( () => {goToPage(1);}, 5000 );
}

 
function animate(timestamp) {
  var delta = Math.min(timestamp - lastRenderTime, 500);
  lastRenderTime = timestamp;

  animateCamera();
  updateScenes();

  threeRenderer.render(scene[current], threeCamera);
  window.requestAnimationFrame(animate);
}
// function that changes the scene to be displayed
function goToPage(targetScene){
  current = targetScene;
}

function animateCamera(){
  switch(current){
    case 0:
      threeCamera.position.z = Math.sin(rotation) * 80;
      threeCamera.position.y = Math.cos(rotation) * 80;
      threeCamera.lookAt(scene[current].position);
      rotation += 0.01;
      break;
    case 1:
      resetCamera();
      break;
    case 2:
      resetCamera();
      // rotation = 0;
      break;
    case 3:
      resetCamera();
      // rotation = 0;
      break;
    case 4:
      threeCamera.position.set(0, 0, 0);
      threeCamera.rotation.set(0, 0, 0);
      // rotation = 0;
      break;
    case 5:
      threeCamera.position.set(0, 0, 0);
      threeCamera.rotation.set(0, 0, 0);
      // rotation = 0;
      break;
    case 6:
      threeCamera.position.set(0, 0, 0);
      threeCamera.rotation.set(0, 0, 0);
      rotation = 0;
      break;
  }
}
function resetCamera(){
  // threeCamera.position.set(40, 40, 40);
  threeCamera.position.set(10, 10, 270);
  // threeCamera.position.set(10, 10, 270);
  // threeCamera.lookAt(scene[current].position);
  threeCamera.lookAt(scene[current].position);
}


//EVENTS
function onWindowResize(){
  threeRenderer.setPixelRatio(window.devicePixelRatio);
  threeRenderer.setSize(sketchWidth, sketchHeight);
  threeCamera.aspect = sketchWidth/sketchHeight;
  threeCamera.updateProjectionMatrix();
}

function createScenes(){
  scene0();
  scene1();
  scene2();
  // scene3();
  // scene4();
  // scene5();
  // scene6();
}

//rotaries -bkg

var data = control1;
function knobSerialData1(data){
          // console.log(data + ": data");
        if (data == 0){
          slide[1].scale.set(1.8, 1.8, 1.8);  // flip to background 1
        } 
      }

var data2 = control2;
function knobSerialData2(data2){
          // console.log(data + ": data");
        if (data2 == 0){
          slide[2].scale.set(1.8, 1.8, 1.8);  // flip to background 2
        } 
      }

var data3 = control3;
function knobSerialData3(data3){
          // console.log(data + ": data");
        if (data3 == 0){
          slide[3].scale.set(1.8, 1.8, 1.8);  // flip to background 3
        } 
      }     

var data4 = control4;
function knobSerialData4(data4){
          // console.log(data + ": data");
        if (data4 == 0){
          slide[4].scale.set(1.8, 1.8, 1.8);  // flip to background 4
        } 
      }  

//pushbutton 1
var wentToPage2 = false;
var data5 = control5;
function pushButtonData1(data5){
          // console.log(data + ": data");
        if (data5 == 1 && !wentToPage2){
          goToPage(2);  // go to page 2, scene 2
          wentToPage2 = true;
        } 
      } 

//rotaries -sound

var data6 = control6;
function knobSerialData5(data6){
          // console.log(data + ": data");
        if (data6 == 0){
          slideSong[1].scale.set(1.8, 1.8, 1.8);  // flip to sound 1
        //   mySound1.play();
        // }else {
        //   mySound1.stop();
        //   }  
      }
    }

var data7 = control7;
function knobSerialData6(data7){
          // console.log(data + ": data");
        if (data7 == 0){
          slideSong[2].scale.set(1.8, 1.8, 1.8);  // flip to sound 2
        } 
      }

var data8 = control8;
function knobSerialData7(data8){
          // console.log(data + ": data");
        if (data8 == 0){
          slideSong[3].scale.set(1.8, 1.8, 1.8);  // flip to sound 3
        } 
      }     

var data9 = control9;
function knobSerialData8(data9){
          // console.log(data + ": data");
        if (data9 == 0 ){
          slideSong[4].scale.set(1.8, 1.8, 1.8);  // flip to sound 4
        } 
      } 

//pushbutton 2
// var wentToPage3 = false;
// var wentToPage4 = false;
// var wentToPage5 = false;
// var wentToPage6 = false;
// var data10 = control10;
// function pushButtonData2(data10){
//           // console.log(data + ": data");
//         if (data10 == 1 && !wentToPage3){     //once bkg and socng is picked, go to the 
//           goToPage(3);  // go to page 3, scene 3
//           wentToPage3 = true;
//         } 
//         if (data10 == 1 && !wentToPage4){     //once bkg and socng is picked, go to the 
//           goToPage(4);  // go to page 4, scene 4
//           wentToPage4 = true;
//         } 

//         } 
//         if (data10 == 1 && !wentToPage5){     //once bkg and socng is picked, go to the 
//           goToPage(5);  // go to page 5, scene 5
//           wentToPage5 = true;
//         } 

//         } 
//         if (data10 == 1 && !wentToPage5){     //once bkg and socng is picked, go to the 
//           goToPage(5);  // go to page 5, scene 5
//           wentToPage5 = true;
//         } 

//       } 


function updateScenes(){
  switch(current){
    case 0:
      threeCamera.position.z = Math.sin(rotation) * 80;
      threeCamera.position.y = Math.cos(rotation) * 80;
      threeCamera.lookAt(scene[current].position);
      rotation += 0.01;
      break;
    case 1:
          //rotate the cubes  
          slide[1].rotation.y += 0.01;
          slide[2].rotation.y += 0.01;
          slide[3].rotation.y += 0.01;
          slide[4].rotation.y += 0.01;

      break;  
    case 2:
          //rotate the cubes  
          slideSong[1].rotation.y += 0.01;
          slideSong[2].rotation.y += 0.01;
          slideSong[3].rotation.y += 0.01;
          slideSong[4].rotation.y += 0.01;

      break;
    case 3:
      threeCamera.position.set(0, 0, 0);
      threeCamera.rotation.set(0, 0, 0);
      rotation = 0;
      break;
    case 4:
      threeCamera.position.set(0, 0, 0);
      threeCamera.rotation.set(0, 0, 0);
      // rotation = 0;
      break;
    case 5:
      threeCamera.position.set(0, 0, 0);
      threeCamera.rotation.set(0, 0, 0);
      // rotation = 0;
      break;
    case 6:
      threeCamera.position.set(0, 0, 0);
      threeCamera.rotation.set(0, 0, 0);
      rotation = 0;
      break;
  }
}

//song is from https://freesound.org/people/waveplay/sounds/221766/ ;