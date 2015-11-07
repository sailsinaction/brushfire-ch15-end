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
        owner: { username: foundUser.username},
        // videos: []
      }).exec(function(err, createdTutorial){
        if (err) return res.negotiate(err);

        // Update the user to contain the new tutorial
        foundUser.tutorials = [];
        foundUser.tutorials.push({
          title: req.param('title'),
          description: req.param('description'),
          created: foundUser.createdAt,
          updated: foundUser.updatedAt,
          id: foundUser.id
        });
        User.update({id: req.session.userId})
        .set({tutorials: foundUser.tutorials})
        .exec(function(err){
          if (err) return res.negotiate(err);

          // return the new tutorial id
          return res.json({id: createdTutorial.id});
        });
      });
    });
  },

  addVideo: function(req, res) {

    return res.ok();
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

    return res.ok();
  },

  deleteTutorial: function(req, res) {
   
    if (!req.session.userId) {
      return res.redirect('/');
    }

    User.findOne({id: req.session.userId}).exec(function(err, foundUser){
      if (err) {
        return res.negotiate(err);
      }

      if (!foundUser) {
        return res.notFound();
      }

      // Return the username of the user using the userId of the session.
      return res.json({username: foundUser.username});
      
    });
  },

  removeVideo: function(req, res) {

      return res.ok();
  },

  showVideo: function(req, res) {

    // Simulating a found video
    var video = {
      id: 34,
      title: 'Crockford on JavaScript - Volume 1: The Early Years',
      src: 'https://www.youtube.com/embed/JxAXlJEmNMg'
    };

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
  }
};

