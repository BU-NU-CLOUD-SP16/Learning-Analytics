var express = require('express');
var app = express();
var mysql = require("mysql");


// Connect to DB
var databaseConn = mysql.createConnection({
	host: "localhost",
    	user: "root",
    	password: "",
	database: "test",
});

databaseConn.connect(function (err){
	if (err){
		console.log('Error connecting to DB');
		return;
	}
	console.log('Connection Established');
});

app.get('/', function (req, res) {
  	databaseConn.query('SELECT * FROM solution', function (err, rows){
		if(err) throw err;
		console.log('Data received from the DB');

		// Dump DB - All Solutions
		res.send(rows);
	});
});

app.get('/problem/:problem_id', function(req, res) {
	var problem_id = req.params.problem_id;
	databaseConn.query('SELECT * FROM problem WHERE id = ' + problem_id, function (err, problem_title){
		if(err) throw err;
		console.log('Data received from DB');
		res.send(problem_title);
	});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

//databaseConn.end(function (err){
//});
