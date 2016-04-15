/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Emailaddresses = require('machinepack-emailaddresses');
var Passwords = require('machinepack-passwords');
var Gravatar = require('machinepack-gravatar');
var Strings = require('machinepack-strings');
var Mailgun = require('machinepack-mailgun');

module.exports = {

  login: function(req, res) {

    User.findOne({
      or: [{
        email: req.param('email')
      }, {
        username: req.param('username')
      }]
    }, function foundUser(err, createdUser) {
      if (err) return res.negotiate(err);
      if (!createdUser) return res.notFound();

      Passwords.checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: createdUser.encryptedPassword
      }).exec({

        error: function(err) {
          return res.negotiate(err);
        },

        incorrect: function() {
          return res.notFound();
        },

        success: function() {

          if (createdUser.deleted) {
            return res.forbidden("'Your account has been deleted.  Please visit http://brushfire.io/restore to restore your account.'");
          }

          if (createdUser.banned) {
            return res.forbidden("'Your account has been banned, most likely for adding dog videos in violation of the Terms of Service.  Please contact Chad or his mother.'");
          }

          req.session.userId = createdUser.id;

          return res.ok();

        }
      });
    });
  },

  logout: function(req, res) {

    User.findOne(req.session.userId, function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists.');
        return res.redirect('/');
      }

      // log the user-agent out.
      req.session.userId = null;

      return res.ok();
    });
  },

  signup: function(req, res) {

    if (_.isUndefined(req.param('email'))) {
      return res.badRequest('An email address is required!');
    }

    if (_.isUndefined(req.param('password'))) {
      return res.badRequest('A password is required!');
    }

    if (req.param('password').length < 6) {
      return res.badRequest('Password must be at least 6 characters!');
    }

    if (_.isUndefined(req.param('username'))) {
      return res.badRequest('A username is required!');
    }

    // username must be at least 6 characters
    if (req.param('username').length < 6) {
      return res.badRequest('Username must be at least 6 characters!');
    }

    // Username must contain only numbers and letters.
    if (!_.isString(req.param('username')) || req.param('username').match(/[^a-z0-9]/i)) {
      return res.badRequest('Invalid username: must consist of numbers and letters only.');
    }

    Emailaddresses.validate({
      string: req.param('email'),
    }).exec({
      // An unexpected error occurred.
      error: function(err) {
        return res.serverError(err);
      },
      // The provided string is not an email address.
      invalid: function() {
        return res.badRequest('Doesn\'t look like an email address to me!');
      },
      // OK.
      success: function() {
        Passwords.encryptPassword({
          password: req.param('password'),
        }).exec({

          error: function(err) {
            return res.serverError(err);
          },

          success: function(result) {

            var options = {};

            try {

              options.gravatarURL = Gravatar.getImageUrl({
                emailAddress: req.param('email')
              }).execSync();

            } catch (err) {
              return res.serverError(err);
            }

            options.email = req.param('email');
            options.username = req.param('username');
            options.encryptedPassword = result;
            options.deleted = false;
            options.admin = false;
            options.banned = false;

            User.create(options).exec(function(err, createdUser) {
              if (err) {
                console.log('the error is: ', err.invalidAttributes);

                // Check for duplicate email address
                if (err.invalidAttributes && err.invalidAttributes.email && err.invalidAttributes.email[0] && err.invalidAttributes.email[0].rule === 'unique') {

                  // return res.send(409, 'Email address is already taken by another user, please try again.');
                  return res.alreadyInUse(err);
                }

                // Check for duplicate username
                if (err.invalidAttributes && err.invalidAttributes.username && err.invalidAttributes.username[0] && err.invalidAttributes.username[0].rule === 'unique') {

                  // return res.send(409, 'Username is already taken by another user, please try again.');
                  return res.alreadyInUse(err);
                }

                return res.negotiate(err);
              }

              // Log the user in
              req.session.userId = createdUser.id;

              return res.json({
                username: createdUser.username
              });
            });
          }
        });
      }
    });
  },

  removeProfile: function(req, res) {

    User.update({
      id: req.session.userId
    }, {
      deleted: true
    }, function(err, removedUser) {

      if (err) return res.negotiate(err);
      if (removedUser.length === 0) {
        return res.notFound();
      }

      req.session.userId = null;
      return res.ok();
    });
  },

  generateRecoveryEmail: function(req, res) {

    // secondary check for email parameter
    if (_.isUndefined(req.param('email'))) {
      return res.badRequest('An email address is required!');
    }

    // Find user by the incoming `email` parameter
    User.findOne({
      email: req.param('email')
    }).exec(function foundUser(err, user) {

      if (err) return res.negotiate(err);

      if (!user) return res.notFound();

      // Generate random alphanumeric string for the passwordRecoveryToken
      try {

        var randomString = Strings.random({}).execSync();

      } catch (err) {
        return res.serverError(err);
      }

      // Update user's paswordRecoveryToken attribute with the newly created alphanumeric string
      User.update({
        id: user.id
      }, {
        passwordRecoveryToken: randomString
      }).exec(function updateUser(err, updatedUser) {
        if (err) return res.negotiate(err);

        // email user with a URL which includes the password recovery token as a parameter

        // The Url that inclues the password recovery token as a parameter
        var recoverUrl = sails.config.mailgun.baseUrl + '/password-reset-form/' + updatedUser[0].passwordRecoveryToken;

        var messageTemplate = 'Losing your password is a drag, but don\'t worry! \n' +
                   '\n' +
                   'You can use the following link to reset your password: \n' +
                   recoverUrl + '\n' +
                   '\n' +
                   'Thanks, Chad';

        // Send a simple plaintext email.
        Mailgun.sendPlaintextEmail({
          apiKey: sails.config.mailgun.apiKey,
          domain: sails.config.mailgun.domain,
          toEmail: updatedUser[0].email,
          subject: '[Brushfire] Please reset your password',
          message: messageTemplate,
          fromEmail: 'sailsinaction@gmail.com',
          fromName: 'Chad McMarketing',
        }).exec({
          // An unexpected error occurred.
          error: function(err) {
            return res.negotiate(err);

          },
          // OK.
          success:  function() {

            return res.ok();

          },
        });
      });
    });
  },

  resetPassword: function(req, res) {

    // check for token parameter
    if (!_.isString(req.param('passwordRecoveryToken'))) {
      return res.badRequest('A password recovery token is required!');
    }

    // secondary check for password parameter
    if (!_.isString(req.param('password'))) {
      return res.badRequest('A password is required!');
    }

    // Fallback to client-side length check validation
    if (req.param('password').length < 6) {
      return res.badRequest('Password must be at least 6 characters!');
    }

    // Try to find user with passwordRecoveryToken
    User.findOne({
      passwordRecoveryToken: req.param('passwordRecoveryToken')
    }).exec(function foundUser(err, user){
      if (err) return res.negotiate(err);

      // If this token doesn't correspond with a real user record, it is invalid.
      // We send a 404 response so that our front-end code can show an
      // appropriate error message.
      if (!user) {
        return res.notFound();
      }

      // Encrypt new password
      Passwords.encryptPassword({
        password: req.param('password'),
      }).exec({
        error: function(err) {
          return res.serverError(err);
        },
        success: function(encryptedPassword) {

          User.update(user.id, {
            encryptedPassword: encryptedPassword,
            passwordRecoveryToken: null
          }).exec(function (err, updatedUsers) {
            if (err) {
              return res.negotiate(err);
            }

            // Log the user in
            req.session.userId = updatedUsers[0].id;

            // If successful return updatedUsers
            return res.json({
              username: updatedUsers[0].username
            });
          });
        }
      });
    });
  },

  restoreProfile: function(req, res) {

    User.findOne({
      email: req.param('email')
    }, function foundUser(err, user) {
      if (err) return res.negotiate(err);
      if (!user) return res.notFound();

      Passwords.checkPassword({
        passwordAttempt: req.param('password'),
        encryptedPassword: user.encryptedPassword
      }).exec({

        error: function(err) {
          return res.negotiate(err);
        },

        incorrect: function() {
          return res.notFound();
        },

        success: function() {

          User.update({
            id: user.id
          }, {
            deleted: false
          }).exec(function(err, updatedUser) {
            if (err) return res.negotiate(err);

            req.session.userId = user.id;

            return res.json({
              username: updatedUser[0].username
            });
          });
        }
      });
    });
  },

  restoreGravatarURL: function(req, res) {

    try {

      var restoredGravatarURL = gravatarURL = Gravatar.getImageUrl({
        emailAddress: req.param('email')
      }).execSync();

      return res.json(restoredGravatarURL);

    } catch (err) {
      return res.serverError(err);
    }
  },

  updateProfile: function(req, res) {

    User.update({
      id: req.session.userId
    }, {
      gravatarURL: req.param('gravatarURL')
    }, function(err, updatedUser) {

      if (err) return res.negotiate(err);

      return res.json({
        username: updatedUser[0].username
      });

    });
  },

  changePassword: function(req, res) {

    // Fallback to client-side required validation
    if (_.isUndefined(req.param('password'))) {
      return res.badRequest('A password is required!');
    }

    // Fallback to client-side length check validation
    if (req.param('password').length < 6) {
      return res.badRequest('Password must be at least 6 characters!');
    }

    Passwords.encryptPassword({
      password: req.param('password'),
    }).exec({
      error: function(err) {
        return res.serverError(err);
      },
      success: function(result) {

        User.update({
          // id: req.param('id')
          id: req.session.userId
        }, {
          encryptedPassword: result
        }).exec(function(err, updatedUser) {
          if (err) {
            return res.negotiate(err);
          }
          return res.json({
            username: updatedUser[0].username});
        });
      }
    });
  },

  adminUsers: function(req, res) {

    User.find().exec(function(err, users) {

      if (err) return res.negotiate(err);

      if (users.length === 0) return res.notFound();

      var updatedUsers = _.map(users, function(user){

        user = {
          id: user.id,
          gravatarURL: user.gravatarURL,
          username: user.username,
          email: user.email,
          admin: user.admin,
          banned: user.banned,
          deleted: user.deleted,
        };

        return user;
      });

      return res.json(updatedUsers);
    });
  },

  updateAdmin: function(req, res) {

    User.update(req.param('id'), {
      admin: req.param('admin')
    }).exec(function(err, update) {

      if (err) return res.negotiate(err);

      return res.ok();
    });
  },

  updateBanned: function(req, res) {
    User.update(req.param('id'), {
      banned: req.param('banned')
    }).exec(function(err, update) {
      if (err) return res.negotiate(err);
      return res.ok();
    });
  },

  updateDeleted: function(req, res) {
    User.update(req.param('id'), {
      deleted: req.param('deleted')
    }).exec(function(err, update) {
      if (err) return res.negotiate(err);
      return res.ok();
    });
  },

  follow: function(req, res) {
    
    // Find the user that owns the tutorial
    User.findOne({
      username: req.param('username'),
    })
    .populate('followers')
    .populate('following')
    .exec(function (err, foundUser){
      if (err) return res.negotiate(err);
      if (!foundUser) return res.notFound();

      // Assure that a user cannot follow themselves.  This is a secondary
      // check to the front end which we can't trust.
      if (foundUser.id === req.session.userId) {
        return res.forbidden();
      }

      // Add the currently authenticated user-agent (user) as 
      // a follower of owner of the tutorial
      foundUser.followers.add(req.session.userId);
      foundUser.save(function (err){
        if (err) return res.negotiate(err);

        // requery to get user changes
        User.findOne({
          username: req.param('username'),
        })
        .populate('followers')
        .populate('following')
        .exec(function (err, updatedUser){
          if (err) return res.negotiate(err);
          if (!updatedUser) return res.notFound();

          return res.json({
            numOfFollowers: updatedUser.followers.length,
            numOfFollowing: updatedUser.following.length,
            followers: updatedUser.followers,
            following: updatedUser.following
          });
        });
      });
    });
  },

  unFollow: function(req, res) {
    
    // Find the user that owns the tutorial
    User.findOne({
      username: req.param('username'),
    })
    .populate('followers')
    .populate('following')
    .exec(function (err, user){
      if (err) return res.negotiate(err);
      if (!user) return res.notFound();

      // Remove the currently authenticated user-agent (user) as 
      // a follower of owner of the tutorial
      user.followers.remove(req.session.userId);
      user.save(function (err){
        if (err) return res.negotiate(err);

        // requery to get user changes
        User.findOne({
          username: req.param('username'),
        })
        .populate('followers')
        .populate('following')
        .exec(function (err, updatedUser){
          if (err) return res.negotiate(err);
          if (!updatedUser) return res.notFound();

          return res.json({
            numOfFollowers: updatedUser.followers.length,
            numOfFollowing: updatedUser.following.length,
            followers: updatedUser.followers,
            following: updatedUser.following
          });
        });
      });
    });
  },
};