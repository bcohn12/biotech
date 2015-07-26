//'use strict';

var request = require('request');
var Myo = require('myo');

Myo.onError = function () {  
        console.log("Woah, couldn't connect to Myo Connect");
}

Myo.on('connected',function(){
    console.log('Connected!');
    this.streamEMG(true);
    setInterval(function(){
        processEmgData(rawEmgData);
    },2000)

})

Myo.on('fist', function(){  
   console.log('Fist!');
   this.vibrate();
})

var rawEmgData = [0,0,0,0,0,0,0,0];
/*var rawEmgData = {
    sense1: 0,
    sense1: 0,
    sense1: 0,
    sense1: 0,
    sense1: 0,
    sense1: 0,
    sense1: 0,
    sense1: 0  
};*/

Myo.on('emg', function(data){
    rawEmgData = data;
})

Myo.connect();

var processEmgData = function(emgData) {
    //console.log(emgData);
    //var jsonEmg = JSON.stringify(rawEmgData);
    var TheTerminalCommand = 'python my_script.py ' + String(emgData).replace(/,/g , " ");
    // console.log(TheTerminalCommand)
    console.log(".")
    
    var sys = require('sys')
    var exec = require('child_process').exec;
    var child;
    child = exec(TheTerminalCommand, function (error, stdout, stderr) {
    // sys.print('stdout: ' + stdout);
    // sys.print('stderr: ' + stderr);
    if (error !== null) {
     console.log('exec error: ' + error);
  } 
});
    
}
