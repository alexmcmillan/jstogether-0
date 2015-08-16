// Register babel transpiler so ES6 modules can be imported
require('babel-core/register')();

var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('port', process.env.PORT || 5000);

app.use(express.static(path.join(__dirname, 'public'), {
	index: false
}));

app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

require('./router')(app);

module.exports = app.listen(app.get('port'), function () {
	console.log('Listening! ', app.get('port'));
});