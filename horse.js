			var container, stats;
			var camera, scene, projector, renderer;
			var mesh, mixer;
			horseinit();
			horseanimate();
			function horseinit() {
				//
				camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
				camera.position.y = 300;
				camera.target = new THREE.Vector3( 0, 150, 0 );
				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xf0f0f0 );
				//
				var light = new THREE.DirectionalLight( 0xefefff, 1.5 );
				light.position.set( 1, 1, 1 ).normalize();
				scene.add( light );
				var light = new THREE.DirectionalLight( 0xffefef, 1.5 );
				light.position.set( -1, -1, -1 ).normalize();
				scene.add( light );
				var loader = new THREE.JSONLoader();
				loader.load( "modelhorse.js", function( geometry ) {
					mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( {
						vertexColors: THREE.FaceColors,
						morphTargets: true
					} ) );
					mesh.scale.set( 1.5, 1.5, 1.5 );
					scene.add( mesh );
					mixer = new THREE.AnimationMixer( mesh );
					var clip = THREE.AnimationClip.CreateFromMorphTargetSequence( 'gallop', geometry.morphTargets, 30 );
					mixer.clipAction( clip ).setDuration( 1 ).play();
				} );
				//
				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				
				//
				window.addEventListener( 'resize', horseonWindowResize, false );
			}
			function horseonWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}
			//
			function horseanimate() {
				requestAnimationFrame( animate );
				render();
			}
			var radius = 600;
			var theta = 0;
			var prevTime = Date.now();
			
			function horserender() {
				theta += 0.1;
				camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
				camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
				camera.lookAt( camera.target );
				if ( mixer ) {
					var time = Date.now();
					mixer.update( ( time - prevTime ) * 0.001 );
					prevTime = time;
				}
				renderer.render( scene, camera );
			}
