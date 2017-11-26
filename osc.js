var renderer,
    	scene,
    	camera,
        canvas,
    	myCanvas = document.getElementById('myCanvas');


    //LOADING IMAGE
    // instantiate a loader
    var loader = new THREE.ImageLoader();

    // load a image resource
    loader.load(
    // resource URL
    'Threejs3-Osc/blah.png',
    // Function when resource is loaded
    function ( image ) {
        // do something with it

        // like drawing a part of it on a canvas
        canvas = document.getElementById('canvas1'); 
        var context = myCanvas.getContext( '2d' );
        context.drawImage( image, 100, 100 );
    });

    //RENDERER
    //Here I am turning the renderer into an object so I can add properties
    renderer = new THREE.WebGLRenderer({
      canvas: myCanvas, 
      antialias: true
    });
    renderer.setClearColor(0xffffff);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    //CAMERA
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 300, 10000 );

    //SCENE
    //I need to add the lights to the scene, that consists of a camera, renderer, and a canvas
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x000000 ); //background as color
    // scene.background = image( 0x000000 ); //background as picture?

    //LIGHTS
    var light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    var light2 = new THREE.PointLight(0xffffff, 0.5);
    scene.add(light2);
  
    
    //Custom Shader Material
    //textContent = value of that string
    /*
    var material = new THREE.ShaderMaterial({
        uniforms: [],
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent
    });
    */


    var customUniforms = {
        delta: {value: 0}
    };
    var material = new THREE.ShaderMaterial({
        uniforms: customUniforms,
        vertexShader: document.getElementById('vertexShader2').textContent,
        fragmentShader: document.getElementById('fragmentShader2').textContent
    });



    //Here I am adding the mesh to the scene. The mesh includes a shape and the material of that shape
    var geometry = new THREE.BoxBufferGeometry(120, 120, 100, 10, 10, 10);
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -1000;
    mesh.position.x = -30;
    mesh.position.y = -40;
    scene.add(mesh);

    //Here I am adding another mesh to the scene. The mesh includes a shape and the material of that shape
    var geometry2 = new THREE.SphereGeometry(100, 20, 20);
    var mesh2 = new THREE.Mesh(geometry2, material);
    mesh2.position.z = -1000;
    mesh2.position.x = 1;
    mesh2.position.y = 100;
    scene.add(mesh2);

    //Here I am adding another mesh to the scene. The mesh includes a shape and the material of that shape
    var geometry3 = new THREE.PlaneGeometry(100000, 100000, 150, 1500);
    var mesh3 = new THREE.Mesh(geometry3, material);
    mesh3.rotation.x = -90 * Math.PI / 180;
    mesh3.position.y = -100;
    scene.add(mesh3);
    
    // var geometry4 = new THREE.SphereGeometry(100, 20, 20);
    // var mesh4 = new THREE.Mesh(geometry4, material);
    // mesh4.position.z = -1000;
    // mesh4.position.x = -8;
    // mesh4.position.y = 100;
    // scene.add(mesh4);



    //attribute
    var vertexDisplacement = new Float32Array(geometry.attributes.position.count);

    for (var i = 0; i < vertexDisplacement.length; i ++) {
        vertexDisplacement[i] = Math.sin(i);
    }

    geometry.addAttribute('vertexDisplacement', new THREE.BufferAttribute(vertexDisplacement, 1));


    //RENDER LOOP
    render();


    var delta = 0;
    function render() {

        //update delta over time
        delta += 0.1;

        //uniform
        mesh.material.uniforms.delta.value = 0.5 + Math.sin(delta) * 0.5;

        //attribute
        for (var i = 0; i < vertexDisplacement.length; i ++) {
            vertexDisplacement[i] = 0.5 + Math.sin(i + delta) * 0.25;
        }
        mesh.geometry.attributes.vertexDisplacement.needsUpdate = true;


    	renderer.render(scene, camera);

    	requestAnimationFrame(render);
    }
