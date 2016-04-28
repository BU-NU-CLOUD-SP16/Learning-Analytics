var mysql = require("mysql");
var sqlConfig = require("./sql_config");

var databaseConn = mysql.createConnection(sqlConfig.login_data);

databaseConn.connect(function(err){
    if(err){
       console.log("Error connecting to DB");
       process.exit();
    }
    else console.log("Connection Established");
    return;
});

tableSchema = sqlConfig.solution_metrics_schema;

var errFunc = function(err){ if(err) console.log(err); };
var fillMetricsTable = function(){
    databaseConn.query("SELECT id, body, problem_id, correct, metric FROM solution;",
        function(err, rows){
        if(err) console.log(err);
        else{
            console.log(rows[0]);
            for(var i = 0; i < rows.length; i++){
                var lines = rows[i].body.split(/\r\n|\r|\n/).length;
                if(rows[i].correct === null) rows[i].correct = -1;
                databaseConn.query("INSERT INTO solution_metrics " +
                                   "VALUES(" +
                                   rows[i].id.toString() + ", " +
                                   rows[i].problem_id.toString() + ", " +
                                   lines.toString() + ", " +
                                   rows[i].correct.toString() + ", " +
                                   rows[i].metric.toString() +" );",
                                   errFunc
                );
            }
        }
    });
};
                    
                
databaseConn.query("SHOW TABLES LIKE 'solution_metrics'", function(err, rows){
    if(err) console.log(err);
    else {
        console.log("solution_metrics table doesn't exists, now building it");
        if(rows.length === 0){
            databaseConn.query("CREATE TABLE solution_metrics" + tableSchema,
                              function(err){
                if(err) console.log(err);
                else{
                    fillMetricsTable();
                }
            });
        }
    }
});

/*
databaseConn.end(function(err){
    if(err) console.log("Error disconnecting from DB");
    else console.log("Disconnected from DB");
    return;
});
*/
