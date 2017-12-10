//NODE JS CONNECTION SETUP
var connection = new WebSocket('ws://127.0.0.1:8000');
var control1;
var control2;
var control3;
var control4;

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
    var resultString = message.data;
// split the data string:
    var splitString = resultString.split(",");

// console.log(splitString);
    control1 = splitString[0];
    control2 = splitString[1];
    control3 = splitString[2];
    control4 = splitString[3];
    knobSerialData1(control1);
    pushButtonData1(control2);
    knobSerialData2(control3);
    pushButtonData2(control4);
};

//DECLARE GLOBAL VARIABLES
var current = 0;
var scene  = [];
var container;
var animate;
var threeRenderer;
var lastRenderTime;
var threeCamera;

window.addEventListener('load', onLoad);

//ONLOAD 
function onLoad(){
  var width = window.innerWidth;
  var height = window.innerHeight;

  // initialize
  threeRenderer = new THREE.WebGLRenderer({ });
  threeRenderer.setPixelRatio(window.devicePixelRatio);
  threeRenderer.setSize(width, height);
  document.body.appendChild(threeRenderer.domElement);

// establish the scenes
  scene[0]  = new THREE.Scene();
  scene[1]  = new THREE.Scene();
  scene[2]  = new THREE.Scene();
  scene[3]  = new THREE.Scene();
  scene[4]  = new THREE.Scene();
  scene[5]  = new THREE.Scene();
  scene[6]  = new THREE.Scene();

// EVENT LISTENERS
  window.addEventListener('resize', onWindowResize, true );

  introPage();
  update();
  animate();
}

// call the scenes
  // scene0();
  // scene1();
  // scene2();

//EVENTS
function onWindowResize(){
  var width = window.innerWidth;
  var height = window.innerHeight;
  threeRenderer.setPixelRatio(window.devicePixelRatio);
  threeRenderer.setSize(width, height);
  threeCamera.aspect = width/height;
  threeCamera.updateProjectionMatrix();
}

// function changeScene(mode){
//   current = mode;
// }

// OTHER COMMON SCENE FUNCTIONS
function update(){
  window.requestAnimationFrame(animate);
}

function animate(timestamp) {
  var delta = Math.min(timestamp - lastRenderTime, 500);
  lastRenderTime = timestamp;
  threeRenderer.render(scene[current], threeCamera);
}

function introPage(){
  scene0();
  // current = 0;
  setTimeout(
    function goToPage1(){ 
      scene1();
      current = 1;
      }, 
      5000
    );
}

// introPage();
// update();
// animate();

// //CREATE SCENE INDEX
// function createSceneIndex() {
//   for (var i = 0; i < 7; i++) {
//     scene0();
//     scene1();
//     scene2();
//     scene3();
//     scene4();
//     scene5();
//     scene6();
//   }
// }










//SCENE 1
  var introVideo, introTexture, textGeo;
  var rotation = 0;
  var height = 4,
  size = 25,
  curveSegments = 4,
  bevelThickness = 2,
  bevelSize = 0,
  bevelSegments = 1,
  bevelEnabled = true,
  font = undefined,     
          fontName = "helvetiker", // helvetiker, optimer, gentilis, droid sans, droid serif
          fontWeight = "normal"; // normal bold
var cubeMat;
function scene0 () {

  //declaring scene 1 variables
  var index = 0;

  // var introVideo, introTexture, textGeo;
  // var rotation = 0;
  // var height = 4,
  // size = 25,
  // curveSegments = 4,
  // bevelThickness = 2,
  // bevelSize = 0,
  // bevelSegments = 1,
  // bevelEnabled = true,
  // font = undefined,     
  //         fontName = "helvetiker", // helvetiker, optimer, gentilis, droid sans, droid serif
  //         fontWeight = "normal"; // normal bold

  //creating the camera scene 1
  threeCamera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight,.1, 1000);
  threeCamera.position.x = 40;
  threeCamera.position.y = 40;
  threeCamera.position.z = 40;

  // //creating the renderer scene 1 
  // threeRenderer = new THREE.WebGLRenderer(); 
  // threeRenderer.setClearColor(0xdddddd);
  // threeRenderer.setSize(window.innerWidth, window.innerHeight);

  // establishing the scene 1 video background
  introVideo = document.getElementById( 'imovievideo' );
  introTexture = new THREE.VideoTexture( introVideo );
  introTexture.minFilter = THREE.LinearFilter;
  introTexture.magFilter = THREE.LinearFilter;
  introTexture.format = THREE.RGBFormat;
  scene[index].background = introTexture;

  // creating the cube geometry scene 1
  var cubeGeo = new THREE.BoxGeometry(5,5,5);
  cubeMat = new THREE.MeshNormalMaterial();
  var cube = new THREE.Mesh(cubeGeo, cubeMat);
  cube.castShadow = true;
  cube.position.y = 2.5;
  scene[index].add(cube);

  // creating the plane geometry scene 1
  var planeGeo = new THREE.PlaneGeometry(100,100,100);
  var planeMat = new THREE.MeshBasicMaterial({ color: 0xffffff, opacity: 0, transparent: true });
  var introPlane = new THREE.Mesh(planeGeo,planeMat);
  introPlane.rotation.x = -.5* Math.PI;
  introPlane.receiveShadow = true;
  var spotlight = new THREE.SpotLight(0xffffff);
  spotlight.position.set(30,60,60);
  scene[index].add(introPlane);  


  threeCamera.lookAt(scene[index].position);

  loadFont();
  renderUpdate(index);
}

// render scene 1
var renderUpdate = function (index) {
  spinCamera(index);
};

// create the text
function createText() {
  textGeo = new THREE.TextGeometry( '  ' + 'viD3o' + '\n'  + 'mashup', {
    font: font,
    size: size,
    height: height,
    curveSegments:curveSegments,
    weight: "normal",
    bevelThickness:bevelThickness,
    bevelSize:bevelSize,
    bevelSegments:bevelSegments,
    bevelEnabled:bevelEnabled
  });
  textGeo.computeBoundingBox();
  textGeo.computeVertexNormals();
  var title = new THREE.Mesh(textGeo, cubeMat);
  title.position.x = -textGeo.boundingBox.max.x/2;
  scene[index].add(title);
}

// load the title font  
function loadFont() {
  var loader = new THREE.FontLoader();
  loader.load('files/typeface.js', function (res) {
    font = res;
    createText();
  });
}

// spin the camera
function spinCamera(index){
  rotation = 0.008;
  threeCamera.position.z = Math.sin(rotation) * 80;
  threeCamera.position.y = Math.cos(rotation) * 80;
  threeCamera.lookAt(scene[index].position);
}

//song is from https://freesound.org/people/waveplay/sounds/221766/ 