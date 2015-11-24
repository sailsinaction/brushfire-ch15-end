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

    owner: {
      type: 'json'
    },

    // owner: {
    //   model: 'user'
    // },
    
    // An array of video ids representing the manual (human) ordering of videos. 
    videoOrder: {
      // e.g.
      // [
      //   3
      // ]
      type: 'json'
      // (this is always ok because there will never be millions of videos per tutorial)
    },

    videos: {
      collection: 'video',
      via: 'tutorialAssoc'
    },

    ratings: {
      collection: 'rating',
      via: 'byTutorial'
    }
  }
};

