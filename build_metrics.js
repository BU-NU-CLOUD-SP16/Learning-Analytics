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

table_schema = "(id INT(11) NOT NULL PRIMARY KEY," +
                "FOREIGN KEY (id) REFERENCES solution(id)," +
                "linecount INT(5));";
var errFunc = function(err){ if(err) console.log(err); };
var fillMetricsTable = function(){
    databaseConn.query("SELECT id, body FROM solution;",
        function(err, rows){
        if(err) console.log(err);
        else{
            console.log(rows[0]);
            for(var i = 0; i < rows.length; i++){
                var lines = rows[i].body.split(/\r\n|\r|\n/).length;
                databaseConn.query("INSERT INTO solution_metrics " +
                                   "VALUES(" +
                                   rows[i].id.toString() + ", " +
                                   lines.toString() + " );",
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
            databaseConn.query("CREATE TABLE solution_metrics" + table_schema,
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
