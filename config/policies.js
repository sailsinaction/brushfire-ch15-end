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
    editProfile: ['isLoggedIn'],
    signin: ['isLoggedOut'],
    signup: ['isLoggedOut'],
    restoreProfile: ['isLoggedOut'],
    administration: ['isLoggedIn', 'isAdmin'],
    passwordRecoveryEmail: ['isLoggedOut'],
    passwordRecoveryEmailSent: ['isLoggedOut'],
    passwordReset: ['isLoggedOut'],
    newTutorial: ['isLoggedIn'],
    editTutorial: ['isLoggedIn'],
    newVideo: ['isLoggedIn'],
    editVideo: ['isLoggedIn']
  },

  TutorialsController: {
    rateTutorial: ['isLoggedIn'],
    create: ['isLoggedIn'],
    addVideo: ['isLoggedIn'],
    update: ['isLoggedIn'],
    updateVideo: ['isLoggedIn'],
    rateVideo: ['isLoggedIn'],
    delete: ['isLoggedIn'],
    removeVideo: ['isLoggedIn']
  },

  UserController: {
    login: ['isLoggedOut'],
    logout: ['isLoggedIn'],
    signup: ['isLoggedOut'],
    removeProfile: ['isLoggedIn'],
    restoreProfile: ['isLoggedOut'],
    restoreGravatarURL: ['isLoggedIn'],
    updateProfile: ['isLoggedIn'],
    changePassword: ['isLoggedIn'],
    adminUsers: ['isLoggedIn', 'isAdmin'],
    updateAdmin: ['isLoggedIn', 'isAdmin'],
    updateBanned: ['isLoggedIn', 'isAdmin'],
    updateDeleted: ['isLoggedIn', 'isAdmin'],
    generateRecoveryEmail:['isLoggedOut'],
    resetPassword:['isLoggedIn']
  },

  VideosController: {
    reorderVideoUp: ['isLoggedIn'],
    reorderVideoDown: ['isLoggedIn']
  }
};
