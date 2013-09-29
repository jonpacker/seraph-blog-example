var express = require('express');
var resource = require('seraph-resource');
var http = require('http');
var models = require('./models');
var _ = require('underscore');
var async = require('async');

var app = express();
app.set('view engine', 'jade');

app.use('/api', resource(models.BlogEntry, { strictContentType: false }));

app.get('/', function(req, res, next) {
  models.BlogEntry.findAll(function(err, entries) {
    if (err) return next(err);
    entries = _.sortBy(entries, function(entry) { return entry.created }).reverse();
    async.map(entries, models.BlogEntry.read.bind(models.BlogEntry), function(err, entries) {
      res.render('blog', { entries: entries });
    });
  });
});

var server = module.exports = http.createServer(app);
server.listen(15632);
