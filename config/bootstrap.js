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

  var async = require('async');
  var Passwords = require('machinepack-passwords');
  var Gravatar = require('machinepack-gravatar');

  // This is to prevent us from pulling our hair out creating test users manually in the app
  // `TEST_USERS` is an array of test users 
  var TEST_USERS = [{
    email: 'sailsinaction@gmail.com',
    username: 'sailsinaction',
    password: 'abc123',
    admin: true
  }, {
    email: 'nikolateslaidol@gmail.com',
    username: 'nikolatesla',
    password: 'abc123',
    admin: false
  }];

  // Iterate over testUsers array of dictionaries
  async.each(TEST_USERS, function findOrCreateEachFakeUser(fakeUser, next){

    // Check if this fake user already exists via the email property al
    User.findOne({
      email: fakeUser.email
    }).exec(function (err, existingUser){

      // This handles errors within the iteratee versus at the end in afterwards
      // While I'm in findOrCreateEachFakeUser I can't call cb()
      if (err) return next(err);

      // if this user already exists...
      if (existingUser) {
        // then go to the next user
        return next();
      }

      // Otherwise the user doesn't exist in the database.
     
      // Encrypt the password of the test user
      Passwords.encryptPassword({
        password: fakeUser.password,
      }).exec({
        error: function(err) {
          return next(err);
        },
        success: function(encryptedPassword) {

          // Get the gravatar url for the fakeUser
          var gravatarURL;
          try {
            gravatarURL = Gravatar.getImageUrl({
              emailAddress: fakeUser.email
            }).execSync();

          } catch (err) {
            return next(err);
          }

          // Create a new user record with various stuff we just built
          User.create({
            gravatarURL: gravatarURL,
            encryptedPassword: encryptedPassword,
            email: fakeUser.email,
            username: fakeUser.username,
            deleted: false,
            admin: fakeUser.admin,
            banned: false,
          }).exec(function(err, createdUser) {
            if (err) {
              return next(err);
            }
            return next();
          }); //</User.create()>
        }
      }); //</Passwords.encryptPassword>
    }); // </ User.find
  }, function afterwards(err){
    if (err) {
      return cb(err);
    }

    return cb();
  });
};