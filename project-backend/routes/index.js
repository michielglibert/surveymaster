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

/* GET random survey */
router.get('/API/survey', auth, function (req, res, next) {
  User.findById(req.payload._id, 'answeredSurveys', function (err, user) {
    Survey.count({ _id: { $nin: user.answeredSurveys } }).exec(function (err, count) {
      var random = Math.floor(Math.random() * count)

      Survey.findOne({ _id: { $nin: user.answeredSurveys } }).skip(random)
        .populate({
          path: 'comments',
          select: 'user comment likes posted',
          populate: { path: 'user likes', select: 'username' }
        })
        .exec(function (err, survey) {
          if (err) { return next(err); }
          res.json(survey);
        })
    });
  });
});

/* GET survey by ID */
router.get('/API/survey/:id', auth, function (req, res, next) {
  User.findById(req.payload._id, 'answeredSurveys', function (err, user) {
    Survey.findById({ _id: req.params.id })
      .populate({
        path: 'comments',
        select: 'user comment likes posted',
        populate: { path: 'user likes', select: 'username' }
      })
      .lean()
      .exec(function (err, survey) {
        if (err) { return next(err); }
        if(user.answeredSurveys.indexOf(survey._id) != -1) {
          survey.answered = true;
          console.log(survey.answered );
        } else {
          survey.answered = false;
          console.log(false);
          
        }
        console.log(survey);
        res.json(survey);
      })
  });
});

/* GET survey */
/*router.get('/API/survey', function (req, res, next) {
  Survey.count().exec(function (err, count) {
    var random = Math.floor(Math.random() * count)

    Survey.findOne({ _id: $nin }).skip(random)
      .populate({
        path: 'comments',
        select: 'user comment likes posted',
        populate: { path: 'user likes', select: 'username' }
      })
      .exec(function (err, survey) {
        if (err) { return next(err); }
        res.json(survey);
      })
  });
});*/

/* POST survey */
router.post('/API/surveys', auth, function (req, res, next) {
  let survey = new Survey(req.body);
  survey.save(function (err, survey) {
    if (err) { return next(err); }
    User.update({ _id: req.payload._id },
      { $push: { surveys: survey } },
      function (err, raw) {
        res.json(survey);
      });
  })
});

/* Answer survey */
router.put('/API/survey/:id/answer', auth, function (req, res, next) {
  let user = User.findById(req.payload._id, function (err, user) {
    if (err) { return next(err) }
    //if (user.answeredSurveys.indexOf(req.params.id) === -1) {
    if (req.body.numberAnswer == 1) {
      Survey.findOneAndUpdate({ _id: req.params.id },
        { $inc: { 'countAntwoord1': 1 } },
        { new: true },
        function (err, survey) {
          if (err) { return next(err) }
          User.findByIdAndUpdate(req.payload._id,
            { $addToSet: { answeredSurveys: req.params.id } },
            function (err, user) {
              if (err) { return next(err) }
            })
          res.json(survey)
        });
    } else {
      Survey.findOneAndUpdate({ _id: req.params.id },
        { $inc: { 'countAntwoord2': 1 } },
        { new: true },
        function (err, survey) {
          if (err) { return next(err) }
          User.findByIdAndUpdate(req.payload._id,
            { $addToSet: { answeredSurveys: req.params.id } },
            function (err, user) {
              if (err) { return next(err) }
            });
          res.json(survey)
        });
    }
    //} else {
    //res.sendStatus(200);
    //}
  });
});

/* GET comments */
router.get('/API/comments', function (req, res, next) {
  Comment.find().populate('user', 'username').exec(function (err, surveys) {
    if (err) { return next(err); }
    res.json(surveys);
  })
});

/* GET Comments by user */
router.get('/API/user/comments', auth, function (req, res, next) {
  Comment.find({ user: req.payload._id }).populate('user', 'username').exec(function (err, surveys) {
    if (err) { return next(err); }
    res.json(surveys);
  })
});

/* POST comment for survey*/
router.post('/API/survey/:id/comments', auth, function (req, res, next) {
  let comment = new Comment({ survey: req.params.id, user: req.payload._id, comment: req.body.comment });

  Survey.update({ _id: req.params.id },
    { $push: { 'comments': comment } },
    function (err, raw) {
      User.update({ _id: req.payload._id },
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
        });
    })
});

/* GET user */
router.get('/API/user', auth, function (req, res, next) {
  User.findById(req.payload._id, 'username')
    .populate({
      path: 'comments',
      select: 'comment likes survey posted',
      populate: { path: 'likes survey', select: 'username vraag' }
    })
    .populate({
      path: 'answeredSurveys'
    })
    .populate({
      path: 'surveys'
    })
    .exec(function (err, user) {
      if (err) { return next(err); }
      res.json(user);
    })
});


/* Like */
router.put('/API/comment/:id/like', auth, function (req, res, next) {
  Comment.update({ _id: req.params.id },
    { $addToSet: { likes: req.payload._id } },
    function (err, raw) {
      if (err) { return next(err); }
      res.json(req.payload._id);
    })
});

/* Unlike */
router.put('/API/comment/:id/unlike', auth, function (req, res, next) {
  Comment.update({ _id: req.params.id },
    { $pull: { likes: req.payload._id } },
    function (err, raw) {
      if (err) { return next(err); }
      res.json(req.payload._id);
    })
});

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

router.post('/checkusername', function(req, res, next) {
  User.find({username: req.body.username}, 
    function(err, result) {
      if (result.length) {
        res.json({'username': 'alreadyexists'})
      } else {
        res.json({'username': 'ok'})
      }
  });
});

module.exports = router;
