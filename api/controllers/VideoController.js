/**
 * VideoController
 *
 * @description :: Server-side logic for managing videos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


  reorderVideoUp: function(req, res) {

    // Look up the video with the specified id
    // (and populate the tutorial it belongs to)
    Video.findOne({
      id: +req.param('id')
    })
    .populate('tutorialAssoc') // consider renaming this association to `partOfTutorial`
    .exec(function (err, foundVideo){
      if (err) return res.negotiate(err);
      if (!foundVideo) return res.notFound();

      // Assure that the owner of the tutorial cannot rate their own tutorial.
      // Note that this is a back-up to the front-end which already prevents the UI from being displayed. 
      if (req.session.userId !== foundVideo.tutorialAssoc.owner) {
        return res.forbidden();
      }
      
      // Modify the tutorial's `videoOrder` to move the video with the
      // specified id up in the list.

      // Find the index of the video id within the array.
      var indexOfVideo = _.indexOf(foundVideo.tutorialAssoc.videoOrder, +req.param('id'));

      // If this is already the first video in the list, consider this a bad request.
      // (this should have been prevented on the front-end already, but we're just being safe)
      if (indexOfVideo === 0) {
        return res.badRequest('This video is already at the top of the list.');
      }

      // Remove the video id from its current position in the array
      foundVideo.tutorialAssoc.videoOrder.splice(indexOfVideo, 1);

      // Insert the video id at the new position within the array
      foundVideo.tutorialAssoc.videoOrder.splice(indexOfVideo-1, 0, +req.param('id'));

      // Persist the tutorial record back to the database.
      foundVideo.tutorialAssoc.save(function (err) {
        if (err) return res.negotiate(err);
        return res.ok();
      });
    });
  },

  reorderVideoDown: function(req, res) {

    // Look up the video with the specified id
    // (and populate the tutorial it belongs to)
    Video.findOne({
      id: +req.param('id')
    })
    .populate('tutorialAssoc') // consider renaming this association to `partOfTutorial`
    .exec(function (err, foundVideo){
      if (err) return res.negotiate(err);
      if (!foundVideo) return res.notFound();

      // Assure that the owner of the tutorial cannot rate their own tutorial.
      // Note that this is a back-up to the front-end which already prevents the UI from being displayed. 
      if (req.session.userId !== foundVideo.tutorialAssoc.owner) {
        return res.forbidden();
      }

      // Modify the tutorial's `videoOrder` to move the video with the
      // specified id up in the list.

      // Find the index of the video id within the array.
      var indexOfVideo = _.indexOf(foundVideo.tutorialAssoc.videoOrder, +req.param('id'));

      var numberOfTutorials = foundVideo.tutorialAssoc.videoOrder.length;

      // If this is already the last video in the list, consider this a bad request.
      // (this should have been prevented on the front-end already, but we're just being safe)
      if (indexOfVideo === numberOfTutorials) {
        return res.badRequest('This video is already at the bottom of the list.');
      }

      // Remove the video id from its current position in the array
      foundVideo.tutorialAssoc.videoOrder.splice(indexOfVideo, 1);

      // Insert the video id at the new position within the array
      foundVideo.tutorialAssoc.videoOrder.splice(indexOfVideo+1, 0, +req.param('id'));

      // Persist the tutorial record back to the database.
      foundVideo.tutorialAssoc.save(function (err) {
        if (err) return res.negotiate(err);
        return res.ok();
      });
    });
  },

  joinChat: function (req, res) {

    // Nothing except socket requests should ever hit this endpoint.
    if (!req.isSocket) {
      return res.badRequest();
    }
    // TODO: ^ pull this into a `isSocketRequest` policy

    // Join the room for this video (as the requesting socket)
    Video.subscribe(req, req.param('id') );
    
    // Join the the video room for the typing animation
    sails.sockets.join(req, 'video'+req.param('id'));
    // Video.watch(req);
    return res.ok();
  },

  chat: function(req, res) {

    // Nothing except socket requests should ever hit this endpoint.
    if (!req.isSocket) {
      return res.badRequest();
    }
    // TODO: ^ pull this into a `isSocketRequest` policy
    
    Chat.create({
      message: req.param('message'),
      sender: req.session.userId,
      video: +req.param('id')
    }).exec(function (err, createdChat){
      if (err) return res.negotiate(err);

      User.findOne({
        id: req.session.userId
      }).exec(function (err, foundUser){
        if (err) return res.negotiate(err);
        if (!foundUser) return res.notFound();

        // Broadcast WebSocket event to everyone else currently online so their user 
        // agents can update the UI for them.
        // sails.sockets.broadcast('video'+req.param('id'), 'chat', {
        //   message: req.param('message'),
        //   username: foundUser.username,
        //   created: 'just now',
        //   gravatarURL: foundUser.gravatarURL
        // });

        // Send a video event to the video record room 
        Video.publishUpdate(+req.param('id'), {
          message: req.param('message'),
          username: foundUser.username,
          created: 'just now',
          gravatarURL: foundUser.gravatarURL
        });

        return res.ok();
        
      });
    });
  },

  typing: function(req, res) {

    // Nothing except socket requests should ever hit this endpoint.
    if (!req.isSocket) {
      return res.badRequest();
    }
    // TODO: ^ pull this into a `isSocketRequest` policy

    User.findOne({
      id: req.session.userId
    }).exec(function (err, foundUser){
      if (err) return res.negotiate(err);
      if (!foundUser) return res.notFound();

      // Broadcast socket event to everyone else currently online so their user agents
      // can update the UI for them.
      sails.sockets.broadcast('video'+req.param('id'), 'typing', {
        username: foundUser.username
      }, (req.isSocket ? req : undefined) );

      return res.ok();
    });
  },

  stoppedTyping: function(req, res) {

    // Nothing except socket requests should ever hit this endpoint.
    if (!req.isSocket) {
      return res.badRequest();
    }
    // TODO: ^ pull this into a `isSocketRequest` policy

    // Broadcast socket event to everyone else currently online so their user agents
    // can update the UI for them.
    sails.sockets.broadcast('video'+req.param('id'),
      'stoppedTyping', {}, (req.isSocket ? req : undefined) );

    return res.ok();
  },
};