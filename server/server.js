'use strict';

var express = require('express'),
  bodyParser = require('body-parser'),
  http = require('http'),
  path = require('path'),
  api = require('./routes/api');

var app = express();

app.set('port', process.env.PORT || 3001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT");
  next();
});

// JSON API
app.get('/api/peoples', api.listAll);
app.get('/api/peoples/:id', api.get);
app.put('/api/peoples/:id', api.update);


app.listen(app.get('port'), function () {
  console.log('✔ Express server listening on http://localhost:%d/', app.get('port'));
});
