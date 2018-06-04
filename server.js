const PORT = 1234;
const URL = "http://localhost:"+PORT;

var express = require('express');
var open = require('open');
var app = express();
app.use(express.static(__dirname));

app.configure(function()
{
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});

app.listen(1234);
console.log(">> "+URL+" <<");
open(URL);