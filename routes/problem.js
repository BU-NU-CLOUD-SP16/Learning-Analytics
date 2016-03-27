module.exports = function(app, databaseConn) {

    // Return all info about all problems
    app.get('/problem', function(req, res) {
      var problem_id = req.params.problem_id;
      databaseConn.query('SELECT title, id FROM problem ORDER BY created_at DESC LIMIT 10;', function (err, problems){
        if(err) {
          console.log(err);
          res.status(500).send({status:500, message: 'internal error', type:'internal'});
        } else {
        console.log('Data received from DB');
        res.send(problems);
      }
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
    /*app.get('/problem/:problem_id/:modifier', function(req, res) {
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
    });*/


}; 
