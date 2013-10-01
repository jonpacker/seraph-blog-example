var Model = require('seraph-model');
var db = require('seraph')('http://localhost:7474');
var moment = require('moment');
var marked = require('marked');

var BlogEntry = exports.BlogEntry = Model(db, 'entry');
var Tag = exports.Tag = Model(db, 'tag');
var Person = exports.Person = Model(db, 'person');
var Comment = exports.Comment = Model(db, 'comment');

// Set up BlogEntry
BlogEntry.fields = ['title', 'content'];
BlogEntry.useTimestamps(); // automatically adds 'created'/'updated' fields
BlogEntry.compose(Tag, 'tags', 'tagged', {many: true});
BlogEntry.compose(Person, 'author', 'written_by');
BlogEntry.compose(Comment, 'comments', 'has_comment', {many: true});
BlogEntry.addComputedField('prettyCreated', function(entry) {
  var age = moment.duration(entry.created - moment().unix(), 'seconds');
  return age.humanize(true); 
});
BlogEntry.addComputedField('renderedContent', function(entry, callback) {
  marked(entry.content, {}, callback);
});

// Set up Comment
Comment.fields = ['content'];
Comment.useTimestamps();
Comment.compose(Person, 'author', 'written_by');
Comment.addComputedField('prettyCreated', function(comment) {
  var age = moment.duration(comment.created - moment().unix(), 'seconds');
  return age.humanize(true); 
});
Comment.addComputedField('renderedContent', function(comment, callback) {
  marked(comment.content, {}, callback);
});

// Set up Person
Person.fields = ['name', 'email', 'website'];
Person.setUniqueKey('email', true); // don't make duplicate people

// Set up Tag
Tag.fields = ['tag'];
Tag.setUniqueKey('tag', true); // don't make duplicate tags


