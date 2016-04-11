var mysql = require("mysql");
var sql_config = require("./sql_config");

var databaseConn = mysql.createConnection(sql_config.login_data);

databaseConn.connect(function(err){
    if(err)
        throw new Error("Unable to connect to SQL server");
    else
        console.log("Connection Established");
    return;
});

tableSchema = sql_config.player_assignment_metrics_schema;

var getFirstCorrect = function(player_id, problem_id, callback){
    var query = "SELECT correct FROM solution WHERE " +
                "problem_id=" + problem_id.toString() + " AND " +
                "player_id=" + player_id.toString() +
                " ORDER BY player_id, created_at;";
    console.log(query);
    databaseConn.query(query, function(err, rows){
        if(err)
            throw new Error(console.log(err));
        else{
            for(var i = 0; i < rows.length; i++){
                // If submission was correct, return current index 
                if(rows[i].correct == 1){
                    callback(i + 1);
                    return;
                }
            }
            // If there were no correct answers, return -1
            callback(-1);
        }
    });
};

// Get all the player_id problem_id combinations


var getPlayerProblemCombos = function(callback){
    var playerProblemCombos = [];
    var query = "SELECT player_id, problem_id FROM solution " +
            "GROUP BY player_id, problem_id";
    databaseConn.query(query, function(err, rows){
        if (err) throw new Error("SQL query failed for player/problem combos");
        else{
            playerProblemCombos = new Array(rows.length);
            for(var i = 0; i < rows.length; i++){
                playerProblemCombos[i] = [rows[i].player_id, rows[i].problem_id];
            }
            callback(playerProblemCombos);
        }
    });
};

var fillTable = function(){
    var insert = function(player_id, problem_id, firstCorrect){
        query = "INSERT INTO player_assignment_metrics " +
                "(player_id, problem_id, first_correct) " +
                "VALUES("+
                player_id.toString() + ", " +
                problem_id.toString() + ", " +
                firstCorrect.toString() + ");"; 
        console.log(query);
        databaseConn.query(query, function(err){
            if(err) throw new Error(err);
        });
    };
    getPlayerProblemCombos(function(combos){
        for(var i = 0; i < combos.length; i++){

            // bind the player_id and problem_id to the insertion function
            var currInsert = insert.bind(insert, combos[i][0], combos[i][1]);
            // then use as callback function for firstCorrect
            getFirstCorrect(combos[i][0], combos[i][1], currInsert);
        }

        // Once our last query is done, end the connection
    });


};

// Create or re-initialize the table
databaseConn.query("SHOW TABLES LIKE 'player_assignment_metrics'",
                   function(err, rows){
    if(err) throw new Error(err);
    else if(rows.length === 0){
        console.log("Creating new metrics table");
        var query = "CREATE TABLE player_assignment_metrics" + 
                    tableSchema + ";";
        databaseConn.query("CREATE TABLE player_assignment_metrics" +
                           tableSchema, function(err){
            if(err) throw new Error(err);
            else fillTable();
        });
    }else if(rows.length !== 0) 
        throw new Error("Table already exists, please drop it");
});

