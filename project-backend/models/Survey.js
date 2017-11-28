var mongoose = require('mongoose');
var random = require('mongoose-simple-random');

var SurveyScheme = new mongoose.Schema({
    vraag: String,
    antwoord1: String,
    antwoord2: String
});
SurveyScheme.plugin(random);
//
mongoose.model('Survey', SurveyScheme);