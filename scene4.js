// SCENE 4 -bkg2 (sandbox)


function scene4(){
  var index = 4;
    // controls.update();
  var AMOUNT = 100;
      var material, group;
      var mouseX =0;
      var mouseY = 0;
      var windowHalfX = window.innerWidth / 2;
      var windowHalfY = window.innerHeight / 2;

        // camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        // camera.position.z = 500;
        // scene.background = new THREE.Color( 0xff0000 );

        // QRCODE
        qrCode = new THREE.Mesh( new Qrcode(), new THREE.MeshLambertMaterial( { /*emissive: 0xff0000,*/ vertexColors: THREE.FaceColors } ) );
        qrCode.scale.x = qrCode.scale.y = qrCode.scale.z = 2;
        scene[index].add(qrCode);

        // CUBES
        var cube = new THREE.BoxGeometry( 100, 100, 100 );
        mesh = new THREE.Mesh( cube, new THREE.MeshBasicMaterial( { color: 0x0000ff, opacity: 0.5, transparent: true } ) );
        mesh.position.x = 500;
        // mesh.rotation.x = Math.random();
        // mesh.rotation.y = Math.random();
        mesh.scale.x = mesh.scale.y = mesh.scale.z = 2;
        scene[index].add(mesh);
        mesh = new THREE.Mesh( cube, new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ) );
        mesh.position.x = 500;
        mesh.position.y = 500;
        // mesh.rotation.x = Math.random();
        // mesh.rotation.y = Math.random();
        mesh.scale.x = mesh.scale.y = mesh.scale.z = 2;
        scene[index].add(mesh);

        // PLANE
        mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 100, 100 ), new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff, side: THREE.DoubleSide } ) );
        mesh.position.y = -500;
        mesh.scale.x = mesh.scale.y = mesh.scale.z = 2;
        scene[index].add(mesh);

        // CYLINDER
        mesh = new THREE.Mesh( new THREE.CylinderGeometry( 20, 100, 200, 10 ), new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ) );
        mesh.position.x = -500;
        // mesh.rotation.x = - Math.PI / 2;
        mesh.scale.x = mesh.scale.y = mesh.scale.z = 2;
        scene[index].add(mesh);

        // POLYFIELD
        var geometry = new THREE.Geometry();
        var polyMaterial = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, side: THREE.DoubleSide } );
        for ( var i = 0; i < 100; i ++ ) {
          var v = new THREE.Vector3(
            Math.random() * 1000 - 500,
            Math.random() * 1000 - 500,
            Math.random() * 1000 - 500
          );
          var v0 = new THREE.Vector3(
            Math.random() * 100 - 50,
            Math.random() * 100 - 50,
            Math.random() * 100 - 50
          );
          var v1 = new THREE.Vector3(
            Math.random() * 100 - 50,
            Math.random() * 100 - 50,
            Math.random() * 100 - 50
          );
          var v2 = new THREE.Vector3(
            Math.random() * 100 - 50,
            Math.random() * 100 - 50,
            Math.random() * 100 - 50
          );
          v0.add( v );
          v1.add( v );
          v2.add( v );
          var face = new THREE.Face3(
            geometry.vertices.push( v0 ) - 1,
            geometry.vertices.push( v1 ) - 1,
            geometry.vertices.push( v2 ) - 1,
            null,
            new THREE.Color( Math.random() * 0xffffff )
          );
          geometry.faces.push( face );
        }
        geometry.computeFaceNormals();
        group = new THREE.Mesh( geometry, polyMaterial );
        group.scale.set( 2, 2, 2 );
        scene[index].add(group);

        // SPRITES
        for ( i = 0; i < 50; i ++ ) {
          var spriteMaterial = new THREE.SpriteMaterial( { color: Math.random() * 0xffffff } );
          var sprite = new THREE.Sprite( spriteMaterial );
          sprite.position.x = Math.random() * 1000 - 500;
          sprite.position.y = Math.random() * 1000 - 500;
          sprite.position.z = Math.random() * 1000 - 500;
          sprite.scale.set( 64, 64, 1 );
          scene[index].add(sprite);
        }

        // CUSTOM- Circles
        // var node = document.createElementNS( 'http://www.w3.org/2000/svg', 'circle' );
        // node.setAttribute( 'stroke', 'black' );
        // node.setAttribute( 'fill', 'red' );
        // node.setAttribute( 'r', '40' );
        // for ( i = 0; i < 50; i ++ ) {
        //   var object = new THREE.SVGObject( node.cloneNode() );
        //   object.position.x = Math.random() * 1000 - 500;
        //   object.position.y = Math.random() * 1000 - 500;
        //   object.position.z = Math.random() * 1000 - 500;
        //   scene[index].add(object);
        // }

        // LIGHTS
        var ambient = new THREE.AmbientLight( 0x80ffff );
        scene[index].add(ambient);
        directional = new THREE.DirectionalLight( 0xffff00 );
        directional.position.set( - 1, 0.5, 0 );
        scene[index].add(directional);








        // threeRenderer = new THREE.SVGRenderer();
        // threeRenderer.setSize( window.innerWidth, window.innerHeight );
        // threeRenderer.setQuality( 'low' );
        // document.body.appendChild( threeRenderer.domElement );



//       function ChangeBkgColor(evt) {
//       console.log("changing background");
//         scene.background = new THREE.Color( 0Xc465e5 );
//         // var c = new THREE.Color(0Xc465e5);
//       // cyMat.color = c;

// }

}