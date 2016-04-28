module.exports = function(app, databaseConn){

    app.get('/students/metric', function (req, res) {
            databaseConn.query('SELECT player_id, metric FROM solution;', function (err, rows){
                    if(err) {
                    console.log(err);
                    res.status(500).send({status:500, message: 'internal error', type:'internal'});
            } else {
                    console.log('Data received from DB');
                    var data = parseBarData(rows);
                            res.send(data);
                    }
            });
    });

    app.get('/students/metric/bins', function (req, res) {
            databaseConn.query('SELECT player_id, metric FROM solution;', function (err, rows){
                    if(err) {
                    console.log(err);
                    res.status(500).send({status:500, message: 'internal error', type:'internal'});
            } else {
                    console.log('Data received from DB');
                    var data = parseBinData(rows);
                            res.send(data);
                    }
            });
    });

    app.get('/students/metrics/:id', function (req, res) {
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


    app.get('/solutions/fromhistogram/', function (req, res) {
        var lowerBound = req.query.lowerbound;
        var upperBound = req.query.upperbound;
        var problemId = req.query.problemid;
        var field = req.query.field;
        var correct = req.query.correct;
        var metric = req.query.submetric;
        // Metrics: size, linecount
        
        // Match all records based on the metric meeting the bounds, correct
        // ..and problem id. return player_id, metric, time and body
        var query = "SELECT solution.player_id, solution_metrics." + metric +
                    ", solution.created_at, solution.body " +
                    "FROM solution_metrics " +
                    "INNER JOIN solution " +
                    "ON solution_metrics.id=solution.id " +
                    "AND solution_metrics.size >= " + lowerBound +
                    " AND solution_metrics.size <= " + upperBound +
                    " AND solution_metrics.correct = " + correct +
                    " AND solution.problem_id = " + problemId +
                    ";";
        console.log(query);
        databaseConn.query(query, function(err, rows){
            if(err) send500(res, err);
            else
                res.send(rows);
        });

        console.log(lowerBound);
    });
};

function send500(res, err){
    console.error(err);
    res.status(500).send({
        status:500,
        message: "internal error",
        type: "internal"
    });
}

function parseBarData (reqObject){
	var values = [{"x": '', "y": 0},];
	var name = "barData";
	
	for (i = 0; i < reqObject.length; i++){
		values[i] = {"x": reqObject[i].player_id, "y": reqObject[i].metric};
	}

	var meta = [{"count": i, "bins": null}];

	return buildBarDataObject(values, meta, name);
}

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

	var meta = [{"count": i, "bins": j}];

	return buildBarDataObject(values, meta, name);
}

function buildBarDataObject (values, metadata, name){
	var barData = [{
	"meta": metadata,
  	"name": name,
  	"values": values,
	}];
  return barData;
}




