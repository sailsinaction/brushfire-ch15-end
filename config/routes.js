/**
 * Brushfire explicit routes
 *
 */

module.exports.routes = {

  /*************************************************************
  * JSON API ENDPOINTS                                         *
  *************************************************************/

  'PUT /login': 'UserController.login',
  'GET /logout': 'UserController.logout',

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

  'GET /tutorials': 'TutorialsController.browseTutorials',
  'POST /tutorials': 'TutorialsController.create',
  'POST /tutorials/:id/videos': 'TutorialsController.addVideo',
  'PUT /tutorials/:id': 'TutorialsController.update',
  'PUT /tutorials/:id/rate': 'TutorialsController.rateTutorial',
  'DELETE /tutorials/:id': 'TutorialsController.deleteTutorial',
  'DELETE /videos/:id': 'TutorialsController.removeVideo',

  'POST /videos/:id/up': 'VideosController.reorderVideoUp',
  'POST /videos/:id/down': 'VideosController.reorderVideoDown',
  'PUT /videos/:id': 'TutorialsController.updateVideo',

  /*************************************************************
  * Server Rendered HTML Page Endpoints                        *
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
  'GET /tutorials/browse': 'PageController.showBrowsePage',
  'GET /tutorials/new': 'PageController.newTutorial',
  'GET /tutorials/:id': 'PageController.tutorialDetail',
  'GET /tutorials/:id/edit': 'PageController.editTutorial',
  'GET /tutorials/:id/videos/new': 'PageController.newVideo',
  'GET /tutorials/:id/videos/edit': 'PageController.editVideo',
  'GET /videos/:id/show': 'VideosController.showVideo',

  'GET /:username': 'PageController.profile',
  
  // 'GET /:username': {
  //   controller: 'PageController',
  //   action: 'profile',
  //   skipAssets: true
  // },
};