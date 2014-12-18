var express = require('express');
var request = require('request');
var http = require('http');
var path = require('path');
var engines = require('consolidate');
var schedule = require('node-schedule');
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


var sendSMS = function(numVal, bodyVal) {
	console.log("Sending Message to " + numVal);

	client.messages.create({
	    body: bodyVal,
	    to: numVal,
	    from: twilioNum,
	}, function(err, message) {
	    //process.stdout.write(message.sid);
	});
};

var scheduleSMS = function(year, month, day, hour, minute, sec, numVal, bodyVal) {

	var date = new Date(year, month, day, hour, minute, sec);

	var smsJob = schedule.scheduleJob(date, function(){
		sendSMS(numVal, bodyVal);
	    console.log('Sent the scheduled text.');
	});
}


app.get('/', function(req, res) {res.render('index.html')});
app.get('/form', function(req, res) {res.render('form.html')});

app.get('/text', function (req, res){
	console.log("API endpoint reached.");
	var numVal = req.query.to;
	var bodyVal = req.query.bodyText;
	var monthVal = parseInt(req.query.month);
	var dayVal = parseInt(req.query.day);
	var yearVal = parseInt(req.query.year);
	var hourVal = parseInt(req.query.hour);
	var minuteVal = parseInt(req.query.minute);
	var ampmVal = req.query.ampm;
	var secVal = 0;

	monthVal = monthVal - 1; //Zero-Indexed Months
	if(ampmVal == "PM")
	{
		hourVal = hourVal + 12;
	}

	console.log(numVal);
	console.log(bodyVal);
	console.log(monthVal);
	console.log(dayVal);
	console.log(yearVal);
	console.log(hourVal);
	console.log(minuteVal);
	console.log(ampmVal);
	
	scheduleSMS(yearVal, monthVal, dayVal, hourVal, minuteVal, secVal, numVal, bodyVal);
	res.send('Scheduled an imaginary text!');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



