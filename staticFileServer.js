var express = require('express');
var request = require('request');
//var bodyParser = require('bodyParser');
//Twilio-related variables
var twilioNum = "+16159002993";
var accountSid = 'ACf1417db97ad6a449d3935f4ee970d1d4';
var authToken = '353071a7cf8319b57b239417929acd0e'; 
var client = require('twilio')(accountSid, authToken);

var sendSMS = function() {
	console.log("Sending Message to Bomani");

	client.messages.create({
	    body: "Test Message from Bomani",
	    to: "+16155691920",
	    from: twilioNum,
	}, function(err, message) {
	    process.stdout.write(message.sid);
	});
};

//require("/usr/local/lib/node_modules/twilio/twilio-node/lib");
var app = express();

/*
app.post('/text', express.bodyParser(), function (req, res) {
  //req.body is your array of objects now:

});
*/

app.use(express.static(__dirname + '/public'));
app.listen(8080);
console.log("Server running on port 8080.");
//sendSMS();

