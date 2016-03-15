module.exports = function(app, databaseConn){

app.get('/student', function (req, res) {
	console.log('Request for information about students');
	databaseConn.query('SELECT COUNT(*) FROM solution', function (err, rows){
		if(err) {
          		console.log(err);
         		res.status(500).send({status:500, message: 'internal error', type:'internal'});
    	} else {
    		console.log('Data received from DB');
			res.send(rows);
		}
    });
});

app.get('/student/:id', function (req, res) {
	console.log('Request for information about a particular student');
	res.send('It worked');
});

/*app.get('/student/:id/:metric', function (req, res) {
	console.log('Request for metric about a particular student');
    databaseConn.query('SELECT player_id, metric FROM solution WHERE player_id=' + req.par ams.id, function (err, rows){
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
});*/

}

function info(){

}