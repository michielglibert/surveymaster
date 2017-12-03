var mongoose = require('mongoose');
var user = require('./user')

var CommentScheme = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    survey: { type: mongoose.Schema.Types.ObjectId, ref: 'Survey' },
    comment: String,
    posted: { type: Date, default: Date.now },
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]

});

mongoose.model('Comment', CommentScheme);