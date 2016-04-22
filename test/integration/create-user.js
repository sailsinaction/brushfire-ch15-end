// POST /user/signup'
// UserController.signup

var assert = require('assert');
var request = require('supertest');
var Passwords = require('machinepack-passwords');

describe('User Controller :: ', function() {
  describe('POST /user/signup :: ', function() {

    // Testing when authenticated
    describe('When logged in :: ', function() {

      // A placeholder that will simulate an instance of a browser
      var agent;
      
      // Before we start the test, create a user and then login
      before(function(done) {

        var createTestUserAndAuthenticate = require('../utils/create-logged-in-user');

        // By using request.agent and passing in the app dictionary we can
        // now simulate persistent cookies in addition to making requests.
        // request.agent gets properties like the existing `port` and fully
        // qualified url. 
        agent = request.agent(sails.hooks.http.app);

        // Calling the helper function to create and authenticate a user
        // passing the agent dictionary that simulates a browser
        // passing the callback making this an asychronous function
        createTestUserAndAuthenticate(agent, done);
      });

      it('should return a 403 response code', function(done) {

        // Make a request to signup a new user
        agent
        .post('/user/signup')
        .send({
          username: 'foofoo',
          email: 'foo@foo.com',
          password: 'barbaz'
        })
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          if(err) { return done(err); }

          // Check that the status code return is a 403
          assert.equal(res.statusCode, 403);

          return done();
        });
      });
    });

    // Loggedout policy
    describe('When logged out ::', function() {

      // Email validation
      describe('With an invalid email address', function() {

        // Missing email
        it('should return a 400 status code when missing', function(done) {

          // Make the HTTP request
          request(sails.hooks.http.app)
          .post('/user/signup')
          .send({
            username: 'foofoo',
            password: 'barbaz'
          })
          .set('Content-Type', 'application/json')
          .end(function(err, res) {
            if(err) { return done(err); }

            // Check that the status code is 400
            assert.equal(res.statusCode, 400);
            return done();
          });
        });
      });
    });

    describe('With valid properties', function() {

      // Holds the response so that we can test it
      var userResponse;
    
      // Create a new user
      before(function(done) {
        request(sails.hooks.http.app)
        .post('/user/signup')
        .send({
          username: 'foofoo',
          password: 'barbaz',
          email: 'foo.bar@baz.com'
        })
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          if(err) { return done(err); }
          userResponse = res;
          done();
        });
      });

      it('should return a 200 response code', function() {
        assert.equal(userResponse.statusCode, 200);
      });

      it('should return the username of the user in the body', function() {
        assert.equal(userResponse.body.username, 'foofoo');
      });

      it('should set the gravatar on the user record', function(done) {
        User.findOne({ username: 'foofoo' }).exec(function(err, user) {
          if(err) { return done(err); }
          assert(user);
          assert(user.gravatarURL);
          assert.notEqual(user.gravatarURL, '');
          done();
        });
      });
    });
  });
});