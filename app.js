var express = require('express');
var app = express();
var mysql = require("mysql");
var rd3 = require('react-d3');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var COMMENTS_FILE = path.join(__dirname, 'assignments.json');

// Require the route js files
var problemRoute = require('./routes/problem');
var assignmentsRoute = require('./routes/assignments');
var dbtestRoute = require('./routes/dbtest');
var solutionRoute = require('./routes/solution');


// Connect to MySQL Database
var databaseConn = mysql.createConnection({
	host: "52.33.14.62",
    	user: "remote",
    	password: "learninganalytics",
    	database: "demo1",
});

databaseConn.connect(function (err){
  if (err){
    console.log('Error connecting to DB');
    return;
  }
  console.log('Connection Established');
});


// Static hosting for public website
app.use('/', express.static(path.join(__dirname, 'public')));

// Configure app to use body parser, and allow us to get data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set port for app
var port = process.env.port || 3000;

// Register app routes
assignmentsRoute(app, fs, COMMENTS_FILE);
dbtestRoute(app, databaseConn);
problemRoute(app, databaseConn);
solutionRoute(app, databaseConn);

// Listen on port for incoming requests
app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
