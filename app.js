const HttpListener = require('./Listeners/HttpListener');
require('dotenv').config()
var express = require("express");
var app = express();
var port = process.env.PORT || 9001;
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

new HttpListener(app, port);

