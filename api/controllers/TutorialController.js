/**
 * TutorialController
 *
 * @description :: Server-side logic for managing tutorial
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  searchTutorials: function(req, res) {

    Tutorial.count().exec(function(err, found){
      if (err) return res.negotiate(err);
      if (!found) return res.notFound();

      Tutorial.find({
        or : [
          {
            title: {
              'contains': req.param('searchCriteria')
            },
          },
          {
            description: {
              'contains': req.param('searchCriteria')
            }
          }
        ],
        limit: 10,
        skip: req.param('skip')
      })
      .populate('owner')
      .populate('ratings')
      .populate('videos')
      .exec(function(err, tutorials){

        _.each(tutorials, function(tutorial){

          tutorial.owner = tutorial.owner.username;
          tutorial.created = DatetimeService.getTimeAgo({date: tutorial.createdAt});

          var totalSeconds = 0;
          _.each(tutorial.videos, function(video){

            // Total the number of seconds for all videos for tutorial total time
            totalSeconds = totalSeconds + video.lengthInSeconds;

            tutorial.totalTime = DatetimeService.getHoursMinutesSeconds({totalSeconds: totalSeconds}).hoursMinutesSeconds;

            // Format average ratings
            var totalRating = 0;
            _.each(tutorial.ratings, function(rating){
              totalRating = totalRating + rating.stars;
            });

            var averageRating = 0;
            if (tutorial.ratings.length < 1) {
              averageRating = 0;
            } else {
              averageRating = totalRating / tutorial.ratings.length;
            }
            
            tutorial.averageRating = averageRating;
          });
        });

        return res.json({
          options: {
            totalTutorials: found,
            updatedTutorials: tutorials
          }
        });
      });
    });
    // .exec(function(err, tutorials){

    //   console.log('tutorials', tutorials);

    //   return res.json({
    //     options: {
    //       totalTutorials: 30,
    //       updatedTutorials: tutorials
    //     }
    //   });
    // });
  },

  browseTutorials: function(req, res) {
    
    Tutorial.count().exec(function(err, found){
      if (err) return res.negotiate(err);
      if (!found) return res.notFound();

      Tutorial.find({ limit: 10, skip: req.param('skip')})
      .populate('owner')
      .populate('ratings')
      .populate('videos')
      .exec(function(err, tutorials){

        _.each(tutorials, function(tutorial){

          tutorial.owner = tutorial.owner.username;
          tutorial.created = DatetimeService.getTimeAgo({date: tutorial.createdAt});

          var totalSeconds = 0;
          _.each(tutorial.videos, function(video){

            // Total the number of seconds for all videos for tutorial total time
            totalSeconds = totalSeconds + video.lengthInSeconds;

            tutorial.totalTime = DatetimeService.getHoursMinutesSeconds({totalSeconds: totalSeconds}).hoursMinutesSeconds;

            // Format average ratings
            var totalRating = 0;
            _.each(tutorial.ratings, function(rating){
              totalRating = totalRating + rating.stars;
            });

            var averageRating = 0;
            if (tutorial.ratings.length < 1) {
              averageRating = 0;
            } else {
              averageRating = totalRating / tutorial.ratings.length;
            }
            
            tutorial.averageRating = averageRating;
          });
        });

        return res.json({
          options: {
            totalTutorials: found,
            updatedTutorials: tutorials
          }
        });
      });
    });
  },

  myRating: function(req, res) {

    Rating.findOne({
      user: req.session.userId,
      tutorial: req.param('id')
    }).exec(function(err, foundRating){
      if (err) return res.negotiate(err);
      if (!foundRating) return res.notFound();

      res.json({
        rating: foundRating.stars
      });
    });
  },

  averageRating: function(req, res) {

    Tutorial.findOne({
      id: req.param('id')
    })
    .populate('ratings')
    .exec(function(err, foundTutorial){

      var totalRating = 0;
      _.each(foundTutorial.ratings, function(rating){
        totalRating = totalRating + rating.stars;
      });

      var averageStars = 0;

      averageStars = totalRating / foundTutorial.ratings.length;

      return res.json({
        averageStars: averageStars
      });
    });
  },

  rateTutorial: function(req, res) {

    // Find the currently authenticated user
    User.findOne({
      id: req.session.userId
    }).exec(function(err, foundUser){
      if (err) return res.negotiate(err);
      if (!foundUser) return res.notFound();

      // Find the tutorial whose being rated
      Tutorial.findOne({
        id: req.param('id')
      })
      .populate('ratings')
      .exec(function(err, foundTutorial){
        if (err) return res.negotiate(err);
        if (!foundTutorial) return res.notFound();

        // Find the rating, if any, of the tutorial from the currently logged in user.
        Rating.findOne({
          user: foundUser.id,
          tutorial: foundTutorial.id
        }).exec(function(err, foundRating){
          if (err) return res.negotiate(err);

          // If the currently authenticated user-agent (user) has already rated this tutorial
          // update it with the new rating.
          if (foundRating) {

            Rating.update({
              id: foundRating.id
            }).set({
              stars: req.param('stars')
            }).exec(function(err, updatedRating){
              if (err) return res.negotiate(err);
              if (!updatedRating) return res.notFound();

              // Iterate over the ratings and remove the old rating from the current user 
              _.each(foundTutorial.ratings, function(rating){

                if (rating) {
                  // Find the old rating from this user
                  if (rating.id === foundRating.id) {

                    // Remove the old rating
                    _.remove(foundTutorial.ratings, function(rating){
                      return rating.id === foundRating.id;
                    });
                  } else {
                    return;
                  }
                }
              });

              // Add the updated rating to the tutorial
              foundTutorial.ratings.push(updatedRating[0]);

              console.log('foundTutorial.ratings after push: ', foundTutorial.ratings);

              // Get the average of all ratings with the updated rating
              var sumTutorialRatings = 0;

              // Total the number of ratings for the Tutorial
              _.each(foundTutorial.ratings, function(rating){

                sumTutorialRatings = sumTutorialRatings + rating.stars;
              });

              // Assign the average to the tutorial
              foundTutorial.averageRating = Math.floor(sumTutorialRatings / foundTutorial.ratings.length);

              return res.json({
                averageRating: foundTutorial.averageRating
              });
            });
          } else {

            Rating.create({
              stars: req.param('stars'),
              user: foundUser.id,
              tutorial: foundTutorial.id
            }).exec(function(err, createdRating){
              if (err) return res.negotiate(err);
              if (!createdRating) return res.notFound();

              // Add the updated rating to the tutorial
              foundTutorial.ratings.push(createdRating);

              console.log('foundTutorial.ratings after push: ', foundTutorial.ratings);

              // Get the average of all ratings with the updated rating
              var sumTutorialRatings = 0;

              // Total the number of ratings for the Tutorial
              _.each(foundTutorial.ratings, function(rating){

                sumTutorialRatings = sumTutorialRatings + rating.stars;
              });

              // Assign the average to the tutorial
              foundTutorial.averageRating = sumTutorialRatings / foundTutorial.ratings.length;

              console.log('foundTutorial.averageRating', foundTutorial.averageRating);

              return res.json({
                averageRating: foundTutorial.averageRating
              });
            });
          }
        });
      });
    });
  },

  createTutorial: function(req, res) {

    // Validate parameters
    if (!_.isString(req.param('title'))) {
      return res.badRequest();
    }

    if (!_.isString(req.param('description'))) {
      return res.badRequest();
    }

    // TODO Need policy to prevent those not authenticated from creating a tutorial.

    // Find the user that we're adding a tutorial to
    User.findOne({
      id: req.session.userId
    }).exec(function(err, foundUser){
      if (err) return res.negotiate;
      if (!foundUser) return res.notFound();

      // Create the new tutorial in the tutorial model
      Tutorial.create({
        title: req.param('title'),
        description: req.param('description'),
        owner: foundUser.id,
        videoOrder: [],
        // videos: []
      }).exec(function(err, createdTutorial){
        if (err) return res.negotiate(err);

        // Update the user to contain the new tutorial
        foundUser.tutorials.add(createdTutorial.id);
        // Then persist back to the database.
        foundUser.save(function (err) {
          if (err) return res.negotiate(err);
          
          // return the new tutorial id
          return res.json({id: createdTutorial.id});
        });

        // // Update the user to contain the new tutorial
        // foundUser.tutorials = [];
        // foundUser.tutorials.push({
        //   title: req.param('title'),
        //   description: req.param('description'),
        //   created: foundUser.createdAt,
        //   updated: foundUser.updatedAt,
        //   id: foundUser.id
        // });
        // User.update({id: req.session.userId})
        // .set({tutorials: foundUser.tutorials})
        // .exec(function(err){
        //   if (err) return res.negotiate(err);

        //   // return the new tutorial id
        //   return res.json({id: createdTutorial.id});
        // });
      });
    });
  },

  addVideo: function(req, res) {

    // Validate parameters
    if (!_.isNumber(req.param('hours')) || !_.isNumber(req.param('minutes')) || !_.isNumber(req.param('seconds'))) {
      return res.badRequest();
    }
    if (!_.isString(req.param('src')) || !_.isString(req.param('title'))) {
      return res.badRequest();
    }

    // Look up the tutorial record.
    Tutorial.findOne({
      id: req.param('tutorialId')
    }).exec(function(err, foundTutorial){
      if (err) return res.negotiate(err);
      if (!foundTutorial) return res.notFound();

      // Create the video record.
      Video.create({
        title: req.param('title'),
        src: req.param('src'),
        lengthInSeconds: req.param('hours') * 60 * 60 + req.param('minutes') * 60 + req.param('seconds')
      }).exec(function (err, createdVideo) {
        if (err) return res.negotiate(err);

        // Add a reference to the new video inside the tutorial record.
        foundTutorial.videos.add(createdVideo.id);

        // Modify the `videoOrder` array embedded in our tutorial to reflect the new video.
        // (We always add new videos to the bottom of the list)
        foundTutorial.videoOrder.push(createdVideo.id);

        // Persist (save) our changes to the tutorial record back to the database.
        foundTutorial.save(function (err) {
          if (err) return res.negotiate(err);

          return res.ok();
        });
      });
    });
  },

  updateTutorial: function(req, res) {

    // Validate parameters
    if (!_.isString(req.param('title'))) {
      return res.badRequest();
    }

    if (!_.isString(req.param('description'))) {
      return res.badRequest();
    }

    // Update the tutorial coercing the incoming id from a string to an integer using the unary `+` 
    Tutorial.update({
      id: +req.param('id')
    }).set({
      title: req.param('title'),
      description: req.param('description')
    }).exec(function (err) {
      if (err) return res.negotiate(err);

      // Propagate updates to embedded (i.e. cached) arrays of tutorials on our user records.
      User.find().exec(function (err, users) {
        if (err) { return res.negotiate(err); }

        async.each(users, function (user, next){

          // If this user does not have the tutorial that is being updated,
          // move on to the next user.
          var cachedTutorial = _.find(user.tutorials, { id: +req.param('id') });

          // Otherwise, keep move on to the next user.
          if (!cachedTutorial) {
            return next();
          }

          // Otherwise, this user has the cached version of our tutorial.
          // So we'll change the `tutorials` array and save it back to the db.
          cachedTutorial.title = req.param('title');
          cachedTutorial.description = req.param('description');
          
          User.update({
            id: user.id
          }).set({
            tutorials: user.tutorials
          }).exec(function (err) {
            if (err) { return next(err); }
            return next();
          });
        }, function (err) {
          if (err) {return res.negotiate(err);}
          return res.ok();
        });
      });
    });
  },

  updateVideo: function(req, res) {

    if (!_.isString(req.param('title'))) {
      return res.badRequest();
    }

    if (!_.isString(req.param('src'))) {
      return res.badRequest();
    }

    var hours = +req.param('hours');
    var minutes = +req.param('minutes');
    var seconds = +req.param('seconds');

    var convertedToSeconds = hours * 60 * 60 + minutes * 60 + seconds;

    Video.update({
      id: req.param('id')
    }).set({
      title: req.param('title'),
      src: req.param('src'),
      lengthInSeconds: convertedToSeconds
    }).exec(function (err, updatedUser){
      if (err) return res.negotiate(err);
      if (!updatedUser) return res.notFound();

      return res.ok();
    });
  },

  deleteTutorial: function(req, res) {
   
    if (!req.session.userId) {
      return res.redirect('/');
    }

    // Find the currently logged in user and it's tutorials
    User.findOne({id: req.session.userId})
    .populate('tutorials')
    .exec(function(err, foundUser){
      if (err) {
        return res.negotiate(err);
      }

      if (!foundUser) {
        return res.notFound();
      }

      // Remove the to-be-deleted tutorial from the owner's `tutorials` collection
      foundUser.tutorials.remove(req.param('id'));
      foundUser.save(function (err){
        if (err) return res.negotiate(err);
      });

      // Destroy the tutorial
      Tutorial.destroy({
        id: req.param('id')
      }).exec(function(err){
        if (err) return res.negotiate(err);

        // TODO: destroy videos
        // TODO: destroy ratings

        // Return the username of the user using the userId of the session.
        return res.json({username: foundUser.username});
      });
    });
  },

  removeVideo: function(req, res) {

    Video.findOne({
      id: +req.param('id')
    })
    .populate('tutorialAssoc') // consider renaming this association to `partOfTutorial`
    .exec(function(err, video){
      if (err) return res.negotiate(err);
      if (!video) return res.notFound();


      // Now look up the tutorial record on its own... even though we already have it
      // (this is purely so that we can call remove()-- but I don't think we have to)
      // 
      // TODO: could we just do:
      // ```
      // video.tutorialAssoc.videos.remove(...)
      // video.tutorialAssoc.save(...)
      // ```
      // ?
      Tutorial.findOne({
        id: video.tutorialAssoc.id
      })
      .exec(function(err, tutorial){
        if (err) return res.negotiate(err);
        if (!tutorial) return res.notFound();

        // Remove the reference to this video from our tutorial record.
        tutorial.videos.remove(+req.param('id'));
        // Remove this video id from the `videoOrder` array
        tutorial.videoOrder = _.without(tutorial.videoOrder, +req.param('id'));
        // Persist our tutorial back to the database.
        tutorial.save(function(err){
          if (err) return res.negotiate(err);
          
          Video.destroy({
            id: +req.param('id')
          }).exec(function(err){
            if (err) return res.negotiate(err);
        
            return res.ok();
          });
        });
      });
    });
  },

  showVideo: function(req, res) {

    Video.findOne({
      id: req.param('id')
    }).exec(function(err, video){

      if (!req.session.userId) {
        return res.view('show-video', {
          me: null,
          video: video,
          tutorialId: req.param('tutorialId')
        });
      }

      User.findOne(req.session.userId, function(err, user) {
        if (err) {
          return res.negotiate(err);
        }

        if (!user) {
          sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
          return res.view('show-video', {
            me: null,
            video: video,
          tutorialId: req.param('tutorialId')
          });
        }

        return res.view('show-video', {
          me: {
            username: user.username,
            gravatarURL: user.gravatarURL,
            admin: user.admin
          },
          video: video,
          tutorialId: req.param('tutorialId')
        });
      });
    });
  }
};

