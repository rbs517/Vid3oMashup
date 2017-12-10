//SCENE 2 -choose song
var playGeo, playButton;
var slideSong = []; 
var slidesSongMat = [];
var slideSongCanvasGeo;


function scene2(){
    var index = 2;
//text
  threeCamera.lookAt(scene[index].position);

  fontLoader.load('files/typeface.js', function (res) {
    font = res;

    textGeo = new THREE.TextGeometry( 'Choose your Sound', {
      font: font,
      size: 18,
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
    title = new THREE.Mesh(textGeo, textMat);
    title.position.x = -textGeo.boundingBox.max.x/1.8;
    title.position.y = 70;
    scene[index].add(title);
  });


    // sound1= document.getElementById( 'sound1' );
    // sound2= document.getElementById( 'sound2' );
    // sound3= document.getElementById( 'sound3' );
    // sound4= document.getElementById( 'sound4' );
 // sound1.play();
  //   var cubeScene = false;
  //   if (cubeScene) {
  //     sound1 = document.getElementById( 'sound1' );
  //     sound1.play();
  //     console.log("we're in the cubes man");
  // }
 
      // scene[index].add(sound1);


//create the canvas for each image ofthe slideshow
  slideSongCanvasGeo = new THREE.BoxGeometry(40, 40, 40);

// image materials- load images as texture

  //slide 1
  slidesSongMat[1] = new THREE.MeshBasicMaterial({
    map: imageLoader.load("images/sound1" + ".png"),
    // side: THREE.DoubleSide,
    // transparent: true,
  });

  //slide 2
  slidesSongMat[2] = new THREE.MeshBasicMaterial({
    map: imageLoader.load("images/sound2" + ".png"),
    // side: THREE.DoubleSide,
    // transparent: true,
  });

  //slide 3
  slidesSongMat[3] = new THREE.MeshBasicMaterial({
    map: imageLoader.load("images/sound3" + ".png"),
    // side: THREE.DoubleSide,
    // transparent: true,
  });

  //slide 4
  slidesSongMat[4] = new THREE.MeshBasicMaterial({
    map: imageLoader.load("images/sound4" + ".png"),
    // side: THREE.DoubleSide,
    // transparent: true,
  });

  slideSong[1] = new THREE.Mesh(slideSongCanvasGeo, slidesSongMat[1]);
  slideSong[1].position.set(posX + 5, posY, posZ);

  slideSong[2] = new THREE.Mesh(slideSongCanvasGeo, slidesSongMat[2]);
  slideSong[2].position.set(posX + 120, posY, posZ);

  slideSong[3] = new THREE.Mesh(slideSongCanvasGeo, slidesSongMat[3]);
  slideSong[3].position.set(posX + 200, posY, posZ);

  slideSong[4] = new THREE.Mesh(slideSongCanvasGeo, slidesSongMat[4]);
  slideSong[4].position.set(posX + 280, posY, posZ);

  scene[index].add(slideSong[1]);
  scene[index].add(slideSong[2]);
  scene[index].add(slideSong[3]);
  scene[index].add(slideSong[4]);


// play text
  threeCamera.lookAt(scene[index].position);

  fontLoader.load('files/typeface.js', function (res) {
    font = res;

    playGeo = new THREE.TextGeometry( 'Play', {
      font: font,
      size: 16,
      height: height,
      curveSegments:curveSegments,
      weight: "normal",
      bevelThickness:bevelThickness,
      bevelSize:bevelSize,
      bevelSegments:bevelSegments,
      bevelEnabled:bevelEnabled
    });
    playGeo.computeBoundingBox();
    playGeo.computeVertexNormals();
    playButton = new THREE.Mesh(playGeo, textMat);
    playButton.position.x = -playGeo.boundingBox.max.x/1.8;
    playButton.position.y = -90;
    scene[index].add(playButton);
  });





}