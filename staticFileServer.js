var express = require('express');
//require("/usr/local/lib/node_modules/twilio/twilio-node/lib");
var app = express();

app.use(express.static(__dirname + '/public'));
app.listen(8080);
console.log("Server running on port 8080.")

/* //-----Twilio Code
// Download the Node helper library from twilio.com/docs/node/install
// These vars are your accountSid and authToken from twilio.com/user/account
var accountSid = 'ACf1417db97ad6a449d3935f4ee970d1d4';
var authToken = '353071a7cf8319b57b239417929acd0e'; 
var client = require('twilio')(accountSid, authToken);
 
client.messages.create({
    body: "Test Message from Bomani",
    to: "+16155691920",
    from: "+16159002993",
}, function(err, message) {
    process.stdout.write(message.sid);
});
*