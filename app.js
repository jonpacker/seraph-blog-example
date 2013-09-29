var express = require('express');
var resource = require('seraph-resource');
var http = require('http');
var models = require('./models');

var app = express();
app.set('view engine', 'jade');

app.use('/api', resource(models.BlogEntry));

app.get('/', function(req, res, next) {
    res.render('blog');
  return;
  models.BlogEntry.findAll(function(err, entries) {
    if (err) return next(err);
    res.render('blog', entries);
  });
});

var server = module.exports = http.createServer(app);
server.listen(15632);
