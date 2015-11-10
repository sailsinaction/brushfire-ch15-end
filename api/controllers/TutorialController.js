/**
 * TutorialController
 *
 * @description :: Server-side logic for managing tutorial
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  searchTutorials: function(req, res) {

    var tutorials = [{
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 1,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 2,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 3
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 3,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 5
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 4,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 1
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 5,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 5
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 6,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 2
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 7,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 8,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 5
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 9,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 10,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }];

    console.log('skip: ', req.param('skip'));


    return res.json({
      options: {
        totalTutorials: 30,
        updatedTutorials: tutorials
      }
    });
  },

  browseTutorials: function(req, res) {

    var tutorials = [{
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 1,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 2,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 3
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 3,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 5
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 4,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 1
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 5,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 5
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 6,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 2
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 7,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 8,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 5
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 9,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sails-in-action',
      id: 10,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }];

    console.log('skip: ', req.param('skip'));

    return res.json({
      options: {
        totalTutorials: 30,
        updatedTutorials: tutorials
      }
    });
  },

  myRating: function(req, res) {

    return res.json({
      myRating: null
    });
  },

  rateTutorial: function(req, res) {

    return res.ok();
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

    Tutorial.findOne({
      id: req.param('tutorialId')
    }).exec(function(err, foundTutorial){
      if (err) return res.negotiate(err);
      if (!foundTutorial) return res.notFound();

      Video.create({
        title: req.param('title'),
        src: req.param('src'),
        lengthInSeconds: req.param('hours') * 60 * 60 + req.param('minutes') * 60 + req.param('seconds')
      }).exec(function (err, createdVideo) {
        if (err) return res.negotiate(err);

        foundTutorial.videos.add(createdVideo.id);
        foundTutorial.save(function (err) {
          if (err) return res.negotiate(err);

          console.log('foundTutorial: ', foundTutorial);

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
          // console.log('Updating user record with new tutorials array:',tutorials);
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

      // Remove the to be deleted tutorial from the user tutorials collection
      foundUser.tutorials.remove(req.param('id'));
      foundUser.save(function (err){
        if (err) return res.negotiate(err);
      });

      // Destroy the tutorial
      Tutorial.destroy({
        id: req.param('id')
      }).exec(function(err){
        if (err) return res.negotiate(err);

        // Return the username of the user using the userId of the session.
        return res.json({username: foundUser.username});
      });
    });
  },

  removeVideo: function(req, res) {

    Video.findOne({
      id: req.param('id')
    })
    .populate('tutorialAssoc')
    .exec(function(err, video){
      if (err) return res.negotiate(err);
      if (!video) return res.notFound();

      Tutorial.findOne({
        id: video.tutorialAssoc.id
      })
      .populate('videos')
      .exec(function(err, tutorial){

        var videoToUpdate = _.find(tutorial.videos, function(video){
          return video.id === +req.param('id');
        });

        tutorial.videos.remove(videoToUpdate.id);
        tutorial.save(function(err){
          if (err) return res.negotiate(err);
          
          Video.destroy({
            id: req.param('id')
          }).exec(function(err){
            if (err) return res.negotiate(err);
        
            return res.ok();
          });
        });
      });
    });
  },

  showVideo: function(req, res) {

    // Simulating a found video
    // var video = {
    //   id: 34,
    //   title: 'Crockford on JavaScript - Volume 1: The Early Years',
    //   src: 'https://www.youtube.com/embed/JxAXlJEmNMg'
    //   1:42:08
    // };
    

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

