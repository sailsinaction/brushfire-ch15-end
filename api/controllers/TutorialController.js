/**
 * TutorialController
 *
 * @description :: Server-side logic for managing tutorial
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  searchTutorials: function(req, res) {

    var tutorials = [{
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sailsinaction',
      id: 1,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sailsinaction',
      id: 2,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 3
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sailsinaction',
      id: 3,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 5
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sailsinaction',
      id: 4,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 1
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sailsinaction',
      id: 5,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 5
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sailsinaction',
      id: 6,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 2
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sailsinaction',
      id: 7,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sailsinaction',
      id: 8,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 5
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sailsinaction',
      id: 9,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sailsinaction',
      id: 10,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }];

    return res.json({
      options: {
        totalTutorials: 10,
        updatedTutorials: tutorials
      }
    });
  },

  browseTutorials: function(req, res) {

    var tutorials = [{
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sailsinaction',
      id: 1,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sailsinaction',
      id: 2,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 3
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sailsinaction',
      id: 3,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 5
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sailsinaction',
      id: 4,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 1
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sailsinaction',
      id: 5,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 5
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sailsinaction',
      id: 6,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 2
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sailsinaction',
      id: 7,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sailsinaction',
      id: 8,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 5
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sailsinaction',
      id: 9,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }, {
      title: 'The best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavaScript the good parts, and more.',
      owner: 'sailsinaction',
      id: 10,
      created: 'a month ago',
      totalTime: '3h 22m 23s',
      stars: 4
    }];

    console.log('skip: ', req.param('skip'));

    return res.json({
      options: {
        totalTutorials: 30,
        updatedTutorials: tutorials
      }
    });
  },

  myRating: function(req, res) {

    return res.json({
      myRating: null
    });
  },

  rateTutorial: function(req, res) {

    return res.ok();
  },


  createTutorial: function(req, res) {

    // Create a tutorial record using `username`, `title`, and `description`

    // Pass back the `id` of the new record, simulate `1` for now.
    return res.json({id: 1});
  },

  updateTutorial: function(req, res) {

    return res.ok();
  },
  
  addVideo: function(req, res) {

    return res.ok();
  },


  updateVideo: function(req, res) {

    return res.ok();
  },

  deleteTutorial: function(req, res) {
   
    if (!req.session.userId) {
      return res.redirect('/');
    }

    User.findOne({id: req.session.userId}).exec(function(err, foundUser){
      if (err) {
        return res.negotiate(err);
      }

      if (!foundUser) {
        return res.notFound();
      }

      // Return the username of the user using the userId of the session.
      return res.json({username: foundUser.username});
      
    });
  },

  removeVideo: function(req, res) {

      return res.ok();
  }
};

