module.exports = function(app, databaseConn){

app.get('/student', function (re, res) {
	console.log('Request for information about students');
	res.send('It worked');
});

app.get('/student/:id', function (re, res) {
	console.log('Request for information about a particular student');
	res.send('It worked');
});

app.get('/student/:id/:', function (re, res) {
	console.log('Request for metric about a particular student');
	res.send('It worked');
});

}