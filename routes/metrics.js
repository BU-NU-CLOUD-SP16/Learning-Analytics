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
                    res.send(linecounts);
                }
            });
        } else {
            res.sendStatus(404);
        }
    });
};
