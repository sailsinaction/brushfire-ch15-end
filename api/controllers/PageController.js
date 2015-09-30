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
          email: user.email,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        }
      });
    });
  },

  editProfile: function(req, res) {

    if (!req.session.userId) {
      return res.redirect('/');
    }

    User.findOne(req.session.userId, function(err, user) {
      if (err) {
        console.log('error: ', error);
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

    if (!req.session.userId) {
      return res.redirect('/');
    }

    User.findOne(req.session.userId, function(err, user) {
      if (err) {
        console.log('error: ', error);
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      return res.view('profile', {
        me: {
          email: user.email,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        }
      });
    });
  },

  signin: function(req, res) {
    if (req.session.userId) {
      return res.redirect('/');
    }

    return res.view('signin', {
      me: null
    });
  },

  signup: function(req, res) {
    if (req.session.userId) {
      return res.redirect('/');
    }

    return res.view('signup', {
      me: null
    });
  },

  restoreProfile: function(req, res) {

    if (req.session.userId) {
      return res.redirect('/');
    }

    return res.view('restore-profile', {
      me: null
    });
  },

  administration: function(req, res) {
    if (!req.session.userId) {
      return res.redirect('/');
    }

    User.findOne(req.session.userId, function(err, user) {

      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('homepage');
      }

      if (user.admin) {
        return res.view('administration', {
          me: {
            email: user.email,
            username: user.username,
            gravatarURL: user.gravatarURL,
            admin: user.admin
          }
        });
      } else {
        return res.view('homepage', {
          me: {
            id: user.id,
            email: user.email,
            username: user.username,
            gravatarURL: user.gravatarURL,
            admin: user.admin
          }
        });
      }
    });
  },

  // #1
  passwordRecoveryEmail: function(req, res) {

    if (req.session.userId) {
      return res.redirect('/');
    }

    return res.view('./password-recovery/password-recovery-email', {
      me: null
    });
  },

  // #2
  passwordRecoveryEmailSent: function(req, res) {

    if (req.session.userId) {
      return res.redirect('/');
    }

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


  showTutorialsListPage: function(req, res) {

    // Fake tutorials array
    var tutorials = [{
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sailsinaction',
      createdOn: '2015-09-27T16:32:55.000Z',
      totalTime: '3h 22m',
      stars: '4'
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sailsinaction',
      createdOn: '2015-09-27T16:32:55.000Z',
      totalTime: '3h 22m',
      stars: '4'
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sailsinaction',
      createdOn: '2015-09-27T16:32:55.000Z',
      totalTime: '3h 22m',
      stars: '4'
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sailsinaction',
      createdOn: '2015-09-27T16:32:55.000Z',
      totalTime: '3h 22m',
      stars: '4'
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sailsinaction',
      createdOn: '2015-09-27T16:32:55.000Z',
      totalTime: '3h 22m',
      stars: '4'
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sailsinaction',
      createdOn: '2015-09-27T16:32:55.000Z',
      totalTime: '3h 22m',
      stars: '4'
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sailsinaction',
      createdOn: '2015-09-27T16:32:55.000Z',
      totalTime: '3h 22m',
      stars: '4'
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sailsinaction',
      createdOn: '2015-09-27T16:32:55.000Z',
      totalTime: '3h 22m',
      stars: '4'
    }, {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sailsinaction',
      createdOn: '2015-09-27T16:32:55.000Z',
      totalTime: '3h 22m',
      stars: '4'
    }];

    // If not logged in set `me` property to `null` and pass the fakeTutorialList to the view
    if (!req.session.userId) {
      return res.view('tutorials-list', {
        me: null,
        tutorials: tutorials
      });
    }

    User.findOne(req.session.userId, function(err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('tutorials-list', {
          me: null
        });
      }

      return res.view('tutorials-list', {
        me: {
          email: user.email,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        },
        tutorials: tutorials
      });
    });
  },

  showTutorialsDetailPage: function(req, res) {

    // Fake tutorials detail dictionaryarray
    var fakeTutorialsDetail = {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sailsinaction',
      createdOn: '2015-09-27T16:32:55.000Z',
      totalTime: '3h 22m',
      stars: '4',
      videos: [{
        title: 'Tation libris prodesset nam id. Qui no epicuri oportere. Tritani delicata vix eu.',
        duration: '10m 43s'
      }, {
        title: 'Tation libris prodesset nam id. Qui no epicuri oportere. Tritani delicata vix eu.',
        duration: '10m 43s'
      }, {
        title: 'Tation libris prodesset nam id. Qui no epicuri oportere. Tritani delicata vix eu.',
        duration: '10m 43s'
      }, {
        title: 'Tation libris prodesset nam id. Qui no epicuri oportere. Tritani delicata vix eu.',
        duration: '10m 43s'
      }, {
        title: 'Tation libris prodesset nam id. Qui no epicuri oportere. Tritani delicata vix eu.',
        duration: '10m 43s'
      }, {
        title: 'Tation libris prodesset nam id. Qui no epicuri oportere. Tritani delicata vix eu.',
        duration: '10m 43s'
      }, {
        title: 'Tation libris prodesset nam id. Qui no epicuri oportere. Tritani delicata vix eu.',
        duration: '10m 43s'
      }, {
        title: 'Tation libris prodesset nam id. Qui no epicuri oportere. Tritani delicata vix eu.',
        duration: '10m 43s'
      }, {
        title: 'Tation libris prodesset nam id. Qui no epicuri oportere. Tritani delicata vix eu.',
        duration: '10m 43s'
      }, {
        title: 'Tation libris prodesset nam id. Qui no epicuri oportere. Tritani delicata vix eu.',
        duration: '10m 43s'
      }, {
        title: 'Tation libris prodesset nam id. Qui no epicuri oportere. Tritani delicata vix eu.',
        duration: '10m 43s'
      }, {
        title: 'Tation libris prodesset nam id. Qui no epicuri oportere. Tritani delicata vix eu.',
        duration: '10m 43s'
      }, {
        title: 'Tation libris prodesset nam id. Qui no epicuri oportere. Tritani delicata vix eu.',
        duration: '10m 43s'
      }, {
        title: 'Tation libris prodesset nam id. Qui no epicuri oportere. Tritani delicata vix eu.',
        duration: '10m 43s'
      }, {
        title: 'Tation libris prodesset nam id. Qui no epicuri oportere. Tritani delicata vix eu.',
        duration: '10m 43s'
      }, {
        title: 'Tation libris prodesset nam id. Qui no epicuri oportere. Tritani delicata vix eu.',
        duration: '10m 43s'
      }, {
        title: 'Tation libris prodesset nam id. Qui no epicuri oportere. Tritani delicata vix eu.',
        duration: '10m 43s'
      }]
    };

    // If not logged in set `me` property to `null` and pass the fakeTutorialList to the view
    if (!req.session.userId) {
      return res.view('tutorials-detail', {
        me: null,
        fakeTutorialsDetail: fakeTutorialsDetail
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

      return res.view('tutorials-detail', {
        me: {
          email: user.email,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        },
        fakeTutorialsDetail: fakeTutorialsDetail
      });
    });
  },
  showTutorialsDetailsVideoNewPage: function(req, res) {

    var fakeTutorialsDetail = {
      title: 'Sed ut perspiciatis unde omnis',
      description: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea.',
      owner: 'sailsinaction',
      createdOn: '2015-09-27T16:32:55.000Z',
      totalTime: '3h 22m',
      stars: '4'
    }

    // If not logged in set `me` property to `null` and pass the fakeTutorialList to the view
    if (!req.session.userId) {
      return res.view('tutorials-detail-video-new', {
        me: null,
        fakeTutorialsDetail: fakeTutorialsDetail
      });
    }

    User.findOne(req.session.userId, function(err, user) {
      if (err) {
        return res.negotiate(err);
      }

      if (!user) {
        sails.log.verbose('Session refers to a user who no longer exists- did you delete a user, then try to refresh the page with an open tab logged-in as that user?');
        return res.view('tutorials-detail-video-new', {
          me: null
        });
      }

      return res.view('tutorials-detail-video-new', {
        me: {
          email: user.email,
          gravatarURL: user.gravatarURL,
          admin: user.admin
        },
        fakeTutorialsDetail: fakeTutorialsDetail
      });
    });
  }
};
