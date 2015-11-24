/**
 * Given some fixtures, bootstrap the data.
 */

var async = require('async');
var Passwords = require('machinepack-passwords');
var Gravatar = require('machinepack-gravatar');
var FIXTURES = require('./data');

module.exports = function(cb) {

  // Keep a mapping of ratings, these can't be created until all the users have
  // been bootstrapped.
  var RATINGS = {};

  // For each fixture, save the data into the database
  function createUserFromFixture (data, nextUser) {

    async.auto({

      // Create the user record
      createUser: function(next) {
        var userData = _.omit(data, ['tutorials']);

        async.parallel([
          function encryptPassword(next) {
            Passwords.encryptPassword({
              password: userData.password,
            }).exec(next);
          },
          function gravatar(next) {
            Gravatar.getImageUrl({
              emailAddress: userData.email
            }).exec(next);
          }
        ],

        function(err, results) {
          if(err) return next(err);

          userData.encryptedPassword = results[0];
          userData.gravatarURL = results[1];

          // Create the user
          User.create(userData).exec(next);
        });
      },

      // Create the tutorial records for the user
      createTutorials: ['createUser', function(next, results) {
        var user = results.createUser;
        var tutorials = data.tutorials;

        // Store a mapping of tutorial id's with videos
        var mapping = {};

        function createTutorial(tutorial, nextTutorial) {
          var videos = tutorial.videos;
          var tutorialData = _.omit(tutorial, ['videos', 'ratings']);
          tutorialData.owner = user.id;

          Tutorial.create(tutorialData).exec(function(err, tut) {
            if(err) return nextTutorial(err);

            // Record the mapping
            mapping[tut.id] = videos;

            // If there are any ratings, map the username and the video id.
            _.each(tutorial.ratings, function(rating) {
              var ratingsData = RATINGS[rating.user] || [];
              ratingsData.push({ tutorial: tut.id, stars: rating.stars });
              RATINGS[rating.user] = ratingsData;
            });

            // Add the tutorial to the user (for use when via-less is being used)
            user.tutorials.add(tut.id);
            user.save(nextTutorial);
          });
        }

        async.eachSeries(tutorials, createTutorial, function(err) {
          if(err) return next(err);
          next(null, mapping);
        });
      }],

      // Create the video records
      createVideos: ['createTutorials', function(next, results) {
        var mapping = results.createTutorials;

        // For each tutorial, create the videos to associate with it
        function processTutorials(tutorialId, nextTutorial) {
          var ordering = [];

          async.eachSeries(mapping[tutorialId], function(video, nextVideo) {
            var ratings = video.ratings;
            var videoData = _.omit(video, ['ratings']);
            videoData.tutorialAssoc = tutorialId;

            Video.create(videoData).exec(function(err, record) {
              if(err) return nextVideo(err);
              ordering.push(record.id);
              nextVideo();
            });
          },

          function(err) {
            if(err) return nextTutorial(err);

            async.series([
              // Set videoOrder on the tutorial record
              function setOrdering(next) {
                Tutorial.update({ id: tutorialId })
                .set({ videoOrder: ordering })
                .exec(next);
              },
              // Link the videos in case via-less associations are being used
              function linkVideos(next) {
                Tutorial.findOne({ id: tutorialId }).exec(function(err, tutorial) {
                  if(err) return next(err);
                  if(!tutorial) return next(404);

                  _.each(ordering, function(order) {
                    tutorial.videos.add(order);
                  });

                  tutorial.save(next);
                });
              }
            ], nextTutorial);
          });

        }

        async.each(_.keys(mapping), processTutorials, next);
      }]

    }, nextUser);

  }

  async.each(FIXTURES, createUserFromFixture, function(err) {
    if(err) return cb(err);

    // Use the ratings mapping now that all the data is created to bootstrap them.
    function bootstrapRatings(username, nextUser) {
      User.findOne({ username: username }).exec(function(err, user) {
        if(err) return nextUser(err);
        if(!user) return nextUser(404);

        async.each(RATINGS[username], function(rating, nextRating) {
          Rating.create({ stars: rating.stars, byUser: user.id, byTutorial: rating.tutorial })
          .exec(nextRating);
        }, nextUser);
      });
    }

    async.each(_.keys(RATINGS), bootstrapRatings, cb);
  });
};