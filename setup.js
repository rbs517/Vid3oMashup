var SCREEN_WIDTH = window.innerWidth;
var SCREEN_HEIGHT = window.innerHeight;

var container;

// var sprite;

var camera;
var scene;
var renderer;

var mouseX = 0;
var mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var sprites = []; 
var spriteImage = THREE.TextureLoader.load( "snow.png" );
// spriteImage.src = 'http://i.imgur.com/cTALZ.png'; 



function snowinit() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 800 );
    camera.position.z = 200;

    scene = new THREE.Scene();
    scene.add(camera);
        
    renderer = new THREE.CanvasRenderer();
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    var material = new THREE.PointsMaterial( { map: new THREE.Texture(spriteImage) } );
        
    for (var i = 0; i < 2000; i++) {

        sprite = new Particle3D( material);
        sprite.position.x = Math.random() * 2000 - 500;
        sprite.position.y = Math.random() * 2000 - 500;
        sprite.position.z = Math.random() * 2000 - 500;
        sprite.scale.x = sprite.scale.y =  3; //size of flake
        scene.add( sprite );
        
        sprites.push(sprite); 
    }

    container.appendChild( renderer.domElement );


    document.addEventListener('mousemove', onDocumentMouseMove, false );
    document.addEventListener('touchstart', onDocumentTouchStart, false );
    document.addEventListener('touchmove', onDocumentTouchMove, false );
    
    setInterval(loop, 1000 / 60);
    
}

function onDocumentMouseMove(event) {

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;
}

function onDocumentTouchStart( event ) {

    if ( event.touches.length == 1 ) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }
}

function onDocumentTouchMove( event ) {

    if ( event.touches.length == 1 ) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;
    }
}

//

function loop() {

for(var i = 0; i<sprites.length; i++) {

        var sprite = sprites[i]; 
        sprite.updatePhysics(); 

        // with(sprite.position) {
            if(sprite.position.y<-1000) sprite.position.y+=2000; 
            if(sprite.position.x>1000) sprite.position.x-=2000; 
            else if(sprite.position.x<-1000) sprite.position.x+=2000; 
            if(sprite.position.z>1000) sprite.position.z-=2000; 
            else if(sprite.position.z<-1000) sprite.position.z+=2000; 
        // }                
    }

    camera.position.x += ( mouseX - camera.position.x ) * 0.05;
    camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
    camera.lookAt(scene.position); 

    renderer.render( scene, camera );
    
    // requestAnimationFrame(render);

}