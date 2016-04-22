var request = require('supertest');
var Passwords = require('machinepack-passwords');
var USER_FIXTURE = require('../fixtures/user');

module.exports = function(agent, cb) {
  Passwords.encryptPassword({
    password: USER_FIXTURE.password
  })
  .exec({
    error: cb,
    success: function(password) {
      User.create({
        username: USER_FIXTURE.username,
        email: USER_FIXTURE.email,
        encryptedPassword: password
      })
      .exec(function(err, user) {
        if(err) { return cb(err); }

        agent
        .put('/login')
        .send({
          username: USER_FIXTURE.username,
          password: USER_FIXTURE.password
        })
        .set('Content-Type', 'application/json')
        .end(function(err, res) {
          if(err) { return cb(err); }
          return cb();
        });
      });
    }
  });
}