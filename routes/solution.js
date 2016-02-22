module.exports = function(app, databaseConn){

app.get('/student/metric', function (req, res) {
  	databaseConn.query('SELECT player_id, metric FROM solution;', function (err, rows){
		if(err) {
          	console.log(err);
          	res.status(500).send({status:500, message: 'internal error', type:'internal'});
        } else {
        	console.log('Data received from DB');
        	var data = parseBarData(rows)
			res.send(data);
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
}

function parseBarData (reqObject){

	var bins = 5;
	var values = [{"x": '', "y": 0},];
	for (i = 0; i < reqObject.length; i++){
		values[i] = {"x": reqObject[i].player_id, "y": reqObject[i].metric};
	}

	return buildBarDataObject(values);
};

function buildBarDataObject (values){
	var barData = [{
  	"name": "barData",
  	"values": values,
	}];
  return barData;
};




