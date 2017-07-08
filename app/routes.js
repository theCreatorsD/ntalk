// app/routes.js
var Topic = require('./models/topic.js')
var Issue = require('./models/issue.js')
var Argument = require('./models/argument.js')
var User = require('./models/user.js')

module.exports = function(app, passport, mongoose) {
  // HOME PAGE
  app.get('/', function(req, res) {
    Topic.find(function(err, _topics) {
      if (err) {
        throw err
      }
      res.render('index.ejs', {user : req.user, topics : _topics})
    })
  })




    // SIGNUP
    app.get('/signup', function(req, res) {
      res.render('signup.ejs', { message : req.flash('signupMessage') })
    })

    app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/',
      failureRedirect : '/signup',
      failureFlash : true
    }))

    // PROFILE
    app.get('/profile', isLoggedIn, function(req, res) {
      res.render('profile.ejs', {
        // get the user out of session and pass to template
        user : req.user
      })
    })



  // TOPIC
  app.get('/topic/:topic_id', function(req, res) {
    Topic.findById(req.params.topic_id, function(err, _topic) {
      if (err) {
        throw err
      }
      Issue.find({'topic_id' : _topic._id}, function(err, _issues) {
        res.render('topic.ejs', {user : req.user, topic : _topic, issues : _issues})
      })
    })
  })

  // ADDTOPIC
  app.get('/addtopic', function(req, res) {
    // console.log(req.user);
    if(req.user.local.isTeacher) {
      res.render('addtopic.ejs', { user : req.user })
    } else {
      res.redirect('/')
    }
  })

  app.post('/addtopic', function(req, res) {
    var topic = new Topic()
    topic.title = req.body.title
    topic.description = req.body.desc
    topic.save(function(err, topic) {
      if (err) {
        return console.error(err)
      }
    })
    res.redirect('/')
  })

  // ADDHEART
  app.post('/topic/:topic_id/:issue_id/:argument_id', function(req, res) {
    Topic.findById(req.params.topic_id, function(err, _topic) {
      if (err) {
        throw err
      }
      Issue.findById(req.params.issue_id, function(err, _issue) {
        if (err) {
          throw err
        }
        Argument.findById(req.params.argument_id, function(err, _argument) {
          if (err) {
            throw err
          } else {
            if (_argument.proser.indexOf(req.body.user) >= 0) {
              console.log("exists");
              var index = _argument.proser.indexOf(req.body.user)
              if (index > -1) {
                _argument.proser.splice(index, 1)
              }
              _argument.save(function (err, _argument) {
                if (err) {
                  return console.error(err);
                } else {
                  console.log("redirecting to the issue")
                  res.redirect('/topic/' + _topic.id + '/' + _issue._id + '#' + req.params.argument_id)
                }
              })
            } else {
              console.log("does not exist");
              _argument.proser.push(req.body.user)
              _argument.save(function (err, _argument) {
                if (err) {
                  return console.error(err);
                } else {
                  console.log("redirecting to the issue")
                  res.redirect('/topic/' + _topic.id + '/' + _issue._id + '#' + req.params.argument_id)
                }
              })
            }
            // res.redirect('/topic/' + _topic.id + '/' + _issue._id + '#' + req.params.argument_id)
          }
        })
      })
    })
  })


  // ADDISSUE
  app.post('/topic/:topic_id', function(req, res) {
    Topic.findById(req.params.topic_id, function(err, _topic) {
      if (err) {
        throw err
      }
      var issue = new Issue()
      issue.title = req.body.title
      issue.topic_id = _topic.id
      issue.save(function(err, issue) {
        if (err) {
          return console.error(err)
        }
      })

      res.redirect('/topic/' + _topic.id)
    })
  })

  // ARGUMENT

  app.get('/topic/:topic_id/:issue_id', function(req, res) {
    Topic.findById(req.params.topic_id, function(err, _topic) {
      if (err) {
        console.log("error occured : find topic by topic id");
        throw err
      }
      Issue.findById(req.params.issue_id, function(err, _issue) {
        if (err) {
          console.log("error occured : find issue by issue id");
          throw err
        }
        Argument.find({'issue_id' : _issue._id}, function(err, _arguments) {
          if (err) {
            console.log("error occured : find argument by issue id");
            throw err
          }
          User.find(function(err, _users) {
            if (err) {
              console.log("error occured : find all users");
              throw err
            }

            console.log("start best selection");
            var _bestAgree = []
            var _bestDisagree = []
            for (var i = 0; i < _arguments.length; i++) {
              if (_arguments[i].stance && _arguments[i].proser.length > 0) {
                _bestAgree.push(_arguments[i])
              } else if (!_arguments[i].stance && _arguments[i].proser.length > 0){
                _bestDisagree.push(_arguments[i])
              }
            }

            var tmp, j





            for (var i = 0; i < _bestAgree.length; i++) {
              tmp = _bestAgree[i]
              j = i
              while (j > 0 && _bestAgree[j - 1].proser.length <= tmp.proser.length) {
                _bestAgree[j] = _bestAgree[j - 1]
                j --
              }
              _bestAgree[j] = tmp
            }

            for (var i = 0; i < _bestDisagree.length; i++) {
              tmp = _bestDisagree[i]
              j = i
              while (j > 0 && _bestDisagree[j - 1].proser.length <= tmp.proser.length) {
                _bestDisagree[j] = _bestDisagree[j - 1]
                j --
              }
              _bestDisagree[j] = tmp
            }
            // for (var i = 0; i < 2; i++) {
            //   for (var j = 0; i < 3; j++) {
            //     if (i==0) {
            //       console.log(_bestAgree[j].title);
            //     } else {
            //       console.log(_bestDisagree[j].title);
            //     }
            //   }
            // }
            console.log("----------------------------------------------------");
            console.log(_bestAgree);
            console.log("");
            console.log(_bestDisagree);


            res.render('issue.ejs', {user : req.user, users : _users, topic: _topic, issue : _issue, arguments : _arguments, bestAgree : _bestAgree, bestDisagree : _bestDisagree})
          })
        })
      })
    })
  })

  // ADDARGUMENT
  app.post('/topic/:topic_id/:issue_id', function(req, res) {
    Topic.findById(req.params.topic_id, function(err, _topic) {
      Issue.findById(req.params.issue_id, function(err, _issue) {
        if (err) {
          throw err
        }

        // console.log(req.user.nickname);
        var argument = new Argument()
        argument.title = req.body.title
        argument.contents = req.body.contents
        argument.author = req.user.local.nickname
        argument.stance = req.body.stance

        argument.pros = 0
        argument.cons = 0

        argument.issue_id = _issue.id
        argument.save(function(err, argument) {
          if (err) {
            throw err
          }
          res.redirect(_issue.id, '/topic/'+_topic.id+'/:', {user: req.user, topic : _topic, issue : _issue, argument : argument})
        })
      })
    })
  })



  // LOGIN
  app.get('/login', function(req, res) {
    res.render('login.ejs', { message : req.flash('loginMessage'), user : req.user })
  })

  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
  }))





  // LOGOUT
  app.get('/logout', function(req, res) {
    console.log(req.logout());
    req.logout()
    res.redirect('/')
  })

  // route middleware to make sure a user is logged in
  function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect('/')
    }
    // if they aren't
  }
}
