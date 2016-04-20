/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
  User.find().limit(1).exec(function(err, user) {
    if(err) { return cb(err); }
    if(user.length > 0) { return cb(); }

    var FixtureBootstrapper = require('../fixtures');
    return FixtureBootstrapper(cb);
  });
};