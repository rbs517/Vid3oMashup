
//SCENE 0 - intro
var introVideo, introTexture;
var rotation = 0;

function scene0 () {
  var index = 0;

  // establishing the scene 1 video background
  introVideo = document.getElementById( 'imovievideo' );
  introTexture = new THREE.VideoTexture( introVideo );
  introTexture.minFilter = THREE.LinearFilter;
  introTexture.magFilter = THREE.LinearFilter;
  introTexture.format = THREE.RGBFormat;
  scene[index].background = introTexture;

  threeCamera.lookAt(scene[index].position);

  fontLoader.load('files/typeface.js', function (res) {
    font = res;

    textGeo = new THREE.TextGeometry( '  ' + 'viD3o' + '\n'  + 'mashup', {
      font: font,
      size: size,
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
    textMat = new THREE.MeshNormalMaterial();
    title = new THREE.Mesh(textGeo, textMat);
    title.position.x = -textGeo.boundingBox.max.x/1.6;
    scene[index].add(title);
    // console.log(scene[index]);
  });

}