var mongoose = require('mongoose');
var random = require('mongoose-simple-random');
var user = require('./comment')

var SurveyScheme = new mongoose.Schema({
    vraag: String,
    antwoord1: String,
    antwoord2: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});
SurveyScheme.plugin(random);
//
mongoose.model('Survey', SurveyScheme);