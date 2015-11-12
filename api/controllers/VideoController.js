/**
 * VideoController
 *
 * @description :: Server-side logic for managing videos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var util = require('util');


module.exports = {


  reorderVideoUp: function(req, res) {

    console.log('sort video up: ', +req.param('id'));

    // Look up the video with the specified id
    // (and populate the tutorial it belongs to)
    Video.findOne({
      id: +req.param('id')
    })
    .populate('tutorialAssoc') // consider renaming this association to `partOfTutorial`
    .exec(function(err, video){
      if (err) return res.negotiate(err);
      if (!video) return res.notFound();
      if (!_.isObject(video.tutorialAssoc)) {
        return res.serverError(new Error(util.format(
          'Consistency violation: all videos should be associated with a tutorial, but the containing tutorial for video `%d` cannot be populated.',
          (+req.param('id'))
        )));
      }

      // Modify the tutorial's `videoOrder` to move the video with the
      // specified id up in the list.

      // Find the index of the video id within the array.
      var indexOfVideo = _.indexOf(video.tutorialAssoc.videoOrder, +req.param('id'));

      // If this is already the first video in the list, consider this a bad request.
      // (this should have been prevented on the front-end already, but we're just being safe)
      if (indexOfVideo === 0) {
        return res.badRequest('This video is already at the top of the list.');
      }

      // Remove the video id from its current position in the array
      video.tutorialAssoc.videoOrder.splice(indexOfVideo, 1);

      // Insert the video id at the new position within the array
      video.tutorialAssoc.videoOrder.splice(indexOfVideo-1, 0, +req.param('id'));

      // Persist the tutorial record back to the database.
      video.tutorialAssoc.save(function (err) {
        if (err) return res.negotiate(err);
        return res.ok();
      });
    });

  },

      // // Look up the tutorial that this video belongs to.
      // Tutorial.findOne({
      //   id: video.tutorialAssoc
      // })
      // .exec(function(err, tutorial){
      //   if (err) return res.negotiate(err);
      //   if (!tutorial) return res.notFound();





  reorderVideoDown: function(req, res) {

    console.log('sort video down: ', req.param('id'));

    return res.ok();

  }

};

