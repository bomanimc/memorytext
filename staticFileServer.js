var express = require('express');
var request = require('request');
var http = require('http');
var path = require('path');
var engines = require('consolidate');
var app = express();

//Twilio-related variables
var twilioNum = "+16159002993";
var accountSid = 'ACf1417db97ad6a449d3935f4ee970d1d4';
var authToken = '353071a7cf8319b57b239417929acd0e'; 
var client = require('twilio')(accountSid, authToken);

app.set('port', 8080);
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public');
app.engine('html', engines.mustache);
app.set('view engine', 'html');


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

app.get('/', function(req, res) {res.render('index.html')});
app.get('/form', function(req, res) {res.render('form.html')});

app.get('/text', function (req, res){
	console.log("API endpoint reached.");
	console.log(req);
	//sendSMS();
	res.send('Sent an imaginary text!');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



