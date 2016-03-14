module.exports = function(app, databaseConn){
app.get('/api', function (req, res) {
	databaseConn.query('SELECT problem_id, COUNT(*) FROM solution GROUP BY problem_id', function (err, rows){
		if(err) {
          	console.log(err);
         	res.status(500).send({status:500, message: 'internal error', type:'internal'});
    	} else {
    		console.log('Data received from DB');
    		data = apiRoot(rows);
    		res.send(data);
		}
    });

});
}

function apiRoot(queryObject) {
	
	var metadata = [{"title": "Learning Analytics"}, 
					{"version": 0.1}, 
					{"license": "GNU License"}];
	var problems = queryObject;
	var api_structure = [{"/problem/:problem_id OR :title": "return information about the problem"},
					    {"/problem/:metric": "search by graph type and metric"},
						{"/problem/student/:student_id": "returns info about a student"}, 
						{"/student/:student_id": "return student info"},
						{"/student/:student_id/assignments": "list of assignments submitted"},
						{"/student/:student_id/:metric": "metrics for that specific student"},];


	var apiData = [{
	"meta": metadata,
  	"problems": problems,
  	"api_structure": api_structure,
	}];

  return apiData;
}