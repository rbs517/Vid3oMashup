//SCENE 5 -bkg3 (sandbox)



function scene5(){
  var index = 5;
  var cylinder;
  var bkMat, bkGeo, cyGeo, cyMat;
  var mouseX = 0;
  var mouseY = 0;
  var subcamera, texture, geometry, mesh;
  var canvas, ctx;
  var CANVW = 512;
  var CANVH = 256;


  
        //LIGHTS
        scene[index].add( new THREE.AmbientLight( 0x222244 ) );
        var light = new THREE.DirectionalLight();
        light.position.set( 0.9, 0.5, 4 );
        light.castShadow = true;
        light.shadow.camera.zoom = 4; // tighter shadow map
        scene[index].add(light);

        
        //EVENT LISTENERS
        window.addEventListener( 'resize', onWindowResize, false );
        // window.addEventListener( 'click', mousePressed, false);
        // document.addEventListener( 'mousemove',  onDocumentMouseMove, false );

        //BACKGROUND
        bkGeo = new THREE.PlaneBufferGeometry( 100, 100 );
        bkMat = new THREE.MeshPhysicalMaterial( { color: 0x000032 } );
        // var background = new THREE.Mesh( geometry, overrideMaterial );
        var background = new THREE.Mesh(bkGeo, bkMat );
        background.receiveShadow = true;
        background.position.set( 0, 0, - 1 );
        scene[index].add( background );

        //CYLINDER
        // var geometry = new THREE.CylinderBufferGeometry( 0.5, 0.5, 1, 32 );
        cyGeo = new THREE.CylinderBufferGeometry( 0.9, 0.5, 4, 32);
        cyMat = new THREE.MeshPhongMaterial( { color: 0xf8000 } );
        cylinder = new THREE.Mesh( cyGeo, cyMat);
        cylinder.castShadow = true;
        cylinder.receiveShadow = true;
        scene[index].add( cylinder );

        // Setup canvas and context
          canvas = document.getElementById('canvas');    
          canvas.width = CANVW;
          canvas.height = CANVH;
          ctx = canvas.getContext('2d');
          ctx.color = 0xffffff;

          // Create first cube   
          texture = new THREE.Texture(canvas);
          syMat1 = new THREE.MeshBasicMaterial({ map: texture });
          syGeo1 = new THREE.SphereBufferGeometry( 1, 1, 1, 32);
          syGeo1.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 100, 0 ) );
          sphere1 = new THREE.Mesh( syGeo1, syMat1 );
          scene[index].add( sphere1 );
}

// function onDocumentMouseMove(event) {
//       mouseX = ( event.clientX - windowHalfX ) * 10;
//       mouseY = ( event.clientY - windowHalfY ) * 10;
//     }

    // function mousePressed(evt) {
    //   console.log("changing background");
    //   // var c = new THREE.Color(0Xc465e5);

    //   // cyMat.color = c;

    //   cyMat.wireframe = true;

    //   // cylinder.wireframe = true;
    //   // var cyMat2 = new THREE.MeshBasicMaterial();
    //   // cyMat2.wireframe = true;
    //   // var cyText = new THREE.Mesh( cyGeo, cyMat2);
    //   // cylinder = cyText;
    //   // scene.background = 0Xc465e5;
    //   //scene.overrideMaterial = new THREE.MeshPhysicalMaterial( { color: 0Xc465e5 } );
    //   // material = new THREE.MeshPhysicalMaterial( { color: 0Xc465e5 } );

    //  }

