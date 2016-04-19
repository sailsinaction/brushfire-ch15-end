/**
 * Brushfire Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  PageController: {
    home: [],
    profile: [],
    profileFollower: [],
    profileFollowing: [],
    showBrowsePage: [],
    tutorialDetail: [],
    showVideo: [],
    newTutorial: ['isLoggedIn'], // you'll never be able to view the new tutorial page if you're not logged in
    editTutorial: ['isLoggedIn'], // you'll never be able to view the edit tutorial page if you're not logged in
    newVideo: ['isLoggedIn'],// you'll never be able to view the new video page if you're not logged in
    editVideo: ['isLoggedIn'],// you'll never be able to view the edit video page if you're not logged in
    editProfile: ['isLoggedIn'],// you'll never be able to view the edit profile page if you're not logged in
    logout: ['isLoggedIn'], // you'll never be able to view the logout page if you're logged in
    administration: ['isLoggedIn', 'isAdmin'],// you'll never be able to view the admin page if you're not logged in or logged in as a non-an admin
    signin: ['isLoggedOut'],// you'll never be able to view the login page if you're logged in
    signup: ['isLoggedOut'],// you'll never be able to view the signup page if you're logged in
    restoreProfile: ['isLoggedOut'],// you'll never be able to restore your profile if you're logged in
    passwordRecoveryEmail: ['isLoggedOut'],// you'll never be able to view the page for requesting a recovery email if you're logged in
    passwordRecoveryEmailSent: ['isLoggedOut'],// you'll never be able to view the "successfully sent recovery email" page if you're logged in
    passwordReset: ['isLoggedOut'],// you'll never be able to view the "ok i see you have access to that email address, now give me a new password" page if you're logged in
  },

  TutorialsController: {
    searchTutorials: [],
    browseTutorials: [],
    rateTutorial: ['isLoggedIn'],
    createTutorial: ['isLoggedIn'],
    updateTutorial: ['isLoggedIn'],
    addVideo: ['isLoggedIn'],
    updateVideo: ['isLoggedIn'], // << ******** TODO: consider moving this to VideoController
    deleteTutorial: ['isLoggedIn'],
    removeVideo: ['isLoggedIn'],
  },

  RatingController: {}, // << ******** TODO: consider deleting this from api/controllers and from here

  UserController: {
    follow: ['isLoggedIn'],
    unfollow: ['isLoggedIn'],
    removeProfile: ['isLoggedIn'],
    restoreGravatarURL: ['isLoggedIn'],
    updateProfile: ['isLoggedIn'],
    changePassword: ['isLoggedIn'],
    logout: ['isLoggedIn'], // you can't log out via the API if you're not logged in
    adminUsers: ['isLoggedIn', 'isAdmin'],
    updateAdmin: ['isLoggedIn', 'isAdmin'],
    updateBanned: ['isLoggedIn', 'isAdmin'],
    updateDeleted: ['isLoggedIn', 'isAdmin'],
    login: ['isLoggedOut'], // you can't log in to a different account if you're already logged in (need to log out first)
    signup: ['isLoggedOut'],// you can't signup for a different account if you're already logged in (need to log out first)
    restoreProfile: ['isLoggedOut'],
    generateRecoveryEmail:['isLoggedOut'],
    resetPassword:['isLoggedOut']
  },

  VideosController: {
    reorderVideoUp: ['isLoggedIn'],
    reorderVideoDown: ['isLoggedIn'],
    chat: ['isLoggedIn'],
    typing: ['isLoggedIn'],
    stoppedTyping: ['isLoggedIn']
  }
};
