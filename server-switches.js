/**
 Node.js webserver. Handles communication to the client
 and GPIO configuration and access.
 
 This app is a demo example of how to use Node.js to access remotely
 the module Colibri VF61 and use its GPIO.
 */

/* Modules */
var fs = require('fs'); //module to handle the file system
var express = require('express'); //webserver module
var bodyParser = require('body-parser');
var app = express();
var debug = require('debug')('myserver');

/* VF61 GPIO pins */
/*var	LED1 = '47' // PTC2, 101(SODIMM), 16(IRIS)
var	LED2 = '50' // PTC5, 97(SODIMM), 17(IRIS)
var	LED3 = '53' // PTC8, 85(SODIMM), 18(IRIS)
var	SW1 = '46' // PTC1, 98(SODIMM), 13(IRIS)
var	SW2 = '88' // PTC9, 133(SODIMM), 14(IRIS)
var	SW3 = '48' // PTC3, 103(SODIMM), 15(IRIS)*/
var GPIO = {LED1:'47',	LED2:'50',	LED3:'53',
			SW1:'46',	SW2:'88',	SW3:'48'};
/* Constants */
var HIGH = 1, LOW = 0, IP_ADDR = '192.168.0.180', PORT_ADDR = 3000;
	
//starting app
debug('Starting VF61 webserver and GPIO control'); //hello message

//Using Express to create a server
app.use(bodyParser.urlencoded({ //to support URL-encoded bodies, must come before routing
	extended: true
}));

app.use(express.static(__dirname)); //add the directory where HTML and CSS files are
app.route('/gpio') //used to unite all the requst types for the same route
.post(function (req, res) { //handles incoming POST requests
        var serverResponse = {};
        debug(serverResponse);
        //var command = req.body.command, pin = req.body.btn, val = req.body.val;
        if(req.body.id == 'getGPIO'){ //if client requests GPIO status
        	for(io in GPIO){ //iterate through all GPIO
        		serverResponse[io] = +rdGPIO(GPIO[io]); //and get its current status as a string
        	}
        }
        else{ //otherwise change GPIO status
        	serverResponse.btn = req.body.id; //echo which button was pressed
        	serverResponse.val = req.body.val;
	        if(serverResponse.val == 'on'){ //if button is clicked, turn on the leds
	        	wrGPIO(GPIO[serverResponse.btn], HIGH);
	        }
	        else{ //if button is unclicked, turn off the leds
	        	wrGPIO(GPIO[serverResponse.btn], LOW);
	        }
        }
        res.send(serverResponse); //echo the recieved data to the client
});

var server = app.listen(PORT_ADDR, IP_ADDR, function () {//listen at the port and address
    var host = server.address().address;
    var port = server.address().port;
    var family = server.address().family;
    debug('Express server listening at http://%s:%s %s', host, port, family);
});

//call cfGPIO to configure pins
cfGPIO(GPIO.LED1, 'out');
cfGPIO(GPIO.LED2, 'out');
cfGPIO(GPIO.LED3, 'out');
cfGPIO(GPIO.SW1, 'in');
cfGPIO(GPIO.SW2, 'in');
cfGPIO(GPIO.SW3, 'in');

function cfGPIO(pin, direction){
/*---------- export pin if not exported and configure the pin direction -----------*/
        fs.access('/sys/class/gpio/gpio' + pin, fs.F_OK, function(err){//
                if(err){ //if GPIO isn't exported, do it
                        debug('exporting GPIO' + pin);
                        fs.writeFileSync('/sys/class/gpio/export', pin);//export pin
                }
                debug('configuring GPIO' + pin + ' as ' + direction);
                fs.writeFileSync('/sys/class/gpio/gpio' + pin + '/direction', direction);
        });
}

function rdGPIO(pin){
/*---------- read GPIO value and return it -----------*/
	var value = fs.readFileSync('/sys/class/gpio/gpio' + pin + '/value');
	debug('reading ' + value + ' from ' + pin);
	return value;
}

function wrGPIO(pin, value){
/*---------- write value to corresponding GPIO -----------*/
	debug('writing ' + value + ' to pin ' + pin);
	fs.writeFileSync('/sys/class/gpio/gpio' + pin + '/value', value);
}
