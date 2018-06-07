var ip = require("ip");
var express = require('express');
var app = express();
var open = require('open');

const ADDR = ip.address();
const PORT = 1234;
const URL = "http://"+ADDR+":"+PORT;

app.use(express.static(__dirname));

app.configure(function()
{
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
});

app.listen(PORT);
console.log(">> "+URL+" <<");
open(URL);