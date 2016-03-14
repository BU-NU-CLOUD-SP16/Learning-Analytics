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


module.exports = function(app, databaseConn){
    
    app.get('/metrics/:metric', function(req, res) {
        
        if(req.params.metric == "linecount"){
            databaseConn.query('SELECT linecount FROM solution_metrics;',
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
        } else res.sendStatus(404);
    });
};

