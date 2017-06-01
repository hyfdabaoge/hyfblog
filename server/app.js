var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./router/index');
var app = express();

app.set('port', process.env.PORT || 3010);
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use('/api', routes)
app.listen(app.get('port'), function(){
	console.log('Express server listening on port' + app.get('port'));
})