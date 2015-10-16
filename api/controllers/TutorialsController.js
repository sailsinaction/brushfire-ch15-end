/**
 * TutorialsController
 *
 * @description :: Server-side logic for managing tutorials
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  searchTutorials: function(req, res) {

    var tutorials = [{
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sails-in-action',
      id: 1,
      createdAt: '2015-09-27T16:32:55.000Z',
      updatedAt: '2015-10-07T14:57:12.000Z',
      totalTime: '3h 22m',
      stars: 4
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sails-in-action',
      id: 2,
      createdAt: '2015-09-27T16:32:55.000Z',
      updatedAt: '2015-10-07T14:57:12.000Z',
      totalTime: '3h 22m',
      stars: 3
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sails-in-action',
      id: 3,
      createdAt: '2015-09-27T16:32:55.000Z',
      updatedAt: '2015-10-07T14:57:12.000Z',
      totalTime: '3h 22m',
      stars: 5
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sails-in-action',
      id: 4,
      createdAt: '2015-09-27T16:32:55.000Z',
      updatedAt: '2015-10-07T14:57:12.000Z',
      totalTime: '3h 22m',
      stars: 1
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sails-in-action',
      id: 5,
      createdAt: '2015-09-27T16:32:55.000Z',
      updatedAt: '2015-10-07T14:57:12.000Z',
      totalTime: '3h 22m',
      stars: 5
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sails-in-action',
      id: 6,
      createdAt: '2015-09-27T16:32:55.000Z',
      updatedAt: '2015-10-07T14:57:12.000Z',
      totalTime: '3h 22m',
      stars: 2
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sails-in-action',
      id: 7,
      createdAt: '2015-09-27T16:32:55.000Z',
      updatedAt: '2015-10-07T14:57:12.000Z',
      totalTime: '3h 22m',
      stars: 4
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sails-in-action',
      id: 8,
      createdAt: '2015-09-27T16:32:55.000Z',
      updatedAt: '2015-10-07T14:57:12.000Z',
      totalTime: '3h 22m',
      stars: 5
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sails-in-action',
      id: 9,
      createdAt: '2015-09-27T16:32:55.000Z',
      updatedAt: '2015-10-07T14:57:12.000Z',
      totalTime: '3h 22m',
      stars: 4
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sails-in-action',
      id: 10,
      createdAt: '2015-09-27T16:32:55.000Z',
      updatedAt: '2015-10-07T14:57:12.000Z',
      totalTime: '3h 22m',
      stars: 4
    }];

    console.log('skip: ', req.param('skip'));

    // Format the date the Tutorial was created into time ago (e.g. 10 days ago)
    var Datetime = require('machinepack-datetime');

    var updatedTutorials = _.map(tutorials, function(tutorial) {});

    var options = {
      totalTutorials: 30,
      updatedTutorials: updatedTutorials
    };

    return res.json({
      options: options
    });
  },

  browseTutorials: function(req, res) {

    var tutorials = [{
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sails-in-action',
      id: 1,
      createdAt: '2015-09-27T16:32:55.000Z',
      updatedAt: '2015-10-07T14:57:12.000Z',
      totalTime: '3h 22m',
      stars: 4
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sails-in-action',
      id: 2,
      createdAt: '2015-09-27T16:32:55.000Z',
      updatedAt: '2015-10-07T14:57:12.000Z',
      totalTime: '3h 22m',
      stars: 3
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sails-in-action',
      id: 3,
      createdAt: '2015-09-27T16:32:55.000Z',
      updatedAt: '2015-10-07T14:57:12.000Z',
      totalTime: '3h 22m',
      stars: 5
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sails-in-action',
      id: 4,
      createdAt: '2015-09-27T16:32:55.000Z',
      updatedAt: '2015-10-07T14:57:12.000Z',
      totalTime: '3h 22m',
      stars: 1
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sails-in-action',
      id: 5,
      createdAt: '2015-09-27T16:32:55.000Z',
      updatedAt: '2015-10-07T14:57:12.000Z',
      totalTime: '3h 22m',
      stars: 5
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sails-in-action',
      id: 6,
      createdAt: '2015-09-27T16:32:55.000Z',
      updatedAt: '2015-10-07T14:57:12.000Z',
      totalTime: '3h 22m',
      stars: 2
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sails-in-action',
      id: 7,
      createdAt: '2015-09-27T16:32:55.000Z',
      updatedAt: '2015-10-07T14:57:12.000Z',
      totalTime: '3h 22m',
      stars: 4
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sails-in-action',
      id: 8,
      createdAt: '2015-09-27T16:32:55.000Z',
      updatedAt: '2015-10-07T14:57:12.000Z',
      totalTime: '3h 22m',
      stars: 5
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sails-in-action',
      id: 9,
      createdAt: '2015-09-27T16:32:55.000Z',
      updatedAt: '2015-10-07T14:57:12.000Z',
      totalTime: '3h 22m',
      stars: 4
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sails-in-action',
      id: 10,
      createdAt: '2015-09-27T16:32:55.000Z',
      updatedAt: '2015-10-07T14:57:12.000Z',
      totalTime: '3h 22m',
      stars: 4
    }];

    console.log('skip: ', req.param('skip'));

    // Format the date the Tutorial was created into time ago (e.g. 10 days ago)
    var Datetime = require('machinepack-datetime');

    var updatedTutorials = _.map(tutorials, function(tutorial) {

      var niceTimeAgoString = Datetime.timeFrom({
        toWhen: Datetime.parse({
          datetime: tutorial.createdAt
        }).execSync(),
        fromWhen: new Date().getTime()
      }).execSync();

      tutorial.createdAt = niceTimeAgoString;
      return tutorial;
    });

    var options = {
      totalTutorials: 30,
      updatedTutorials: updatedTutorials
    };

    return res.json({
      options: options
    });
  },

  rateTutorial: function(req, res) {

    User.findOne(req.session.userId, function(err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.redirect('/');
      }

      if (user.username === tutorial.owner) {

        return res.forbidden();
      }

      return res.json({
        rating: req.param('rating'),
        id: req.param('id')
      });
    });
  },

  create: function(req, res) {

    // Create a tutorial record using `username`, `title`, and `description`

    // Pass back the `id` of the new record, simulate `1` for now.
    return res.json({
      id: '1'
    });
  },

  addVideo: function(req, res) {

    User.findOne(req.session.userId, function(err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.redirect('/');
      }

      if (user.username !== tutorial.owner) {

        return res.forbidden();
      }

      var options = {
        tutorialId: req.param('id'),
        title: req.param('title'),
        src: req.param('src'),
        minutes: req.param('minutes'),
        seconds: req.param('seconds')
      };

      return res.json({
        video: options
      });
    });
  },

  update: function(req, res) {

    console.log('tutorial id: ', req.param('id'));

    User.findOne(req.session.userId, function(err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.redirect('/');
      }

      if (user.username !== tutorial.owner) {

        return res.forbidden();
      }

      var options = {
        id: req.param('id'),
        title: req.param('title'),
        description: req.param('description')
      };

      return res.json({
        tutorial: options
      });
    });
  },

  updateVideo: function(req, res) {

    console.log('id: ', req.param('id'));

    User.findOne(req.session.userId, function(err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.redirect('/');
      }

      if (user.username !== tutorial.owner) {

        return res.forbidden();
      }

      var options = {
        id: req.param('id'),
        title: req.param('title'),
        src: req.param('src'),
        minutes: req.param('minutes'),
        seconds: req.param('seconds')
      };

      return res.json({
        video: options
      });
    });
  },

  deleteTutorial: function(req, res) {

    console.log('id: ', req.param('id'));

    // TODO: Look-up the tutorial `id` and pass back the username.

    User.findOne(req.session.userId, function(err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.redirect('/');
      }

      if (user.username !== tutorial.owner) {

        return res.forbidden();
      }

      return res.json({
        username: 'sails-in-action'
      });
    });
  },

  removeVideo: function(req, res) {

    console.log('id: ', req.param('id'));

    User.findOne(req.session.userId, function(err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.redirect('/');
      }

      if (user.username !== tutorial.owner) {

        return res.forbidden();
      }

      return res.ok();
    });
  }

};