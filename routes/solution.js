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

app.get('/student/metric/bins', function (req, res) {
  	databaseConn.query('SELECT player_id, metric FROM solution;', function (err, rows){
		if(err) {
          	console.log(err);
          	res.status(500).send({status:500, message: 'internal error', type:'internal'});
        } else {
        	console.log('Data received from DB');
        	var data = parseBinData(rows)
			res.send(data);
		}
	});
});

app.get('/student/metrics/:id', function (req, res) {
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
	var values = [{"x": '', "y": 0},];
	var name = "barData";
	
	for (i = 0; i < reqObject.length; i++){
		values[i] = {"x": reqObject[i].player_id, "y": reqObject[i].metric};
	}

	var meta = [{"count": i, "bins": null}]

	return buildBarDataObject(values, meta, name);
};

function parseBinData (reqObject){
	var bins = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	var values = [{"x": '', "y": 0}];
	var temp = 0;
	var name = "binData";
	
	for (i = 0; i < reqObject.length; i++){
		temp = Math.floor(reqObject[i].metric/10);
		bins[temp] += 1;
	}

	for (j = 0; j < bins.length; j++){
		values[j] = {"x": j*10, "y": bins[j]};
	}

	var meta = [{"count": i, "bins": j}]

	return buildBarDataObject(values, meta, name);
}

function buildBarDataObject (values, metadata, name){
	var barData = [{
	"meta": metadata,
  	"name": name,
  	"values": values,
	}];
  return barData;
};




