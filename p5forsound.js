// let myVideo;

var amp;


function preload() {
  soundFormats('mp3', 'ogg');
  sound1 = loadSound('sound/nomanssky.mp3');
  sound2 = loadSound('sound/forze_1.mp3');
  sound3 = loadSound('sound/mrrobot2.mp3');
  sound4 = loadSound('sound/ni_1-3.mp3');

}


function playSound(control3) {
  if (data3<255){
    sound1.play();

  }else {
    sound1.stop();
  }
}



// function playSound(slideSong) {
//   // if (slideSong == 1){
//   //   mySound1.play();
  
//   // }else {
//   //   mySound1.stop();
//   // }

//   if (slideSong == 2){
//     mySound2.play();

//   }else {
//     mySound2.stop();
//   }

//   if (slideSong == 3){
//     mySound3.play();
    
//   }else {
//     mySound3.stop();
//   }
  
//   if (slideSong == 4){
//     mySound4.play();
    
//   }else {
//     mySound4.stop();
//   }
// }

function setup() {
  noCanvas();
  // mySound1.setVolume(0.1);
  // mySound1.play();
  // console.log('p5 estup');
  

  // mySound.loop();
  
  // create a new Amplitude analyzer
  amp = new p5.Amplitude();

  // Patch the input to an volume analyzer
  // amp.setInput(mySound1);
  // myVideo = createVideo("assets/fingers.mov");

}


function draw() { 
  // rms = amp.getLevel();
  // init(rms);
  // console.log(rms *1000);
}


