var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');
let jwt = require('express-jwt');
let passport = require('passport');
let auth = jwt({ secret: process.env.SECRET, userProperty: 'payload' })

//Model
let Survey = mongoose.model('Survey');
let User = mongoose.model('User');
let Comment = mongoose.model('Comment')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET surveys */
router.get('/API/surveys', auth, function (req, res, next) {
  Survey.find({}, '-comments', function (err, surveys) {
    if (err) { return next(err); }
    res.json(surveys);
  })
});

/* GET comments from survey */
router.get('/API/survey/:id/comments', function (req, res, next) {
  Survey.findById(req.params.id, 'comments')
    .populate({
      path: 'comments',
      select: 'user comment',
      populate: { path: 'user', select: 'username' }
    })
    .exec(function (err, survey) {
      if (err) { return next(err); }
      res.json(survey);
    })
});

/* GET survey */
router.get('/API/survey', auth, function (req, res, next) {
  Survey.count().exec(function (err, count) {
    var random = Math.floor(Math.random() * count)

    Survey.findOne().skip(random)
      .populate({
        path: 'comments',
        select: 'user comment',
        populate: { path: 'user', select: 'username' }
      })
      .exec(function (err, survey) {
        if (err) { return next(err); }
        res.json(survey);
      })
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

/* GET comments */
router.get('/API/comments', function (req, res, next) {
  Comment.find().populate('user', 'username').exec(function (err, surveys) {
    if (err) { return next(err); }
    res.json(surveys);
  })
});

/* POST comment for survey*/
router.post('/API/survey/:id/comments', auth, function (req, res, next) {
  let comment = new Comment({ user: req.payload._id, comment: req.body.comment });

  Survey.update({ _id: req.params.id },
    { $push: { 'comments': comment } },
    function (err, raw) {
      if (err) { return next(err) };
      comment.save(function (err, comment) {
        if (err) { return next(err); }
        Comment.populate(comment, 'user', function (err, comment) {
          if (err) { return next(err); }
          res.json(comment);
        });
      })
    })
});



router.patch('/API/comment/:id/upvote')

//AUTH
router.post('/register', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json(
      { message: 'Please fill out all fields' });
  }
  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.save(function (err) {
    if (err) { return next(err); }
    return res.json({ token: user.generateJWT() })
  });
});

router.post('/login', function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json(
      { message: 'Please fill out all fields' });
  }
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err) }
    if (user) {
      return res.json({ token: user.generateJWT() });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

module.exports = router;
