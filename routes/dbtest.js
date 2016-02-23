module.exports = function(app, databaseConn){
    // Database Dump
    app.get('/dbtest', function (req, res) {
        databaseConn.query('SELECT * FROM solution', function (err, rows){
        if(err) throw err;
        console.log('Data received from the DB');

        // Dump DB - All Solutions
        res.send(rows);
      });
    });
};
