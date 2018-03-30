// serial port initialization:
// include the serialport library
var SerialPort = require('serialport'); 
var portName =  '/dev/cu.usbmodem1411'; 

// include the express library
var express = require('express'); 
var http = require('http');

// create a server using express
var app = express();                                          

// serve static files from /public                    
app.use('/',express.static('files')); 
// start the server
var server = http.createServer(app);

var latestData = 0;

// make an instance of the Readline parser
var Readline = SerialPort.parsers.Readline;   
// open the port
var myPort = new SerialPort(portName, 9600);                        
// make a new parser to read ASCII lines
var parser = new Readline(); 
// pipe the serial stream to the parser
myPort.pipe(parser);               

// called when the serial port opens
myPort.on('open', openPort); 
// called when the serial port closes                   
myPort.on('close', closePort);   
// called when there's an error with the serial port     
myPort.on('error', serialError);  
 // called when there's new data incoming      
parser.on('data', listen);                             


function openPort() {
        console.log('port open');
        setTimeout(function(){
       		myPort.write("x");
        }, 2000);
}

function closePort() {
        console.log('port closed');
}

function serialError(error) {
        console.log('there was an error with the serial port: ' + error);
        myPort.close();
}

function listen(data) {
        latestData = data;
        console.log("Got data" + data);
        if(currentClinet != null){
          try {
            currentClinet.send(latestData);
          } catch (e) {
            console.log("error sending");
            currentClinet = null;
          }
        } else {
          console.log("currentclient is null");
        }
        myPort.write("x");
}

function getLatestSerial(request, response) {
	  console.log("getLatestSerial");
    console.log(request.connection.remoteAddress);
    // response.end(latestData);
    response.send(JSON.stringify({ value: latestData }));
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/serial', getLatestSerial);


//-----Socket-----//
/*get data from socket server, and pass it to the main visual app later*/

var WebSocketServer = require('ws').Server;
//Following that, you need to use new() to make a new instance of the webSocket servver, and then configure a few parameters, and finally start the server:

// port number for the webSocket server
var SERVER_PORT = 8000;               
var wss = new WebSocketServer({server},function(){
  console.log("done");
}); 

//var connections = new Array();
// list of connections to the server
var connections = [];         
var currentClinet = null;

wss.on('connection', handleConnection);
wss.on('disconnect', function(dc) {
  console.log(dc + " disconnected");
});

function handleConnection(client) {
 // you have a new client
 console.log("New Connection");
 // add this client to the connections array 
 connections.push(client);
 // when a client sends a message, call sendToSerial function
 client.on('message', sendToSerial); 
 //client.send("hello world!");
 currentClinet = client;
}

//send to serial port
function sendToSerial(data) {
 console.log("sending to serial: " + data);
 myPort.write(data);
}

// start express
server.listen(SERVER_PORT, function listening() {
  console.log('Listening on ' + SERVER_PORT);
});