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
    },1000)

})

Myo.on('fist', function(){  
   console.log('Fist!');
   this.vibrate();
})

var rawEmgData = {
    sense1: 0,
    sense1: 0,
    sense1: 0,
    sense1: 0,
    sense1: 0,
    sense1: 0,
    sense1: 0,
    sense1: 0  
};

Myo.on('emg', function(data){
    rawEmgData = data;
})

Myo.connect();

var processEmgData = function(emgData) {
    //console.log(emgData);
    //var jsonEmg = JSON.stringify(rawEmgData);
    jsonEmg = {"var1": "1"};
    console.log(JSON.stringify(jsonEmg));
    //console.log(jsonEmg);
    
    request.post(
        'http://localhost:3000/receive',
        jsonEmg,
        function (error,response,body){
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
    );
}