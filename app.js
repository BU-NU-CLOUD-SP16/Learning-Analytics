var express = require('express');
var app = express();
var mysql = require("mysql");
var rd3 = require('react-d3');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var COMMENTS_FILE = path.join(__dirname, 'assignments.json');


// Connect to DB
var databaseConn = mysql.createConnection({
	host: "localhost",
    	user: "root",
    	password: "",
	database: "demo1",
});

databaseConn.connect(function (err){
	if (err){
		console.log('Error connecting to DB');
		return;
	}
	console.log('Connection Established');
});


app.use('/', express.static(path.join(__dirname, 'public')));
//app.use('/node_modules/bootstrap', express.static(path.join(__dirname, 'dist') ));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/dbtest', function (req, res) {
  	databaseConn.query('SELECT * FROM solution', function (err, rows){
		if(err) throw err;
		console.log('Data received from the DB');

		// Dump DB - All Solutions
		res.send(rows);
	});
});


app.get('/assignments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });

});

// Return all info about problem based on id
app.get('/problem/:problem_id', function(req, res) {
	var problem_id = req.params.problem_id;
	databaseConn.query('SELECT * FROM problem WHERE id = ' + problem_id, function (err, problem_title){
		if(err) throw err;
		console.log('Data received from DB');
		res.send(problem_title);
	});
});

// Return specific information related to the probelm
app.get('/problem/:problem_id/:modifier', function(req, res) {
	var problem_id = req.params.problem_id;
	var modifier = req.params.modifier;

	// Query DB
	databaseConn.query('SELECT ' + modifier + ' FROM problem WHERE id = ' + problem_id, function (err, problem_specific_info){
		if(err) throw err;
		console.log('Data received from DB');
		res.send(problem_specific_info);
	});
});

/*
app.post('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newComment = {
      id: Date.now(),
      author: req.body.author,
      text: req.body.text,
    };
    comments.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(comments);
    });
  });
});*/



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

//databaseConn.end(function (err){
//});
