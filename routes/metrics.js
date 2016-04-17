function countToBarChart(lineArray){
    lineArray.sort(function(a, b){
        return a -b;
    });
    var maximum = lineArray[lineArray.length - 1];

    // Do the histogram in increments of 50
    var upperBound = (Math.floor(maximum / 50) + 1)*50;
    var lowerBound = 0;

    var binWidth = 10;
    var numOfBins = (upperBound - lowerBound) / binWidth;

    var histogram = Array.apply(null, Array(numOfBins))
                         .map(Number.prototype.valueOf, 0);

    var binIndex = 0;
    for(var i = 0; i < lineArray.length; i++){
        // Check to see if the code length is too big for the bin
        while(lineArray[i] >= (binIndex + 1)*binWidth) binIndex += 1;
        histogram[binIndex] += 1;
    }

    // Create associative array to send back
    var barData = [];
    for(binIndex = 0; binIndex < numOfBins; binIndex++){
        var lowerLabel = binWidth * binIndex;
        var upperLabel = lowerLabel + (binWidth - 1);
        var label = lowerLabel.toString() + "-" + upperLabel.toString();
        barData.push({"x": label, "y": histogram[binIndex]});
    }
    return barData;
}

function submissionToBarChart(submissionArray){
    var correctPercent = submissionArray[0].percent_correct;
    var incorrectPercent = 100 - correctPercent;

    var submissionData = [
        {"label": 'correct', "value": (correctPercent).toString()},
        {"label": 'incorrect', "value": (incorrectPercent).toFixed(2)},
        ];

    return submissionData;
}

function firstCorrect(solutionArray){

    var flag = 0;
    var attempts = 0;
    var first_correct = 0;

    for (attempts = 0; attempts < solutionArray.length; attempts++){
        if (solutionArray[attempts].correct == 1){
            flag = 1;
            break;
        }
    }

    if(flag)
        first_correct = attempts + 1;
    else
        first_correct = -1;

    var response = {
        "attempts until correct": first_correct
    };

    return response;
}


module.exports = function(app, databaseConn){
    
    app.get('/problem/:problem_id/metrics/:metric', function(req, res) {
        
        if(req.params.metric == "linecount"){
            databaseConn.query('SELECT linecount FROM solution_metrics WHERE problem=' + req.params.problem_id, //WHERE problem_id = ' + req.params.problem_id,
                function (err, rows){
                if(err) {
                    console.log(err);
                    res.status(500).send({
                        status:500,
                        message: 'internal error',
                        type: 'internal'
                    });
                } else {
                    var linecounts = new Array(rows.length);
                    for(var i = 0; i < rows.length; i++){
                        linecounts[i] = rows[i].linecount;
                    }
                    res.send(countToBarChart(linecounts));
                }
            });
        } else if (req.params.metric == "submissions"){
            //databaseConn.query('SELECT player_id, COUNT(correct) FROM solution WHERE correct=1 AND problem_id=' + req.params.problem_id + ' GROUP BY player_id;',
            //databaseConn.query('SELECT COUNT(*) count FROM solution WHERE correct=1 AND problem_id=' + req.params.problem_id + ';',
            //databaseConn.query('SELECT player_id, COUNT(correct) correct FROM solution WHERE problem_id=' + req.params.problem_id + ' GROUP BY player_id;',
            databaseConn.query('SELECT percent_correct FROM problem_metrics WHERE id=' + req.params.problem_id,
                function (err, rows){
                if(err) {
                    console.log(err);
                    res.status(500).send({
                        status:500,
                        message: 'internal error',
                        type: 'internal'
                    });
                } else {
                    res.send(submissionToBarChart(rows));
                }
            });
        } else if (req.params.metric == "size"){
            databaseConn.query('SELECT id AS player_id, size AS metric FROM solution_metrics WHERE problem=' + req.params.problem_id,  
                function (err, rows){
                if(err) {
                    console.log(err);
                    res.status(500).send({
                        status:500,
                        message: 'internal error',
                        type: 'internal'
                    });
                } else {
                    var size = new Array(rows.length);
                    for(var i = 0; i < rows.length; i++){
                        size[i] = rows[i].metric;
                    }
                    res.send(countToBarChart(size));
                }
            });
        } else if (req.params.metric == "first_correct"){
            databaseConn.query('SELECT player_id, first_correct FROM player_assignment_metrics WHERE problem_id=' + req.params.problem_id, function (err, rows) {
                if(err) {
                    console.log(err);
                    res.status(500).send({
                        status:500,
                        message: 'internal error',
                        type: 'internal'
                    });
                } else {
                    res.send(rows)
                }
            }); 
        }
        else res.sendStatus(404);
    });

    app.get('/problem/:problem_id/student/:student_id/metrics/:metric', function(req, res) {

        if (req.params.metric == "first_correct"){
            databaseConn.query('SELECT player_id, first_correct FROM player_assignment_metrics WHERE problem_id=' + req.params.problem_id + ' AND player_id=' + req.params.student_id, function (err, rows) {
                if(err) {
                    console.log(err);
                    res.status(500).send({
                        status:500,
                        message: 'internal error',
                        type: 'internal'
                    });
                } else {
                    res.send(rows)
                }
            });
        } else res.sendStatus(404);
    });
}
