var mongoose = require('mongoose');
var user = require('./user')

var CommentScheme = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment: String,
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

mongoose.model('Comment', CommentScheme);