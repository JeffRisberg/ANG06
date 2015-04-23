var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var port = process.env.PORT || 3000; // set our port

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

var game = require('./routes/game');
var episode = require('./routes/episode');
var objective = require('./routes/objective');

app.use('/api', game);
app.use('/api', episode);
app.use('/api', objective);

app.listen(port);
console.log('Now serving the app at http://localhost:' + port + '/');
exports = module.exports = app; 						// expose app