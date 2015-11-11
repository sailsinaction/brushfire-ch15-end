/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  home: function(req, res) {

    if (!req.session.userId) {
      return res.view('homepage', {
        me: null
      });
    }

    User.findOne(req.session.userId, function(err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage', {
          me: null
        });
      }

      return res.view('homepage', {
        me: {
          username: user.username,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        },
        showAddTutorialButton: true
      });
    });
  },

  logout: function(req, res) {

    if (!req.session.userId) {
      return res.redirect('/');
    }

    User.findOne(req.session.userId, function(err, user) {
      if (err) {
        console.log('error: ', err);
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      return res.view('signout', {
        me: {
          username: user.username,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        }
      });
    });
  },

  editProfile: function(req, res) {

    User.findOne(req.session.userId, function(err, user) {
      if (err) {
        console.log('error: ', err);
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      return res.view('edit-profile', {
        me: {
          email: user.email,
          username: user.username,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        }
      });
    });
  },

  profile: function(req, res) {
    // Look up the user record by the incoming `username` parameter
    // and populate the tutorials collection association
    
    // User.findOne({
    //   username: req.param('username')
    // }).populate('tutorials')
    // .exec(function(err, foundByUsername) {
    //   if (err) {
    //     return res.negotiate(err);
    //   }

    //   // If no user exists with the username specified in the URL,
    //   // show the 404 page.
    //   if (!foundByUsername) {
    //     return res.notFound();
    //   }

    //   // If the user has tutorials convert the owner property to the 
    //   // username of the tutorial owner.
    //   (function ifThenFinally (cb){

    //     // If the tutorials property doesn't contain tutorials just keep going to afterwards();
    //     if (foundByUsername.tutorials.length < 1) {
    //       return cb();
    //     }
     
    //     async.each(foundByUsername.tutorials, function(tutorial, next) {
          
    //       // console.log('value of tutorial before User.findOne', tutorial);

    //       User.findOne({
    //         id: tutorial.owner
    //       }).exec(function(err, userOwner){
    //         if (err) return next(err);
     
    //         console.log('userOwner.username: ', userOwner.username);
    //         var index = _.indexOf(foundByUsername.tutorials, tutorial);
    //         console.log('foundByUsername.tutorials[index]: ', foundByUsername.tutorials[index]);
    //         console.log('foundByUsername.tutorials[index].owner: ', foundByUsername.tutorials[index].owner);
    //         foundByUsername.tutorials[index].owner = userOwner.username;
    //         console.log('foundByUsername after iterator: ', foundByUsername);
      
    //       });
    //         return next();
    //     }, function (err) {
    //       if (err) return res.negotiate(err);
    //     });
    //   })(function afterwards(err){
    //     if (err) { return res.serverError(err); }

    //     if (!req.session.userId) {
          
    //       return res.view('profile', {
    //         me: null,
    //         username: foundByUsername.username,
    //         gravatarURL: foundByUsername.gravatarURL,
    //         tutorials: foundByUsername.tutorials
    //       });
    //     }
    //   });
       
    // Find user by username
    // Find tutorials populate owner

    // User.findOne({
    //   username: req.param('username')
    // })
    // .populate('tutorials')
    // .exec(function(err, foundByUsername){

    //   _.each(foundByUsername.tutorials, function(tutorial){

    //     // sync owner
    //     tutorial.owner = foundByUsername.username;

    //     // Format the createdAt attributes and assign them to the tutorial
    //     tutorial.created = DatetimeService.getTimeAgo({date: tutorial.createdAt});

    //     var totalSeconds = 0;
    //     _.each(tutorial.videos, function(video){


    //       // Total the number of seconds for all videos for tutorial total time
    //       totalSeconds = totalSeconds + video.lengthInSeconds;
          
    //       tutorial.totalTime = DatetimeService.getHoursMinutesSeconds({totalSeconds: totalSeconds}).hoursMinutesSeconds;
    //     });
    //   });

    //   // The logged out case
    //   if (!req.session.userId) {
        
    //     return res.view('profile', {
    //       // This is for the navigation bar
    //       me: null,

    //       // This is for profile body
    //       username: foundByUsername.username,
    //       gravatarURL: foundByUsername.gravatarURL,

    //       // This is for the list of tutorials
    //       tutorials: foundByUsername.tutorials
    //     });
    //   }

    //   // Otherwise the user-agent IS logged in.

    //   // Look up the logged-in user from the database.
    //   User.findOne({
    //     id: req.session.userId
    //   }).exec(function (err, loggedInUser){
    //     if (err) {
    //       return res.negotiate(err);
    //     }

    //     if (!loggedInUser) {
    //       return res.serverError('User record from logged in user is missing?');
    //     }

    //     // We'll provide `me` as a local to the profile page view.
    //     // (this is so we can render the logged-in navbar state, etc.)
    //     var me = {
    //       username: loggedInUser.username,
    //       email: loggedInUser.email,
    //       gravatarURL: loggedInUser.gravatarURL,
    //       admin: loggedInUser.admin
    //     };

    //     // We'll provide the `isMe` flag to the profile page view
    //     // if the logged-in user is the same as the user whose profile we looked up earlier.
    //     if (req.session.userId === foundByUsername.id) {
    //       me.isMe = true;
    //     }
        
    //     // Return me property for the nav and the remaining properties for the profile page.
    //     return res.view('profile', {
    //       me: me,
    //       showAddTutorialButton: true,
    //       username: foundByUsername.username,
    //       gravatarURL: foundByUsername.gravatarURL,
    //       tutorials: foundByUsername.tutorials
    //     });
    //   }); //</ User.findOne({id: req.session.userId})
      
    // });
    
    User.findOne({
      username: req.param('username')
    })
    .populate('tutorials')
    .exec(function(err, foundByUsername){
      if (err) return res.negotiate(err);
      if (!foundByUsername) return res.notFound();

      // Turn this into a regular dictionary instead of a model instance.
      var user = foundByUsername.toObject();

      // Now that we have the user and the tutorials, gather up all the references to each
      // tutorial so that we can use it to find all the videos belonging that belong to
      // the tutorials.
      var tutorialIds = _.pluck(user.tutorials, 'id');
      
      // Now let's find all the videos we need to fulfill the request
      Video.find({
        tutorialAssoc: tutorialIds
      }).exec(function(err, videos){
        if (err) return res.negotiate(err);
        if (!videos) return res.notFound();

        // Now we have all the data, lets loop through the tutorials and gather
        // up all the videos related to each tutorial.
        _.each(user.tutorials, function(tutorial) {

          // Find all the videos that their tutorialAssoc value set to the tutorial's id
          var tutorialVideos = _.filter(videos, { tutorialAssoc: tutorial.id });

          // Then set tutorial.videos to the array
          tutorial.videos = _.map(tutorialVideos, function(video) {
            var obj = video.toObject();
            return _.omit(obj, 'tutorialAssoc');
          });
        });

        _.each(user.tutorials, function(tutorial){

          // sync owner
          tutorial.owner = user.username;

          // Format the createdAt attributes and assign them to the tutorial
          tutorial.created = DatetimeService.getTimeAgo({date: tutorial.createdAt});

          var totalSeconds = 0;
          _.each(tutorial.videos, function(video){

            // Total the number of seconds for all videos for tutorial total time
            totalSeconds = totalSeconds + video.lengthInSeconds;
            
            tutorial.totalTime = DatetimeService.getHoursMinutesSeconds({totalSeconds: totalSeconds}).hoursMinutesSeconds;
          });
        });

        // The logged out case
        if (!req.session.userId) {
          
          return res.view('profile', {
            // This is for the navigation bar
            me: null,

            // This is for profile body
            username: user.username,
            gravatarURL: user.gravatarURL,

            // This is for the list of tutorials
            tutorials: user.tutorials
          });
        }

        // Otherwise the user-agent IS logged in.

        // Look up the logged-in user from the database.
        User.findOne({
          id: req.session.userId
        }).exec(function (err, loggedInUser){
          if (err) {
            return res.negotiate(err);
          }

          if (!loggedInUser) {
            return res.serverError('User record from logged in user is missing?');
          }

          // We'll provide `me` as a local to the profile page view.
          // (this is so we can render the logged-in navbar state, etc.)
          var me = {
            username: loggedInUser.username,
            email: loggedInUser.email,
            gravatarURL: loggedInUser.gravatarURL,
            admin: loggedInUser.admin
          };

          // We'll provide the `isMe` flag to the profile page view
          // if the logged-in user is the same as the user whose profile we looked up earlier.
          if (req.session.userId === user.id) {
            me.isMe = true;
          }
          
          // Return me property for the nav and the remaining properties for the profile page.
          return res.view('profile', {
            me: me,
            showAddTutorialButton: true,
            username: user.username,
            gravatarURL: user.gravatarURL,
            tutorials: user.tutorials
          });
        }); //</ User.findOne({id: req.session.userId})
      });
    });
  },

  signin: function(req, res) {

    return res.view('signin', {
      me: null
    });
  },

  signup: function(req, res) {

    return res.view('signup', {
      me: null
    });
  },

  restoreProfile: function(req, res) {

    return res.view('restore-profile', {
      me: null
    });
  },

  administration: function(req, res) {

    User.findOne(req.session.userId, function(err, user) {

      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      if (!user.admin) {
        return res.redirect('/');
      } else {
        return res.view('administration', {
          me: {
            username: user.username,
            gravatarURL: user.gravatarURL,
            admin: user.admin
          },
          showAddTutorialButton: true
        });
      }
    });
  },

  // #1
  passwordRecoveryEmail: function(req, res) {

    return res.view('./password-recovery/password-recovery-email', {
      me: null
    });
  },

  // #2
  passwordRecoveryEmailSent: function(req, res) {

    return res.view('./password-recovery/password-recovery-email-sent', {
      me: null
    });
  },

  // #3
  passwordReset: function(req, res) {

    // Get the passwordRecoveryToken and render the view
    res.view('./password-recovery/password-reset', {
      me: null,
      passwordRecoveryToken: req.param('passwordRecoveryToken')
    });

  },

  showBrowsePage: function(req, res) {

    // If not logged in set `me` property to `null` and pass tutorials to the view
    if (!req.session.userId) {
      return res.view('browse-tutorials-list', {
        me: null
      });
    }

    User.findOne(req.session.userId, function(err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage', {
          me: null
        });
      }

      return res.view('browse-tutorials-list', {
        me: {
          email: user.email,
          gravatarURL: user.gravatarURL,
          username: user.username,
          admin: user.admin
        },
        showAddTutorialButton: true
      });
    });
  },

  tutorialDetail: function(req, res) {

    Tutorial.findOne(req.param('id'))
    .populate('owner')
    .populate('videos')
    .exec(function(err, tutorial){
      if (err) return res.negotiate(err);
      if (!tutorial) return res.notFound();

      User.findOne({
        id: tutorial.owner.id
      }).exec(function(err, user){
        if (err) return res.negotiate(err);
        if (!user) return res.notFound();
  
        tutorial.owner = user.username;
        
        // Format the createdAt and UpdatedAt attributes and assign them to the tutorial
        tutorial.created = DatetimeService.getTimeAgo({date: tutorial.createdAt});
        tutorial.updated = DatetimeService.getTimeAgo({date: tutorial.updatedAt});

        var totalSeconds = 0;
        _.each(tutorial.videos, function(video){

          // Total the number of seconds for all videos for tutorial total time
          totalSeconds = totalSeconds + video.lengthInSeconds;

          // Format the video lengthInSeconds into xh xm xs format for each video
          video.totalTime = DatetimeService.getHoursMinutesSeconds({totalSeconds: video.lengthInSeconds}).hoursMinutesSeconds;

          tutorial.totalTime = DatetimeService.getHoursMinutesSeconds({totalSeconds: totalSeconds}).hoursMinutesSeconds;
        });

        // If not logged in set `me` property to `null` and pass the tutorial to the view
        if (!req.session.userId) {
          return res.view('tutorials-detail', {
            me: null,
            stars: tutorial.stars,
            tutorial: tutorial
          });
        }

        User.findOne(req.session.userId, function(err, user) {
          if (err) {
            return res.negotiate(err);
          }

          if (!user) {
            sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
            return res.view('tutorials-detail', {
              me: null
            });
          }

          // We'll provide `me` as a local to the profile page view.
          // (this is so we can render the logged-in navbar state, etc.)
          var me = {
            gravatarURL: user.gravatarURL,
            username: user.username,
            admin: user.admin
          };

          if (user.username === tutorial.owner) {
            me.isMe = true;

            return res.view('tutorials-detail', {
              me: me,
              stars: tutorial.stars,
              tutorial: tutorial
            });

          } else {
            return res.view('tutorials-detail', {
              me: {
                gravatarURL: user.gravatarURL,
                username: user.username,
                admin: user.admin
              },
              stars: tutorial.stars,
              tutorial: tutorial
            });
          }
        });
      });
    });
  },

  newTutorial: function(req, res) {

    User.findOne(req.session.userId, function(err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.redirect('tutorials');
      }

      return res.view('tutorials-detail-new', {
        me: {
          gravatarURL: user.gravatarURL,
          username: user.username,
          admin: user.admin
        }
      });
    });
  },

  editTutorial: function(req, res) {

    Tutorial.findOne({id: req.param('id')}).exec(function (err, tutorial){
      if (err) return res.negotiate(err);

      if (!tutorial) return res.notFound();

      User.findOne({
        id: tutorial.owner
      }).exec(function(err, ownerUser){
        tutorial.owner = ownerUser.username;

        User.findOne(req.session.userId, function(err, user) {
          if (err) {
            return res.negotiate(err);
          }

          if (!user) {
            sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
            return res.redirect('/tutorials');
          }

          if (user.username !== tutorial.owner) {

            return res.redirect('/tutorials/'+tutorial.id);

          }

          tutorial.created = DatetimeService.getTimeAgo({date: tutorial.createdAt});

          return res.view('tutorials-detail-edit', {
            me: {
              gravatarURL: user.gravatarURL,
              username: user.username,
              admin: user.admin
            },
            tutorial: {
              id: tutorial.id,
              title: tutorial.title,
              description: tutorial.description,
            }
          });
        });
      });
    });
  },

  newVideo: function(req, res) {

    Tutorial.findOne({
      id: req.param('id')
    })
    .populate('owner')
    .exec(function(err, foundTutorial){
      if (err) return res.negotiate(err);
      if (!foundTutorial) return res.notFound();

      User.findOne(req.session.userId, function(err, user) {
        if (err) {
          return res.negotiate(err);
        }

        if (!user) {
          sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
          return res.redirect('/');
        }

        if (user.username !== foundTutorial.owner.username) {

          return res.redirect('/tutorials/'+foundTutorial.id);

        }

        foundTutorial.created = DatetimeService.getTimeAgo({date: foundTutorial.createdAt});

        return res.view('tutorials-detail-video-new', {
          me: {
            username: user.username,
            gravatarURL: user.gravatarURL,
            admin: user.admin
          },
          // We don't need all of the tutorial attributes on window.SAILS_LOCALS.tutorial
          // so we're passing stars separately.
          stars: foundTutorial.stars,
          tutorial: {
            id: foundTutorial.id,
            title: foundTutorial.title,
            description: foundTutorial.description,
            owner: foundTutorial.owner.username,
            created: foundTutorial.created,
            totalTime: foundTutorial.totalTime,
            stars: foundTutorial.stars
          }
        });
      });
    });
  },

  editVideo: function(req, res) {

    Tutorial.findOne({
      id: req.param('tutorialId')
    })
    .populate('videos')
    .populate('owner')
    .exec(function(err, tutorial){
      if (err) return res.negotiate(err);
      if (!tutorial) return res.notFound();

      User.findOne(req.session.userId, function(err, user) {
        if (err) {
          return res.negotiate(err);
        }

        if (!user) {
          sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
          return res.redirect('/');
        }

        if (user.username !== tutorial.owner.username) {

          return res.redirect('/tutorials/'+tutorial.id);

        }

        var totalSeconds = 0;
        _.each(tutorial.videos, function(video){

          totalSeconds = totalSeconds + video.lengthInSeconds;
          tutorial.totalTime = DatetimeService.getHoursMinutesSeconds({totalSeconds: totalSeconds}).hoursMinutesSeconds;
        });

        var videoToUpdate = _.find(tutorial.videos, function(video){
        return video.id === +req.param('id');
        });

        tutorial.created = DatetimeService.getTimeAgo({date: tutorial.createdAt});

        return res.view('tutorials-detail-video-edit', {
          me: {
            username: user.username,
            gravatarURL: user.gravatarURL,
            admin: user.admin
          },
          tutorial: {
            id: tutorial.id,
            title: tutorial.title,
            description: tutorial.description,
            owner: tutorial.owner.username,
            created: tutorial.created,
            totalTime: tutorial.totalTime,
            video: {
              title: videoToUpdate.title,
              src: videoToUpdate.src,
              hours: DatetimeService.getHoursMinutesSeconds({totalSeconds: videoToUpdate.lengthInSeconds}).hours,
              minutes: DatetimeService.getHoursMinutesSeconds({totalSeconds: videoToUpdate.lengthInSeconds}).minutes,
              seconds: DatetimeService.getHoursMinutesSeconds({totalSeconds: videoToUpdate.lengthInSeconds}).seconds
            }
          }
        });
      });
    });
  }
};