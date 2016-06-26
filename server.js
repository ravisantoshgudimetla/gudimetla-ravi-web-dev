var express = require('express');
var app = express();
var request = require('request');
var SESSION_SECRET="test";
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
app.use(cookieParser('test'));
app.use(session({secret: SESSION_SECRET }));
// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
//var assignment = require('./assignment/app.js');
//assignment(app);

var project = require('./project/app.js');
project(app);


require ("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ipaddress);