
var container;
var cameraThree, scene, renderer;
var geometry, group;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
// var evt;
// var move;
var mouseX = 0;
var mouseY = 0;

var heartShape = new THREE.Shape();

heartShape.moveTo( x + 50, y + 50 );
heartShape.bezierCurveTo( x + 50, y + 50, x + 40, y, x, y );
heartShape.bezierCurveTo( x - 60, y, x - 60, y + 70,x - 60, y + 70 );
heartShape.bezierCurveTo( x - 60, y + 110, x - 30, y + 150.4, x + 50, y + 190 );
heartShape.bezierCurveTo( x + 120, y + 150.4, x + 160, y + 110, x + 160, y + 70 );
heartShape.bezierCurveTo( x + 160, y + 70, x + 160, y, x + 100, y );
heartShape.bezierCurveTo( x + 70, y, x + 50, y + 50, x + 50, y + 50 );

// document.addEventListener( 'serialData', threeSerialData, false );
// init();
// animate();

document.addEventListener( 'mousemove',  onDocumentMouseMove, false );
init();
animate();

function init() {
	container = document.createElement( 'div' );
	document.body.appendChild( container );
	cameraThree = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
  	cameraThree.position.z = 10;
  	cameraThree.position.x = 0;
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xffffff );
	var geometry = new THREE.ShapeGeometry( heartShape );
	var material = new THREE.MeshNormalMaterial( { overdraw: 0.5 } );
	group = new THREE.Group();
	for ( var i = 0; i < 200; i ++ ) {
		var mesh = new THREE.Mesh( geometry, material );
			mesh.position.x = Math.random() * 2000 - 1000;
			mesh.position.y = Math.random() * 2000 - 1000;
			mesh.position.z = Math.random() * 2000 - 1000;
			mesh.rotation.x = Math.random() * 2 * Math.PI;
			mesh.rotation.y = Math.random() * 2 * Math.PI;
			mesh.matrixAutoUpdate = false;
			mesh.updateMatrix();
			group.add( mesh );
				}
	scene.add( group );
	renderer = new THREE.CanvasRenderer();
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );
	window.addEventListener( 'resize', onWindowResize, false );
}
			

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;
	cameraThree.aspect = window.innerWidth / window.innerHeight;
	cameraThree.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}
			

function onDocumentMouseMove(event) {
	mouseX = ( event.clientX - windowHalfX ) * 10;
	mouseY = ( event.clientY - windowHalfY ) * 10;
}

// function threeSerialData(evt) {
//   console.log(evt);
//   move = map(evt, 0,255,-50, 50); 
// }


function animate() {
	requestAnimationFrame( animate );
	render();
}
			

function render() {
	cameraThree.position.x = mouseX ;
 	cameraThree.position.y = mouseY;
 	// cameraThree.position.x = move ;
 	// cameraThree.position.y = move ;
	// cameraThree.position.y = ( - left - cameraThree.position.y ) * .05;
	cameraThree.lookAt( scene.position );
	renderer.render( scene, cameraThree );
}
