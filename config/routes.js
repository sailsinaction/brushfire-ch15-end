/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
   * etc. depending on your default view engine) your home page.              *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  /*************************************************************
  * JSON API                                                  *
  *************************************************************/

  'PUT /login': 'UserController.login',
  'GET /logout': 'UserController.logout',

  // added in chapter 10
  // 'GET /video': 'VideoController.find',
  // 'POST /video': 'VideoController.create',
  'POST /user/signup': 'UserController.signup',
  'PUT /user/remove-profile': 'UserController.removeProfile',
  'PUT /user/restore-profile': 'UserController.restoreProfile',
  'PUT /user/restore-gravatar-URL': 'UserController.restoreGravatarURL',
  'PUT /user/update-profile': 'UserController.updateProfile',
  'PUT /user/change-password': 'UserController.changePassword',
  'GET /user/admin-users': 'UserController.adminUsers',
  'PUT /user/update-admin/:id': 'UserController.updateAdmin',
  'PUT /user/update-banned/:id': 'UserController.updateBanned',
  'PUT /user/update-deleted/:id': 'UserController.updateDeleted',
  'PUT /user/generate-recovery-email': 'UserController.generateRecoveryEmail',
  'PUT /user/reset-password': 'UserController.resetPassword',

  'POST /tutorials': 'TutorialsController.create',
  'POST /tutorials/:id/videos': 'TutorialsController.addVideo',
  'PUT /tutorials/:id': 'TutorialsController.update',
  'PUT /tutorials/:id/videos/:id': 'TutorialsController.updateVideo',
  'PUT /tutorials/:id/rate': 'TutorialsController.rateTutorial',
  'DELETE /tutorials/:id': 'TutorialsController.deleteTutorial',
  'DELETE /videos/:id': 'TutorialsController.removeVideo',

  /*************************************************************
  * Server Rendered HTML Pages                                *
  *************************************************************/

  'GET /': 'PageController.home',
  'GET /profile/edit': 'PageController.editProfile',
  'GET /profile/restore': 'PageController.restoreProfile',
  'GET /signin': 'PageController.signin',
  'GET /signup': 'PageController.signup',
  'GET /administration': 'PageController.administration',

  'GET /password-recovery-email': 'PageController.passwordRecoveryEmail',
  'GET /password-recovery-email-sent': 'PageController.passwordRecoveryEmailSent',  
  'GET /password-reset-form/:passwordRecoveryToken': 'PageController.passwordReset',
  
  'GET /tutorials/search': 'TutorialsController.searchTutorials',

  'GET /tutorials/browse': 'TutorialsController.browseTutorials',

  'GET /tutorials/browse-page': 'PageController.showBrowsePage',
  'GET /tutorials/new': 'PageController.newTutorial',
  'GET /tutorials/:id': 'PageController.tutorialDetail',
  'GET /tutorials/:id/edit': 'PageController.editTutorial',
  'GET /tutorials/:id/videos/new': 'PageController.newVideo',
  'GET /tutorials/:id/videos/edit': 'PageController.editVideo',
  'GET /videos/:id/show': 'VideosController.showVideo',

  // 'GET /video': {
  //   view: 'show-video',
  //   locals: {
  //     me: null,
  //     src: 'https://www.youtube.com/embed/wkQomq_rgK4'
  //   }
  // },

  'GET /:username': 'PageController.profile',
  
  // 'GET /tutorials-detail-video-new': 'PageController.showTutorialsDetailsVideoNewPage',
  // 'GET /tutorials-detail-new': {
  //   view: 'tutorials-detail-new',
  //   locals: {
  //     me: null
  //   }
  // },
  'GET /verify-email': {
    view: 'verify-email',
    locals: {
      me: null
    }
  }
  // 'GET /tutorials-list': {
  //   view: 'tutorials-list',
  //   locals: {
  //     me: 'null'
  //   }
  // },
  // 'GET /tutorials-detail': {
  //   view: 'tutorials-detail',
  //   locals: {
  //     me: 'null'
  //   }
  // },
  // 'GET /signup': {
  //   view: 'signup',
  //   locals: {
  //     me: 'null'
  //   }
  // }
  // 'GET /login': {
  //   view: 'login',
  //   locals: {
  //     me: 'null'
  //   }
  // }
  
  // 'GET /': {
  //   view: 'homepage',
  //   locals: {
  //     me: {
  //       id: 0,
  //       gravatarURL: 'http://www.gravatar.com/avatar/ef3eac6c71fdf24b13db12d8ff8d1264?',
  //       email: 'sailsinaction@gmail.com'
  //     }
  //   }
  // },

  // 'GET /videos': {
  //   view: 'videos',
  //   locals: {
  //     me: {
  //       id: 1,
  //       gravatarURL: 'http://www.gravatar.com/avatar/ef3eac6c71fdf24b13db12d8ff8d1264?',
  //       email: 'sailsinaction@gmail.com'
  //     }
  //   }
  // },
  // 'GET /profile': {
  //   view: 'profile',
  //   locals: {
  //     me: {
  //       id: 1,
  //       gravatarURL: 'http://www.gravatar.com/avatar/ef3eac6c71fdf24b13db12d8ff8d1264?',
  //       email: 'sailsinaction@gmail.com',
  //       username: 'sails-in-action'
  //     }
  //   }
  // },
  // 'GET /edit-profile': {
  //   view: 'edit-profile',
  //   locals: {
  //     me: {
  //       id: 1,
  //       gravatarURL: 'http://www.gravatar.com/avatar/ef3eac6c71fdf24b13db12d8ff8d1264?',
  //       email: 'sailsinaction@gmail.com',
  //       username: 'sails-in-action'
  //     }
  //   }
  // },
  // 'GET /signup': {
  //   view: 'signup',
  //   locals: {
  //     me: {
  //       id: null,
  //       gravatarURL: 'http://www.gravatar.com/avatar/ef3eac6c71fdf24b13db12d8ff8d1264?',
  //       email: 'sailsinaction@gmail.com'
  //     }
  //   }
  // }
  // 'GET /restore': {
  //   view: 'restore',
  //   locals: {
  //     me: {
  //       id: null,
  //       gravatarURL: 'http://www.gravatar.com/avatar/ef3eac6c71fdf24b13db12d8ff8d1264?',
  //       email: 'sailsinaction@gmail.com'
  //     }
  //   }
  // }
  // 'GET /administration': {
  //   view: 'adminUsers',
  //   locals: {
  //     me: {
  //       id: 1,
  //       gravatarURL: 'http://www.gravatar.com/avatar/ef3eac6c71fdf24b13db12d8ff8d1264?',
  //       email: 'sailsinaction@gmail.com',
  //     }
  //   }
  // }



  /***************************************************************************
   *                                                                          *
   * Custom routes here...                                                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the custom routes above, it   *
   * is matched against Sails route blueprints. See `config/blueprints.js`    *
   * for configuration options and examples.                                  *
   *                                                                          *
   ***************************************************************************/

};