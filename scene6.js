
//SCENE 6 -bkg4(?)

function scene6(){
  let index = 6;

  // creating the cube geometry scene 1
  var cubeGeo = new THREE.BoxGeometry(5,5,5);
  var cubeMat = new THREE.MeshBasicMaterial({
    color: 0x0099ff,
  });
  var cube = new THREE.Mesh(cubeGeo, cubeMat);
  cube.castShadow = true;
  cube.position.y = 2.5;
  scene[index].add(cube);
}