// SCENE 3 -bkg1 (osc)

function scene3(){
  var index = 3;
  // controls.update();
    //LIGHTS
    var light = new THREE.AmbientLight(0xffffff, 0.5);
    scene[index].add(light);

    var light2 = new THREE.PointLight(0xffffff, 0.5);
    scene[index].add(light2);

    customUniforms = {
        delta: {value: 0}
    };
    material = new THREE.ShaderMaterial({
        uniforms: customUniforms,
        vertexShader: document.getElementById('vertexShader2').textContent,
        fragmentShader: document.getElementById('fragmentShader2').textContent
    });

    //Here I am adding the mesh to the scene. The mesh includes a shape and the material of that shape
    geometry = new THREE.BoxBufferGeometry(120, 120, 100, 10, 10, 10);
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -1000;
    mesh.position.x = -20;
    mesh.position.y = innerHeight;
    scene[index].add(mesh);

    //Here I am adding another mesh to the scene. The mesh includes a shape and the material of that shape
    geometry2 = new THREE.SphereGeometry(100, 20, 20);
    mesh2 = new THREE.Mesh(geometry2, material);
    mesh2.position.z = -1000;
    mesh2.position.x = 1;
    mesh2.position.y = 420;
    scene[index].add(mesh2);

    //Here I am adding another mesh to the scene. The mesh includes a shape and the material of that shape
    geometry3 = new THREE.PlaneGeometry(100000, 100000, 150, 1500);
    mesh3 = new THREE.Mesh(geometry3, material);
    mesh3.rotation.x = -90 * Math.PI / 180;
    mesh3.position.y = -100;
    scene[index].add(mesh3);
    

    //attribute
    vertexDisplacement = new Float32Array(geometry.attributes.position.count);

    for (var i = 0; i < vertexDisplacement.length; i ++) {
        vertexDisplacement[i] = Math.sin(i);
    }

    geometry.addAttribute('vertexDisplacement', new THREE.BufferAttribute(vertexDisplacement, 1));
}
    // //EVENT LISTENERS
    // window.addEventListener( 'resize', onWindowResize, false );
    // window.addEventListener( 'click', mousePressed, false);
    // window.addEventListener( 'click', mousePressed2, false);
    // document.addEventListener( 'mousemove',  onDocumentMouseMove, false );

//     function mousePressed2(click) {
// 		console.log("adding toilet");
// 		// scene.background = new THREE.Color( 0Xc465e5 );
// 		// scene.add( toilette2 );
// 		// scene.add( toilette[evt] );

// 		console.log('click = ' + number);
// 		number++;
// 		scene[index].add(toilette[number]);

// 	}
// }

// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize( window.innerWidth, window.innerHeight );
// }


// function mousePressed(evt) {
//     console.log("changing background");
//     var c = new THREE.Color(0Xc465e5);
//     cyMat.color = c;

//     //change color
//     delta += 0.1; 

//     //spin the ball
//     mesh2.rotation.y -= 100;    //change 

//     material.wireframe = true;

// }






// render();

// function animate() {
//     // cylinder.rotation.x += 0.005;
//     // cylinder.rotation.z += 0.01;
//     // cylinder.rotation.x = mouseX;
//     // cylinder.rotation.z = mouseY;
//     render();
// }


// function render() {

//         //update delta over time
//         // delta += 0.1;

//         //uniform
//         mesh.material.uniforms.delta.value = 0.5 + Math.sin(delta) * 0.7;

//         //attribute
//         for (var i = 0; i < vertexDisplacement.length; i ++) {
//             vertexDisplacement[i] = 0.5 + Math.sin(i + delta) * 0.25;
//         }
//         mesh.geometry.attributes.vertexDisplacement.needsUpdate = true;
//         camera.lookAt( scene.position );
//     	renderer.render(scene, camera);
//     	requestAnimationFrame(render);
//     }

