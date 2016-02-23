var express = require('express');
var app = express();
var mysql = require("mysql");
var rd3 = require('react-d3');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
var COMMENTS_FILE = path.join(__dirname, 'assignments.json');

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
//app.use('/node_modules/bootstrap', express.static(path.join(__dirname, 'dist') ));


// Configure app to use body parser, and allow us to get data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Set port for app
var port = process.env.port || 3000;

// Routes for API
var router = express.Router();

router.use(function(req, res, next){
  console.log('Request made.');
  next();  
});

router.get('/', function(err, res, req){
  res.json({message: 'Welcome to our api!'});
});

router.route('/problems')
  .get(function(req, res){
    databaseConn.query('SELECT * FROM problem', function (err, rows){
      if(err) res.send(err);
      console.log('Data received from the DB');

      // Dump DB - All Solutions
      res.json(rows);
    });
  });

router.route('/problems/:problem_id')
  .get( function (req, res){
    databaseConn.query('SELECT * FROM problem WHERE id = ' + req.params.problem_id, function (err, problem_title){
      if(err) {
        console.log(err);
        res.status(500).send({status:500, message: 'internal error', type:'internal'});
      } else {
      console.log('Data received from DB');
      res.send(problem_title);
      }
    });
  });

router.route('/problems/:problem_id/:modifier')
  .get( function (req, res) {
    databaseConn.query('SELECT ' + req.params.modifier + ' FROM problem WHERE id = ' + req.params.problem_id, function (err, problem_specific_info){
      if(err){
        console.log(err);
        res.status(500).send({status:500, message: 'internal error', type:'internal'});
      } else {
      console.log('Data received from DB');
      res.send(problem_specific_info);
      }
    });
  });

// Register app routes
app.use('/api', router);


/*
// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
*/

app.get('/student/metric', function (req, res) {
  	databaseConn.query('SELECT player_id, metric FROM solution;', function (err, rows){
		if(err) {
          		console.log(err);
          		res.status(500).send({status:500, message: 'internal error', type:'internal'});
        	} else {
        		console.log('Data received from DB');
			res.send(rows);
		}
	});
});

app.get('/student/metric/:id', function (req, res) {
        databaseConn.query('SELECT player_id, metric FROM solution WHERE player_id=' + req.params.id, function (err, rows){
		if(err) {
          		console.log(err);
         		res.status(500).send({status:500, message: 'internal error', type:'internal'});
        	} else {
        		console.log('Data received from DB');
                	if(rows.length)
				res.send(rows);
			else
				res.json({message: 'no results for player_id=' + req.params.id });
		}
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
		if(err) {
      console.log(err);
      res.status(500).send({status:500, message: 'internal error', type:'internal'});
    } else {
		console.log('Data received from DB');
		res.send(problem_title);
  }
	});
});

// Return specific information related to the probelm
app.get('/problem/:problem_id/:modifier', function(req, res) {
	var problem_id = req.params.problem_id;
	var modifier = req.params.modifier;

	// Query DB
	databaseConn.query('SELECT ' + modifier + ' FROM problem WHERE id = ' + problem_id, function (err, problem_specific_info){
		if(err){
      console.log(err);
      res.status(500).send({status:500, message: 'internal error', type:'internal'});
    } else {
		console.log('Data received from DB');
		res.send(problem_specific_info);
  }
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
