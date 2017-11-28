var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let Survey = mongoose.model('Survey');
let User = mongoose.model('User');
let jwt = require('express-jwt');
let passport = require('passport');
let auth = jwt({secret: process.env.SECRET, userProperty: 'payload'})

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
router.post('/API/surveys', auth, function (req, res, next) {
  let survey = new Survey(req.body);
  survey.save(function (err, survey) {
    if (err) { return next(err); }
    res.json(survey);
  })
});

router.delete('/API/surveys/')

//AUTH
router.post('/register', function(req, res, next) {
  if(!req.body.username || !req.body.password) {
    return res.status(400).json(
      {message: 'Please fill out all fields'});
  }
  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.save(function (err) {
    if(err) { return next(err); }
    return res.json({token: user.generateJWT()})
  });
});

router.post('/login', function(req, res, next) {
  if(!req.body.username || !req.body.password) {
    return res.status(400).json(
      {message: 'Please fill out all fields'});
  }
  passport.authenticate('local', function(err, user, info) {
    if(err) {return next(err) } 
    if(user) {
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
})

module.exports = router;
