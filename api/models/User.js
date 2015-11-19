/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    email: {
      type: 'string',
      email: 'true',
      unique: 'true'
    },

    username: {
      type: 'string',
      unique: 'true'
    },

    encryptedPassword: {
      type: 'string'
    },

    gravatarURL: {
      type: 'string'
    },

    deleted: {
      type: 'boolean'
    },

    admin: {
      type: 'boolean'
    },

    banned: {
      type: 'boolean'
    },

    passwordRecoveryToken: {
      type: 'string'
    },

    tutorials: {
      type: 'json'
    },

    // tutorials: {
    //   collection: 'tutorial',
    //   via: 'owner'
    // },

    ratings: {
      collection: 'rating',
      via: 'user' // TODO: `byUser` (so readers don't get confused and think it _has_ to be the model name)
    },

    // Who is following me?
    followers: {
      collection: 'user',
      via: 'following'
    },

    // Who am I following?
    following: {
      collection: 'user',
      via: 'followers'
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      return obj;
    }
  }
};
