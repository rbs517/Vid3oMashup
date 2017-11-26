	var camera, scene, renderer;
	var cylinder;
	var bkMat, bkGeo, cyGeo, cyMat;
	var mouseX = 0;
	var mouseY = 0;
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;
	init();
	animate();

	function init() {

				 //CAMERA
		var AMOUNT = 8;
		var SIZE = 1 / AMOUNT;
		var ASPECT_RATIO = window.innerWidth / window.innerHeight;
		var cameras = [];

				for ( var y = 0; y < AMOUNT; y ++ ) {
					for ( var x = 0; x < AMOUNT; x ++ ) {
						var subcamera = new THREE.PerspectiveCamera( 40, ASPECT_RATIO, 0.1, 10 );
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

				//SCENE
				scene = new THREE.Scene();

				//LIGHTS
				scene.add( new THREE.AmbientLight( 0x222244 ) );
				var light = new THREE.DirectionalLight();
				light.position.set( 0.9, 0.5, 4 );
				light.castShadow = true;
				light.shadow.camera.zoom = 4; // tighter shadow map
				scene.add( light );

				//RENDERER
				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.shadowMap.enabled = true;
				document.body.appendChild( renderer.domElement );
				
				//EVENT LISTENERS
				window.addEventListener( 'resize', onWindowResize, false );
				window.addEventListener( 'click', mousePressed, false);
			 	document.addEventListener( 'mousemove',  onDocumentMouseMove, false );

				//BACKGROUND
				bkGeo = new THREE.PlaneBufferGeometry( 100, 100 );
				bkMat = new THREE.MeshPhysicalMaterial( { color: 0x000032 } );
				// var background = new THREE.Mesh( geometry, overrideMaterial );
				var background = new THREE.Mesh(bkGeo, bkMat );
				background.receiveShadow = true;
				background.position.set( 0, 0, - 1 );
				scene.add( background );

				//CYLINDER
				// var geometry = new THREE.CylinderBufferGeometry( 0.5, 0.5, 1, 32 );
				cyGeo = new THREE.CylinderBufferGeometry( 0.9, 0.5, 4, 32);
				cyMat = new THREE.MeshPhongMaterial( { color: 0xf8000 } );
				cylinder = new THREE.Mesh( cyGeo, cyMat);
				cylinder.castShadow = true;
				cylinder.receiveShadow = true;
				scene.add( cylinder );
			 }

			 function onWindowResize() {
			 	camera.aspect = window.innerWidth / window.innerHeight;
			 	camera.updateProjectionMatrix();
			 	renderer.setSize( window.innerWidth, window.innerHeight );
			 }

			function onDocumentMouseMove(event) {
			mouseX = ( event.clientX - windowHalfX ) * 10;
			mouseY = ( event.clientY - windowHalfY ) * 10;
		}

		function mousePressed(evt) {
			console.log("changing background");
			// var c = new THREE.Color(0Xc465e5);
			// cyMat.color = c;

			cyMat.wireframe = true;

			// cylinder.wireframe = true;
			// var cyMat2 = new THREE.MeshBasicMaterial();
			// cyMat2.wireframe = true;
			// var cyText = new THREE.Mesh( cyGeo, cyMat2);
			// cylinder = cyText;
			// scene.background = 0Xc465e5;
			//scene.overrideMaterial = new THREE.MeshPhysicalMaterial( { color: 0Xc465e5 } );
 		 	// material = new THREE.MeshPhysicalMaterial( { color: 0Xc465e5 } );

 		 }

 		 function animate() {
 		 	// cylinder.rotation.x += 0.005;
 		 	// cylinder.rotation.z += 0.01;
				cylinder.rotation.x = mouseX;
				cylinder.rotation.z = mouseY;
				renderer.render( scene, camera );
				requestAnimationFrame( animate );
			}