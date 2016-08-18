'use strict';

var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var router     = express.Router();
var fs         = require('fs');

app.use(express.static('app'));
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.text({ type: 'text/html' }));

app.get('*', function(req, res) {
    res.status(404).sendfile('./app/404.html');
});

app.get('/', function(req, res) {
    res.sendfile('./app/index.html');
});


app.listen(5000);