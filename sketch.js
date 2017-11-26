// Use two canvases to draw images
var canvas; 
var ctx; 
var canvas2; 
var ctx2; 
var rms;
// var canvas3; 
// var ctx3; 

// set a fixed 2:1 for the images
var CANVW = 512;
var CANVH = 256;

// Three.js variables
var width = window.innerWidth;
var height = window.innerHeight;
var camera, scene, renderer; 
var geometry, texture1, mesh;
var geometry2, texture2, mesh2;
// var geometry3, texture3, mesh3;


function threeinit() {
  console.log("in init");
  // Setup canvas and context
  canvas = document.getElementById('canvas1');    
  canvas.width = CANVW;
  canvas.height = CANVH;
  ctx = canvas.getContext('2d');

  canvas2 = document.getElementById('canvas2');    
  canvas2.width = CANVW;
  canvas2.height = CANVH;
  ctx2 = canvas2.getContext('2d');

  // canvas3 = document.getElementById('canvas3');    
  // canvas3.width = CANVW;
  // canvas3.height = CANVH;
  // ctx3 = canvas3.getContext('2d');

  // Three.js renderer
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
  
  // Three.js scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0xff0000 );
  camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
  camera.position.z = 500;
  scene.add(camera);

  // Create first cube   
  texture1 = new THREE.Texture(canvas);
  var material = new THREE.MeshBasicMaterial({ map: texture1 });
  geometry = new THREE.BoxGeometry( 100, 100, 100 );
  geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 100, 0 ) );
  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  // Create second cube 
  texture2 = new THREE.Texture(canvas2);
  var material2 = new THREE.MeshBasicMaterial({ map: texture2 });
  geometry2 = new THREE.BoxGeometry( rms*1000, rms*1000, rms*1000 );
  geometry2.applyMatrix( new THREE.Matrix4().makeTranslation( 0, -50, 0 ) );
  mesh2 = new THREE.Mesh( geometry2, material2 );
  scene.add( mesh2 );

   // Create third cube 
  // texture3 = new THREE.Texture(canvas3);
  // var material3 = new THREE.MeshBasicMaterial({ map: texture3 });
  // geometry3 = new THREE.BoxGeometry( 150, 150, 150 );
  // geometry3.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 200, 0 ) );
  // mesh2 = new THREE.Mesh( geometry3, material3 );
  // scene.add( mesh3 );

  // instantiate a loader for my first image 
  var loader = new THREE.ImageLoader();

  // load first image
  loader.load(
    // image URL
    'images/turtle2.png',
    // Function when image is loaded
    function ( image ) {
      // drawing image on first canvas
      ctx.drawImage( image, 0, 0, CANVW, CANVH);
    },
    // Function called when download progresses
    function ( xhr ) {
      console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    },
    // Function called when download errors
    function ( xhr ) {
      console.log( 'An error happened' );
    }
  );

  // instantiate a loader for my second image 
  var loader2 = new THREE.ImageLoader();

  // load second image
  loader2.load(
    // image URL
    'images/cat.gif',

    // Function when image is loaded
    function ( image ) {
    
      // draw image on a canvas 
      ctx2.drawImage( image, 0, 0, CANVW, CANVH);
    },
    // Function called when download progresses
    function ( xhr ) {
      console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    },
    // Function called when download errors
    function ( xhr ) {
      console.log( 'An error happened' );
    }
  );

  //   // instantiate a loader for my third image 
  // var loader3 = new THREE.ImageLoader();

  // // load second image
  // loader3.load(
  //   // image URL
  //   'images/cat.gif',

  //   // Function when image is loaded
  //   function ( image ) {
    
  //     // draw image on a canvas 
  //     ctx3.drawImage( image, 0, 0, CANVW, CANVH);
  //   },
  //   // Function called when download progresses
  //   function ( xhr ) {
  //     console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
  //   },
  //   // Function called when download errors
  //   function ( xhr ) {
  //     console.log( 'An error happened' );
  //   }
  // );



  // Listen for window resize  
  window.addEventListener( 'resize', onWindowResize, false );

  // Listen for mouse click on canvas 
  window.addEventListener( 'click', mousePressed, false);
}



function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

// Call this function on your serial input instead of on the mouse click
function mousePressed(evt) {
  console.log("changing background");
  scene.background = new THREE.Color( 0x00ff00 );

}

function threeanimate() {
  requestAnimationFrame(threeanimate);

  // Update the textures for each animate frame  
  texture1.needsUpdate = true;
  mesh.rotation.x += 0.01;
  
  texture2.needsUpdate = true;
  mesh2.rotation.y += 0.01;
    
  // texture3.needsUpdate = true;
  // mesh3.rotation.y += 0.01;

  renderer.render(scene, camera);
}

//Call capture in the render function, passing in the canvas 
function threerender(){
  requestAnimationFrame(threerender);
  // rendering stuff ...
 // capturer.capture( canvas, canvas2 ); //might be hard because there are two..what about the main one?
}


