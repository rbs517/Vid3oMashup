
//SCENE 1 -choose bkg

var chngBkgTexture, chngBkgTextGeo;
var rotation = 0;
var imageTitle = ['A', 'B', 'C', 'D'];
var imageTitleGeo = [];
var nextGeo, nextButton;
var imageText;
var posX = -150;
var posY = -5;
var posZ = 1;
var slidesMat = [];
var slide = []; 
var slidesCanvasBorder = [];
var dot = []; 


function scene1(){
  var index = 1;
  //text
  threeCamera.lookAt(scene[index].position);

  fontLoader.load('files/typeface.js', function (res) {
    font = res;

    textGeo = new THREE.TextGeometry( 'Choose your Set', {
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

//     // text under picture
//   threeCamera.lookAt(scene[index].position);

//   fontLoader.load('files/typeface.js', function (res) {
//     font = res;


//     for (var i = 0; i < imageTitle.length; i++){
//       imageTitleGeo = new THREE.TextGeometry( imageTitle[i], {
//         font: font,
//         size: 12,
//         height: height,
//         curveSegments:curveSegments,
//         weight: "normal",
//         bevelThickness:bevelThickness,
//         bevelSize:bevelSize,
//         bevelSegments:bevelSegments,
//         bevelEnabled:bevelEnabled
//       });
//       imageTitleGeo.computeBoundingBox();
//       imageTitleGeo.computeVertexNormals();
// }
// console.log(imageTitleGeo);

//     for (var i = 0; i < imageTitle.length; i++) {
//       imageText[i] = new THREE.Mesh(imageTitleGeo, textMat);
//       imageText[i].position.set(posX + 60*i, posY +20, posZ);
//     }
    
//     scene[index].add(imageText[1]);

//     // imageText.position.x = ;
//     // imageText.position.y = -90;
// });



  //create the canvas for each image ofthe slideshow
  var slideCanvasGeo = new THREE.BoxGeometry(40, 40, 40);
  // for (var i = 1; i < slides; i++) {

  // image materials- load images as texture

  //slide 1
  slidesMat[1] = new THREE.MeshBasicMaterial({
    map: imageLoader.load("images/bkg1" + ".png"),
    // side: THREE.DoubleSide,
    // transparent: true,
  });

  //slide 2
  slidesMat[2] = new THREE.MeshBasicMaterial({
    map: imageLoader.load("images/bkg2" + ".png"),
    // side: THREE.DoubleSide,
    // transparent: true,
  });

  //slide 3
  slidesMat[3] = new THREE.MeshBasicMaterial({
    map: imageLoader.load("images/bkg3" + ".png"),
    // side: THREE.DoubleSide,
    // transparent: true,
  });

  //slide 4
  slidesMat[4] = new THREE.MeshBasicMaterial({
    map: imageLoader.load("images/bkg4" + ".png"),
    // side: THREE.DoubleSide,
    // transparent: true,
  });

  slide[1] = new THREE.Mesh(slideCanvasGeo, slidesMat[1]);
  slide[1].position.set(posX + 5, posY, posZ);

  slide[2] = new THREE.Mesh(slideCanvasGeo, slidesMat[2]);
  slide[2].position.set(posX + 120, posY, posZ);

  slide[3] = new THREE.Mesh(slideCanvasGeo, slidesMat[3]);
  slide[3].position.set(posX + 200, posY, posZ);

  slide[4] = new THREE.Mesh(slideCanvasGeo, slidesMat[4]);
  slide[4].position.set(posX + 280, posY, posZ);

    // slidesCanvasBorder[i] = new THREE.Mesh(slideCanvasBorderGeo, slidesCanvasBorderMat);
    // slidesCanvasBorder[i].position.set(posX, posY, posZ - 80*i);

  
   scene[index].add(slide[1]);
   scene[index].add(slide[2]);
   scene[index].add(slide[3]);
   scene[index].add(slide[4]);

  // scene[index].add(slidesCanvasBorder[1]);
   // position of images


  // next text
  threeCamera.lookAt(scene[index].position);

  fontLoader.load('files/typeface.js', function (res) {
    font = res;

    nextGeo = new THREE.TextGeometry( 'Next', {
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
    nextGeo.computeBoundingBox();
    nextGeo.computeVertexNormals();
    nextButton = new THREE.Mesh(nextGeo, textMat);
    nextButton.position.x = -nextGeo.boundingBox.max.x/1.8;
    nextButton.position.y = -90;
    scene[index].add(nextButton);
  });
// textMat.

}
