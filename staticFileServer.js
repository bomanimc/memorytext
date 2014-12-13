var express = require('express');
//require("/usr/local/lib/node_modules/twilio/twilio-node/lib");
var app = express();

app.use(express.static(__dirname + '/public'));
app.listen(8080);