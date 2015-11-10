/**
* Tutorial.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    title: {
      type: 'string'
    },

    description: {
      type: 'string'
    },

    // stars: {
    //   type: 'integer'
    // },
    
    totalTime: {
      type: 'string'
    },

    owner: {
      model: 'user'
    },

    videos: {
      collection: 'video',
      via: 'tutorialAssoc'
    }
  }
};

