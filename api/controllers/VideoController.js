/**
 * VideoController
 *
 * @description :: Server-side logic for managing videos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  reorderVideoUp: function(req, res) {

  console.log('sort video up: ', req.param('id'));

  return res.ok();

  },

  reorderVideoDown: function(req, res) {

    console.log('sort video down: ', req.param('id'));

    return res.ok();

  },

  joinChat: function(req, res) {
    return res.ok();
  },

  chat: function(req, res) {
    return res.json({
      message: req.param('message')
    });
  }
};

