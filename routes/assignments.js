module.exports = function(app, fs, COMMENTS_FILE){
    
    // Load assignments -- Placeholders
    app.get('/assignments', function(req, res) {
      fs.readFile(COMMENTS_FILE, function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        res.json(JSON.parse(data));
      });
    });


};
