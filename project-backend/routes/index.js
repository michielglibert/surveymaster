var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Survey = mongoose.model('Survey');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET survey */
router.get('/API/surveys', function (req, res, next) {
  Survey.find(function (err, surveys) {
    if (err) { return next(err); }
    res.json(surveys);
  })
});

/* GET survey */
router.get('/API/survey', function (req, res, next) {
  Survey.findOneRandom(function (err, randsurvey) {
    if (err) { return next(err); }
      res.json(randsurvey);
  });
});

/* POST survey */
router.post('/API/surveys', function (req, res, next) {
  let survey = new Survey(req.body);
  survey.save(function (err, survey) {
    if (err) { return next(err); }
    res.json(survey);
  })
});

router.delete('/API/surveys/')

module.exports = router;
