var mysql = require("mysql");

var databaseConn = mysql.createConnection({
    host: "52.33.14.62",
    user: "remote",
    password: "learninganalytics",
    database: "demo1"
});

databaseConn.connect(function(err){
    if(err){
       console.log("Error connecting to DB");
       process.exit();
    }
    else console.log("Connection Established");
    return;
});

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

    correctPercent = (100 * correctCount/(correctCount+incorrectCount)).toFixed(3);
    
    return correctPercent;
}


table_schema = "(id INT(11) NOT NULL PRIMARY KEY," +
                "FOREIGN KEY (id) REFERENCES problem(id)," +
                "percent_correct FLOAT(6,3));";
var errFunc = function(err){ if(err) console.log(err); };
var fillProblemMetricsTable = function(problem_id){
    query = 'SELECT COUNT(*) total, COUNT(CASE WHEN correct=1 THEN 1 END) correct FROM solution WHERE problem_id=' + problem_id + ' GROUP BY player_id;';
    databaseConn.query(query,    
        function (err, rows){
        if(err) console.log(err);
        else {
            databaseConn.query("INSERT INTO problem_metrics " +
                                "VALUES(" +
                                problem_id.toString() + ", " +
                                submissionToBarChart(rows) + ");",
                                errFunc
            );
        }
    });
};

var getProblemIDs = function(callback){
    databaseConn.query('SELECT id FROM problem;', function (err, rows){
        if(err) {
            console.log(err);
        } else {
            var problem_id = [];
            for(var i = 0; i < rows.length; i++){
                problem_id[i] = rows[i].id;
            }
            callback(problem_id);
        }
    });
};


databaseConn.query("SHOW TABLES LIKE 'problem_metrics'", function(err, rows){
    if(err) console.log(err);
    else {
        console.log("problem_metrics table doesn't exist, now building it");
        if(rows.length === 0){
            databaseConn.query("CREATE TABLE problem_metrics" + table_schema, function(err){
                if(err) console.log(err);
                else {
                    var ids = [];
                    getProblemIDs(function(ids){
                        console.log(ids);
                        for (var i = 0; i < ids.length; i++){
                            fillProblemMetricsTable(ids[i]);
                        }
                    });
                    console.log("Completed creating database.");
                }
            });
        }
    }
});
