/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  connection: 'myPostgresqlServer',
  schema: 'true',

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
      collection: 'tutorial',
      via: 'owner'
    },

    ratings: {
      collection: 'rating',
      via: 'user' // TODO: `byUser` (so readers don't get confused and think it _has_ to be the model name)
    },

    // A good example of a unidirectional association:
    // following: { collection: 'user' },

    // Here's the bidirectional version:
    // following: {
    //   collection: 'user',
    //   via: 'followedBy'
    // },
    // followedBy: {
    //   collection: 'user',
    //   via: 'following'
    // }

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirmation;
      delete obj.encryptedPassword;
      return obj;
    }
  }
};
