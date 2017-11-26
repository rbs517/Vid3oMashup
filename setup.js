//Requesting the arduino (input) data received from the serial port 
// var mydata = 0;
// var oReq = new XMLHttpRequest();
// var requestEveryXloops = 10 ;
// var loopCount = 0;

var connection = new WebSocket('ws://127.0.0.1:1025');
var control1;
var control2;
var control3;
var control4;

connection.onopen = function () {
    // connection is opened and ready to use
    console.log("connected");
};

connection.onerror = function (error) {
    // an error occurred when sending/receiving data
    console.log("error", error);
};

connection.onmessage = function (message) {
    // try to decode json (I assume that each message
    // from server is json)
    // console.log(message.data);
    // handle incoming message
    var resultString = message.data;
    // split it:
    var splitString = resultString.split(",");
    // console.log(splitString);
    control1 = splitString[0];
    control2 = splitString[1];
    control3 = splitString[2];
    control4 = splitString[3];
    knobSerialData1(control1);
    pushButtonData1(control2);
    knobSerialData2(control3);
    pushButtonData2(control4);
};

// oReq.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         // document.getElementById("demo").innerHTML = this.responseText;
//         var inDataRaw=this.responseText;
//         var inDataJSON = JSON.parse(inDataRaw);
//         mydata = inDataJSON.value;
//     }
// };

// //Requesting the data repeatedly--looping the data
// function loop (){
//   console.log("inside loop");
// for (i = 0; i < mydata.length; i++) { 
//   if(loopCount >= requestEveryXloops){
//           oReq.open("GET", "http://localhost:8080/serial");
//           oReq.send();
//           loopCount = 0;
//         }
//         loopCount++;
//         // showData();
//         // knobSerialData(mydata);
//   }


//gif slideshow from W3 Schools
var slideIndex = 1;
showSlides(slideIndex);

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
      for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
}


//song slideshow from W3 Schools
var songslideIndex = 1;
showsongSlides(songslideIndex);

function currentsongSlide(n) {
  showsongSlides(songslideIndex = n);
}

function showsongSlides(n) {
  var i;
  var songs = document.getElementsByClassName("mySongs");
  var dots = document.getElementsByClassName("dot");
    if (n > songs.length) {songslideIndex = 1}
    if (n < 1) {songslideIndex = songs.length}
      for (i = 0; i < songs.length; i++) {
      songs[i].style.display = "none"; 
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
  songs[songslideIndex-1].style.display = "block"; 
  dots[songslideIndex-1].className += " active";
}


function goToPage2() {
  document.getElementById("page-1").style.display = 'none'; //hide background page1
  document.getElementById("page-2").style.display = 'block'; //show song page2
}

function goToPage3(){
  document.getElementById("page-2").style.display = 'none'; //hide song page2
  document.getElementById("page-3").style.display = 'block'; //show game page3
  // init();
  //Start the recording
  // capturer.start();
  threeinit();
  threerender();
  threeanimate();
 
}

//Step 1: Choose a background
function knobSerialData1(evt){
  // console.log(evt);
  if (evt<341){
    currentSlide(1);  // flip to background 1
  } 
 
  if (evt>341 && evt<682){
    currentSlide(2);  // flip to background 2
  } 

  if (evt>682){
    currentSlide(3);  // flip to background 3
    
  }

 
 //  if (evt ==1){
 //    currentSlide(2);  // flip to background 2
 //  } 
 // else if (evt ==0){
 //    currentSlide(1);
 // }
}

//Step 1 complete
function pushButtonData1(data){
  if (data == 1){
    goToPage2();
  }
}
// target.addEventListener(type, function fn(event) {
//         target.removeEventListener(type, fn);
//         listener(event);
//     });
// }

// addEventListenerOnce(document.getElementById("myelement"), "click", function (event) {
//     alert("You'll only see this once!");
// });



//Step 2: Choose a song
function knobSerialData2(data){
  // console.log(evt);
  if (data<341){
    currentsongSlide(1);  // flip to background 1
  } 
 
  if (data>341 && data<682){
    currentsongSlide(2);  // flip to background 2
  } 

  if (data>682){
    currentsongSlide(3);  // flip to background 3
    
  } 
}


// Step 2 complete
function pushButtonData2(data){
  if (data == 1){
    console.log("going to page 3");
    goToPage3();
  }
}


// $('data == 1').one('click', function(e) {
//     alert('You will only see this once.');
// });

// Create a capturer that exports a WebM video
var capturer = new CCapture( { 
  format: 'webm', 
  setInterval: 50000
} );


//Stop recording
// capturer.stop();

// default save, will download automatically a file called {name}.extension (webm/gif/tar)
// capturer.save();

// custom save, will get a blob in the callback
// capturer.save( function( blob ) { /* ... */ } );

function sendtoinsta(){

}


// function initBackground(){
//   if (currentSlide(1)){
//     //call the display background 1 function for page 3
//   }
// }
