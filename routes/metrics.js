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
    var correctCount = 0, incorrectCount = 0;
    var correctPercent = 0.0, incorrectPercent = 0.0;

    for (var i = 0; i < submissionArray.length; i++){
        if (submissionArray[i].correct > 0) {
            correctCount++;
        } else {
            incorrectCount++;
        }
    }

    correctPercent = 100 * correctCount/(correctCount+incorrectCount);
    incorrectPercent = 100 - correctPercent;

    var submissionData = [
        {"label": 'correct', "value": (correctPercent).toFixed(2)},
        {"label": 'incorrect', "value": (incorrectPercent).toFixed(2)},
        ];

    return submissionData;
}


module.exports = function(app, databaseConn){
    
    app.get('/problem/:problem_id/metrics/:metric', function(req, res) {
        
        if(req.params.metric == "linecount"){
            databaseConn.query('SELECT linecount FROM solution_metrics;', //WHERE problem_id = ' + req.params.problem_id,
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
            databaseConn.query('SELECT COUNT(*) total, COUNT(CASE WHEN correct=1 THEN 1 END) correct FROM solution WHERE problem_id=' + req.params.problem_id + ' GROUP BY player_id;',    
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
        }
        else res.sendStatus(404);
    });
};

