//NODE JS CONNECTION SETUP
var connection = new WebSocket('ws://127.0.0.1:8000');
var resultString;
var splitString;
// var controls;
var control1;
var control2;
var control3;
var control4;
var control5;
var control6;
var control11;
var sound1;
var sound2; 
var sound3;
var sound4;
// var cubeScene = false;
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
    control1 = splitString[3];   //pot bkg 
    // console.log(control1);

    control2 = splitString[2];   //pushbutton 1, bkg
    
    control3 = splitString[4];   //pot song

    control4 = splitString[1];   //pushbutton 2, song

    control5 = splitString[5];  // pot toilets

    control6 = splitString[6];  // pot turn ball

    control7 = splitString[7];   //change color/animate

    control8 = splitString[8];   //change camera position

    control11 = splitString[11];  // reset button


    //data functions

    if (current == 1){           // call function if in scene 1
    knobSerialData1(control1);   //pot bkg 
  }
    pushButtonData1(control2);   //pushbutton 1, bkg

   if (current == 2){            // call function if in scene 2
    knobSerialData2(control3);   //pot song
    playSound(control3);
    pushButtonData2(control4);   //pushbutton 2, song
  }

    knobSerialData3(control5);     //add toilets
    knobSerialData4(control6);     //turn ball
    knobSerialData5(control7);     //change color/animate
    knobSerialData6(control8);     //change camera position

    resetButtonData(control11);  // reset button

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
var mesh, mesh2, mesh3, mixer,
        geometry, geometry2, geometry3,
        material,
        canvas,
        tGeo, tMat,
        vertexDisplacement,
        customUniforms;
        // myCanvas = document.getElementById('myCanvas');
var delta = 0;
var cameras = [];
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var mouseX =0;
var mouseY =0;
var toilette = [];
var number = 0;
var count = 0;
var moveCameraX;
var moveCameraY;
var moveCameraZ;
var qrCode;
var AMOUNT = 8;
var SIZE = 1 / AMOUNT;

//variables for text- scenes 0, 1, 2, and 7
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
fontWeight = "normal";
var fontLoader = new THREE.FontLoader();
var imageLoader = new THREE.TextureLoader();
var jsonLoader = new THREE.JSONLoader();

window.addEventListener('load', onLoad);

//ONLOAD 
function onLoad(){

  // initialize
  threeRenderer = new THREE.WebGLRenderer({ });
  threeRenderer.setPixelRatio(window.devicePixelRatio);
  threeRenderer.setSize(sketchWidth, sketchHeight);
  document.body.appendChild(threeRenderer.domElement);  

  // threeRendererSVG = new THREE.SVGRenderer();
  // threeRendererSVG.setSize(sketchWidth, sketchHeight);
  // threeRendererSVG.setQuality( 'low' );
  // document.body.appendChild( threeRendererSVG.domElement );

  // threeRendererOSC = new THREE.WebGLRenderer({ canvas: myCanvas, antialias: true });
  // threeRendererOSC.setClearColor(0xffffff);
  // threeRendererOSC.setPixelRatio(window.devicePixelRatio);
  // renderer.setSize(window.innerWidth, window.innerHeight);
  // document.body.appendChild( threeRendererOSC.domElement );


  // camera
  // threeCamera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,.1, 1000);
  threeCamera = new THREE.PerspectiveCamera (45, sketchWidth / sketchHeight, 1, 1000);
  // threeCamera.position.x = 40;
  // threeCamera.position.y = 40;
  threeCamera.position.z = 500;

  // controls = new THREE.OrbitControls( threeCamera );

  // controls.update();

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

  // if (current ==4){
    // threeRendererSVG.render(scene[current], threeCamera);
    // window.requestAnimationFrame(animate);
  
  // }else if (current ==0 || current ==1 || current ==2){   

  threeRenderer.render(scene[current], threeCamera);
  window.requestAnimationFrame(animate);
  // }

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
      threeCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000 );

      break;
    case 4:
      threeCamera = new THREE.PerspectiveCamera( 75, sketchWidth / sketchHeight, 1, 10000 );
      threeCamera.position.z = 500;
      threeCamera.position.x = (moveCameraX - threeCamera.position.x) *0.05; 
      threeCamera.position.y = (moveCameraY - threeCamera.position.y) *0.05; 
      threeCamera.position.z = (moveCameraZ - threeCamera.position.z) *0.05; 
      // rotation = 0;
      break;
    case 5:
      threeCamera.position.set(0, 0, 0);
      threeCamera.rotation.set(0, 0, 0);
for ( var y = 0; y < AMOUNT; y ++ ) {
          for ( var x = 0; x < AMOUNT; x ++ ) {
            subcamera = new THREE.PerspectiveCamera( 40, ASPECT_RATIO, 0.1, 10 );
            subcamera.bounds = new THREE.Vector4( x / AMOUNT, y / AMOUNT, SIZE, SIZE );
            subcamera.position.x = ( x / AMOUNT ) - 0.5;
            subcamera.position.y = 0.5 - ( y / AMOUNT );
            subcamera.position.z = 1.5;
            subcamera.position.multiplyScalar( 2 );
            subcamera.lookAt( new THREE.Vector3() );
            subcamera.updateMatrixWorld();
            cameras.push( subcamera );
          }
        }
        camera = new THREE.ArrayCamera( cameras );
        camera.position.z = 3;

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
  // scene2();

  // scene3();
  // scene4();
  // scene5();
  // scene6();
}

//pot -bkg
var data = control1;
function knobSerialData1(data){
          // console.log(data + ": data");
  // console.log(data);
  if (data<255){
    slide[1].scale.set(1.8, 1.8, 1.8);  // flip to background 1
    slide[2].scale.set(1,1,1); 
    slide[3].scale.set(1,1,1);
    slide[4].scale.set(1,1,1);    

   
  } else if (data>256 && data<513){
    slide[2].scale.set(1.8, 1.8, 1.8); // flip to background 2
    slide[1].scale.set(1,1,1);
    slide[3].scale.set(1,1,1);
    slide[4].scale.set(1,1,1); 

  
  } else if (data>513 && data<767){
    slide[3].scale.set(1.8, 1.8, 1.8);  // flip to background 3
    slide[4].scale.set(1,1,1); 
    slide[1].scale.set(1,1,1);
    slide[2].scale.set(1,1,1);
    

  } else if (data>767){
    slide[4].scale.set(1.8, 1.8, 1.8);  // flip to background 4
    slide[3].scale.set(1,1,1); 
    slide[2].scale.set(1,1,1);
    slide[1].scale.set(1,1,1); 
  
  }

}

//pushbutton 1
var wentToPage2 = false;
var data2 = control2;
function pushButtonData1(data2){
        if (data2 == 1 && !wentToPage2){
          scene2();
          goToPage(2);  // go to page 2, scene 2
          wentToPage2 = true;

        } 
      } 

//pot -song
var data3 = control3;
function knobSerialData2(data3){
  if (data3<255){
    slideSong[1].scale.set(1.8, 1.8, 1.8);  // flip to sound 1
    slideSong[2].scale.set(1,1,1); 
    slideSong[3].scale.set(1,1,1);
    slideSong[4].scale.set(1,1,1);
    // sound1.play();
    // sound2.pause();
    // sound3.pause();
    // sound4.pause();
  } 
  else if (data3>256 && data3<513){
    slideSong[2].scale.set(1.8, 1.8, 1.8); // flip to sound 2
    slideSong[1].scale.set(1,1,1);
    slideSong[3].scale.set(1,1,1);
    slideSong[4].scale.set(1,1,1); 
    sound2.play();
    sound1.pause();
    sound3.pause();
    sound4.pause();
  
  } else if (data3>513 && data3<767){
    slideSong[3].scale.set(1.8, 1.8, 1.8);  // flip to sound 3
    slideSong[4].scale.set(1,1,1); 
    slideSong[1].scale.set(1,1,1);
    slideSong[2].scale.set(1,1,1);
    sound3.play();
    sound2.pause();
    sound1.pause();
    sound4.pause();

  } else if (data3>767){
    slideSong[4].scale.set(1.8, 1.8, 1.8);  // flip to sound 4
    slideSong[3].scale.set(1,1,1); 
    slideSong[2].scale.set(1,1,1);
    slideSong[1].scale.set(1,1,1); 
    sound4.play();
    sound3.pause();
    sound2.pause();
    sound1.pause();

  }
}

//reset button 
var data11 = control11;
function resetButtonData(data11){
        if (data11 == 1){
          // zzzgoToPage(0);  
      }
}

//pushbutton 2
var wentToPlayScenes = false;
var data4 = control4;
function pushButtonData2(data4){
        if (data4 == 1 && !wentToPlayScenes){
           playScenes(control1);
           wentToPlayScenes = true;
      }
}

//go to selected scenes
var wentToPage3 = false;
var wentToPage4 = false;
var wentToPage5 = false;
function playScenes(data){

    if (data<255 && !wentToPage4){   
    console.log("going to scene 3");
        scene3();
        goToPage(3);  
        wentToPage3 = true;
      }

    if ((data>256 && data<513) && !wentToPage4){   
    console.log("going to scene 4");
        scene4();
        goToPage(4);  
        wentToPage4 = true;
      }

    if ((data>513 && data<767) && !wentToPage5){   
    console.log("going to scene 5");
        scene5();
        goToPage(5);  
        wentToPage5 = true;
      }
} 


 // load the toilet
jsonLoader.load(

  'images/toilette.js', //Created by Ieva Lickiene, www.meandmy3d.com

// Function when resource is loaded
//   function ( tGeo, tMat ) {
//   tMat = new THREE.MeshLambertMaterial({morphTargets : true, color:0xffffff });
//   for (i=0; i<50; i++){
//           toilette[i] = new THREE.Mesh( tGeo, tMat );
//           toilette[i].position.set( Math.floor(Math.random() * 1) -10, Math.floor(Math.random() * 1) -100, Math.floor(Math.random() * -1000) + -1000);
//           //toilette[i].position.set(  Math.random(),  Math.random(),  Math.random());
//           toilette[i].scale.set(60, 60, 60);
//           toilette[i].rotation.x = Math.random() * 2;
//           toilette[i].rotation.y = Math.random() * 2;
//           toilette[i].rotation.z = Math.random() * 2;
//           console.log(toilette[2]);
//      }       
// }); 

  function ( tGeo, tMat ) {
  tMat = new THREE.MeshLambertMaterial({morphTargets : true, color:0xffffff });
          toilette = new THREE.Mesh( tGeo, tMat );
          toilette.position.set( Math.floor(Math.random() * 1) -10, Math.floor(Math.random() * 1) -100, Math.floor(Math.random() * -1000) + -1000);
          //toilette[i].position.set(  Math.random(),  Math.random(),  Math.random());
          toilette.scale.set(60, 60, 60);
          toilette.rotation.x = Math.random() * 2;
          toilette.rotation.y = Math.random() * 2;
          toilette.rotation.z = Math.random() * 2;     
}); 


// //add toilets
// var data5 = control5;
// function knobSerialData3(data5){

//   // for (var i = -data5.length; i<data5.length; i++){
//     scene[current].add(toilette[data5]);
//     // scene[5].add(toilette[toiletValMap]);
//     // scene[6].add(toilette[toiletValMap]);
//   // }

// }


//add toilets
var data5 = control5;
function knobSerialData3(data5){

  // for (var i = -data5.length; i<data5.length; i++){
    scene[current].add(toilette[data5]);
    // count++;
    // scene[5].add(toilette[toiletValMap]);
    // sceneg[6].add(toilette[toiletValMap]);
  // }

}


//turn the ball
var data6 = control6;
function knobSerialData4(data6){
  if (current == 3){
    mesh2.rotation.y = data6; 
  }

  if (current == 4){
    mesh.rotation.y = data6; 
  }
}


//change color/ animate
var data7 = control7;
function knobSerialData5(data7){
    delta = data7;
}
 
//change camera position
var data8 = control8;
function knobSerialData6(data8){
    moveCameraX = data8;
    moveCameraY = data8;
    // moveCameraZ = data8;
}

// var wentToPage4Real = false;
// data = control1;
// function playScenes(data){
//   if (data<255 && !wentToPage4Real){                                      
//      scene4();
//      goToPage(4);  
//      wentToPage4Real = true;
//   }
// }




//pushbutton 2
// var wentToPage3 = false;
// var wentToPage4 = false;
// var wentToPage5 = false;
// var wentToPage6 = false;
// var data4 = control4;
// function pushButtonData2(data4){
//   if (data4 ==1){
//     console.log(data4);
//     executePages();
// }

// function executePages(){

//   //bkg1 
//     if (data<255 && data3<255){                                         // go to bkg1 and song1
//      scene3();
//      goToPage(3);  
//      wentToPage3 = true;
//      sound1.play();

//   } else if (data<255 && (data3>256 && data3<513)){                     // go to bkg1 and song2
//      scene3();
//      goToPage(3);  
//      wentToPage3 = true;        
//      sound2.play();

//   } else if (data<255 && (data3>513 && data3<767)){                     // go to bkg1 and song3
//      scene3();
//      goToPage(3);  
//      wentToPage3 = true;
//      sound3.play();

//   } else if (data<255 && data3>767){                                    // go to bkg1 and song4
//      scene3();
//      goToPage(3);  
//      wentToPage3 = true;
//      sound4.play();
// }

  //bkg2
//     if ((data>256 && data<513) && data3<255){                           // go to bkg2 and song1
//      scene4();
//      goToPage(4);  
//      wentToPage4 = true;
//      sound1.play();     
   
//   } else if ((data>256 && data<513) && (data3>256 && data3<513)){       // go to bkg2 and song2
//      scene4();
//      goToPage(4);  
//      wentToPage4 = true;
//      sound2.play();     
  
//   } else if ((data>256 && data<513) && (data3>513 && data3<767)){       // go to bkg2 and song3
//      scene4();
//      goToPage(4);  
//      wentToPage4 = true;
//      sound3.play();  

//   } else if ((data>256 && data<513) && (data>767)){                   // go to bkg2 and song4
//      scene4();
//      goToPage(4);  
//      wentToPage4 = true;
//      sound3.play();  
// }

//   //bkg3
//     if ((data>513 && data<767) && data3<255){                           // go to bkg3 and song1
//      scene5();
//      goToPage(5);  
//      wentToPage5 = true;
//      sound1.play();

//   } else if ((data>513 && data<767) && (data3>256 && data3<513)){       // go to bkg3 and song2
//      scene5();
//      goToPage(5);  
//      wentToPage5 = true;        
//      sound2.play();

//   } else if ((data>513 && data<767) && (data3>513 && data3<767)){       // go to bkg3 and song3
//      scene5();
//      goToPage(5);  
//      wentToPage5 = true;        
//      sound3.play();     

//   } else if ((data>513 && data<767) && data3>767){                      // go to bkg3 and song4
//      scene5();
//      goToPage(5);  
//      wentToPage3 = true;
//      sound4.play();
// }

//   //bkg4
//     if ((data>767) && data3<255){                           // go to bkg4 and song1
//      scene6();
//      goToPage(6);  
//      wentToPage6 = true;
//      sound1.play();

//   } else if ((data>767) && (data3>256 && data3<513)){       // go to bkg4 and song2
//      scene6();
//      goToPage(6);  
//      wentToPage6 = true;
//      sound2.play();

//   } else if ((data>767) && (data3>513 && data3<767)){       // go to bkg4 and song3
//      scene6();
//      goToPage(6);  
//      wentToPage6 = true;
//      sound3.play();   

//   } else if ((data>767) && data3>767){                      // go to bkg4 and song4      
//      scene6();
//      goToPage(6);  
//      wentToPage6 = true;
//      sound4.play();  
//   }
//   }
// }





// pushbutton 2
// var wentToPage3 = false;
// var wentToPage4 = false;
// var wentToPage5 = false;
// var wentToPage6 = false;
// var data4 = control4;
// function pushButtonData2(data4){
//           // console.log(data + ": data");
//         // if (data4 == 1 && !wentToPage3){     //once bkg and socng is picked, go to the 
//         //   goToPage(3);  // go to page 3, scene 3
//         //   wentToPage3 = true;
//         // } 
//         if (data4 == 1 && !wentToPage4){     //once bkg and socng is picked, go to the 
//           goToPage(4);  // go to page 4, scene 4
//           wentToPage4 = true;
//         } 

//         // } 
//         // if (data4 == 1 && !wentToPage5){     //once bkg and socng is picked, go to the 
//         //   goToPage(5);  // go to page 5, scene 5
//         //   wentToPage5 = true;
//         // } 

//         // } 
//         // if (data4 == 1 && !wentToPage5){     //once bkg and socng is picked, go to the 
//         //   goToPage(5);  // go to page 5, scene 5
//         //   wentToPage5 = true;
//         // } 

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
      //stop the intro video sound
      introVideo.pause();

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


        //uniform
      mesh.material.uniforms.delta.value = 0.5 + Math.sin(delta) * 0.7;

        //attribute
        for (var i = 0; i < vertexDisplacement.length; i ++) {
            vertexDisplacement[i] = 0.5 + Math.sin(i + delta) * 0.25;
        }
      mesh.geometry.attributes.vertexDisplacement.needsUpdate = true;
      // toilette.needsUpdate = true;
      break;
    case 4:
      // threeCamera.position.set(0, 0, 0);
      // threeCamera.rotation.set(0, 0, 0);
      // // rotation = 0;
      break;
    case 5:
      cylinder.rotation.x = mouseX;
      cylinder.rotation.z = mouseY;

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