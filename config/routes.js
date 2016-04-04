/**
 * Brushfire explicit routes
 *
 */

module.exports.routes = {

  /*************************************************************
  * JSON API ENDPOINTS                                         *
  *************************************************************/

  'PUT /login': 'UserController.login',
  'POST /logout': 'UserController.logout',
  'GET /logout': 'PageController.logout',

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
  'PUT /user/follow': 'UserController.follow',
  'PUT /user/unfollow': 'UserController.unFollow',

  'GET /tutorials': 'TutorialController.browseTutorials',
  'POST /tutorials': 'TutorialController.createTutorial',
  'POST /tutorials/:tutorialId/videos': 'TutorialController.addVideo',
  'PUT /tutorials/:id': 'TutorialController.updateTutorial',
  'PUT /tutorials/:id/rate': 'TutorialController.rateTutorial',

  'GET /videos/:id/join': 'VideoController.joinChat',
  'POST /videos/:id/chat': 'VideoController.chat',

  'DELETE /tutorials/:id': 'TutorialController.deleteTutorial',
  'DELETE /videos/:id': 'TutorialController.removeVideo',

  'POST /videos/:id/up': 'VideoController.reorderVideoUp',
  'POST /videos/:id/down': 'VideoController.reorderVideoDown',
  'PUT /videos/:id': 'TutorialController.updateVideo',

  /*************************************************************
  * Server Rendered HTML Page Endpoints                        *
  *************************************************************/
  
  'GET /profile/followers': 'PageController.profileFollower',

  'GET /': 'PageController.home',
  'GET /profile/edit': 'PageController.editProfile',
  'GET /profile/restore': 'PageController.restoreProfile',
  'GET /signin': 'PageController.signin',
  'GET /signup': 'PageController.signup',
  'GET /administration': 'PageController.administration',

  'GET /password-recovery-email': 'PageController.passwordRecoveryEmail',
  'GET /password-recovery-email-sent': 'PageController.passwordRecoveryEmailSent',  
  'GET /password-reset-form/:passwordRecoveryToken': 'PageController.passwordReset',
  
  'GET /tutorials/search': 'TutorialController.searchTutorials',
  'GET /tutorials/browse': 'PageController.showBrowsePage',
  'GET /tutorials/new': 'PageController.newTutorial',
  'GET /tutorials/:id': 'PageController.tutorialDetail',
  'GET /tutorials/:id/edit': 'PageController.editTutorial',
  'GET /tutorials/:id/videos/new': 'PageController.newVideo',
  'GET /tutorials/:tutorialId/videos/:id/edit': 'PageController.editVideo',
  'GET /tutorials/:tutorialId/videos/:id/show': 'PageController.showVideo',

  'GET /:username/followers': 'PageController.profileFollower',
  'GET /:username/following': 'PageController.profileFollowing',
  'GET /:username': {
    controller: 'PageController',
    action: 'profile',
    skipAssets: true
  }
  // 'GET /:username': 'PageController.profile',
};