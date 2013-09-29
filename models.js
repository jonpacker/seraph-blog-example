var Model = require('seraph-model');
var db = require('seraph')('http://localhost:7474');

var BlogEntry = exports.BlogEntry = Model(db, 'entry');
var Tag = exports.Tag = Model(db, 'tag');
var Person = exports.Person = Model(db, 'person');
var Comment = exports.Comment = Model(db, 'comment');

// Set up BlogEntry
BlogEntry.fields = ['title', 'content'];
BlogEntry.useTimestamps(); // automatically adds 'created'/'updated' fields
BlogEntry.compose(Tag, 'tags', 'tagged', true);
BlogEntry.compose(Person, 'author', 'written_by');
BlogEntry.compose(Comment, 'comments', 'has_comment', true);

// Set up Comment
Comment.fields = ['content'];
Comment.useTimestamps();
Comment.compose(Person, 'author', 'written_by');

// Set up Person
Person.fields = ['name', 'email', 'website'];
Person.setUniqueKey('email', true); // don't make duplicate people

// Set up Tag
Tag.fields = ['tag'];
Tag.setUniqueKey('tag', true); // don't make duplicate tags


