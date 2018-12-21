const HttpListener = require('./Listeners/HttpListener');
require('dotenv').config()
var express = require("express");
var app = express();
var port = process.env.PORT || 9001;
var bodyParser = require('body-parser');
var Slack = require('./Wrapper/Slack');
this.choiceList = [];

var slack = new Slack();

slack.getUserList().then((result) => {
    new HttpListener(app, port, this.choiceList, result);
}).catch((error) => {
    console.log('An error happened');
    console.log(error);
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



