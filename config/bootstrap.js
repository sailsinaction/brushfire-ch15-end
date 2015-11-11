/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  var async = require('async');
  var Passwords = require('machinepack-passwords');
  var Gravatar = require('machinepack-gravatar');

  // This is to prevent us from pulling our hair out creating test users manually in the app
  // `TEST_USERS` is an array of test users 
  var TEST_USERS = [{
    email: 'sailsinaction@gmail.com',
    username: 'sails-in-action',
    password: 'abc123',
    admin: true
  }, {
    email: 'nikolateslaidol@gmail.com',
    username: 'nikola-tesla',
    password: 'abc123',
    admin: false
  }];

  // Iterate over testUsers array of dictionaries
  async.eachSeries(TEST_USERS, function findOrCreateEachFakeUser(fakeUser, next){

    // Check if this fake user already exists via the email property al
    User.findOne({
      email: fakeUser.email
    }).exec(function (err, existingUser){

      // This handles errors within the iteratee versus at the end in afterwards
      // While I'm in findOrCreateEachFakeUser I can't call cb()
      if (err) return next(err);

      // if this user already exists...
      if (existingUser) {
        // then go to the next user
        return next();
      }

      // Otherwise the user doesn't exist in the database.
     
      // Encrypt the password of the test user
      Passwords.encryptPassword({
        password: fakeUser.password,
      }).exec({
        error: function(err) {
          return next(err);
        },
        success: function(encryptedPassword) {

          // Get the gravatar url for the fakeUser
          var gravatarURL;
          try {
            gravatarURL = Gravatar.getImageUrl({
              emailAddress: fakeUser.email
            }).execSync();

          } catch (err) {
            return next(err);
          }

          // Create a new user record with various stuff we just built
          User.create({
            gravatarURL: gravatarURL,
            encryptedPassword: encryptedPassword,
            email: fakeUser.email,
            username: fakeUser.username,
            deleted: false,
            admin: fakeUser.admin,
            banned: false,
            tutorials: []
          }).exec(function(err, createdUser) {
            if (err) {
              return next(err);
            }
            return next();
          }); //</User.create()>
        }
      }); //</Passwords.encryptPassword>
    }); // </ User.find
  }, function afterwards(err){
    if (err) {
      return cb(err);
    }

    var TEST_TUTORIALS = [{
      title: 'aThe best of Douglas Crockford on JavaScript.',
      description: 'Understanding JavasScript the good parts.',
      owner: 2,
      // stars: 5
    },{
      title: 'aUnderstanding Angular 2.0',
      description: 'Different sides of Angular 2.0',
      owner: 2,
      // stars: 5
    }, {
      title: 'aBiology 101.',
      description: 'The best biology teacher on the planet.',
      owner: 2,
      // stars: 5
    },{
      title: 'aDog Training.',
      description: 'A great series on getting your dog to stop biting, sit, come, and stay.',
      owner: 2,
      // stars: 4
    }, {
      title: 'aHow to play famous songs on the Ukulele.',
      description: 'You\'ll learn songs like Love me Tender, Sea of Love, and more.',
      owner: 2,
      // stars: 3
    }, {
      title: 'aCharacter development 101.',
      description: 'Writing better and more interesting characters.',
      owner: 2,
      // stars: 4
    }, {
      title: 'aDrawing Cartoons.',
      description: 'Drawing techniques for the beginning cartoonist.',
      owner: 2,
      // stars: 5
    }, {
      title: 'aHow to make whisky.',
      description: 'Distilling corn into whisky.',
      owner: 2,
      // stars: 5
    }, {
      title: 'aHow do toilets work.',
      description: 'Everything you never thought you needed to know about how toilets flush.',
      owner: 2,
      // stars: 5
    }, {
      title: 'aMaking fire.',
      description: 'Techniques for making fire without a match.',
      owner: 2,
      // stars: 5
    },{
      title: 'aMaking homemade beef jerky.',
      description: 'Everything you need to know to make some jerky.',
      owner: 2,
      // stars: 5
    }];

    async.eachSeries(TEST_TUTORIALS, function findOrCreateEachFakeTutorial(fakeTutorial, next){

      Tutorial.findOne({
        title: fakeTutorial.title
      }).exec(function (err, existingTutorial){

        if (err) return next(err);

        if (existingTutorial) {
          return next();
        }

        Tutorial.create({
          title: fakeTutorial.title,
          description: fakeTutorial.description,
          owner: fakeTutorial.owner,
          stars: fakeTutorial.stars
        }).exec(function (err, fakeTutorial){
          if (err) return next(err);
          return next();
        });
      });
    }, function afterwards(err) {
      if (err) return cb(err);

      var TEST_VIDEOS = [{
        title: 'Crockford on JavaScript - Volume 1: The Early Years',
        src: 'https://www.youtube.com/embed/JxAXlJEmNMg',
        lengthInSeconds: 6128,
        tutorialAssoc: 1
      },{
        title: 'Crockford on JavaScript - Chapter 2: And Then There Was JavaScript',
        src: 'https://www.youtube.com/embed/RO1Wnu-xKoY',
        lengthInSeconds: 5422,
        tutorialAssoc: 1
      },{
        title: 'Crockford on JavaScript - Act III: Function the Ultimate',
        src: 'https://www.youtube.com/embed/ya4UHuXNygM',
        lengthInSeconds: 4408,
        tutorialAssoc: 1
      },{
        title: 'Crockford on JavaScript - Episode IV: The Metamorphosis of Ajax',
        src: 'https://www.youtube.com/embed/Fv9qT9joc0M',
        lengthInSeconds: 5634,
        tutorialAssoc: 1
      },{
        title: 'Crockford on JavaScript - Part 5: The End of All Things',
        src: 'https://www.youtube.com/embed/47Ceot8yqeI',
        lengthInSeconds: 5082,
        tutorialAssoc: 1
      },{
        title: 'Crockford on JavaScript - Scene 6: Loopage',
        src: 'https://www.youtube.com/embed/QgwSUtYSUqA',
        lengthInSeconds: 3112,
        tutorialAssoc: 1
      },{
        title: 'Crockford on JavaScript - Level 7: ECMAScript 5: The New Parts',
        src: 'https://www.youtube.com/embed/UTEqr0IlFKY',
        lengthInSeconds: 3438,
        tutorialAssoc: 1
      },{
        title: 'Crockford on JavaScript - Section 8: Programming Style & Your Brain',
        src: 'https://www.youtube.com/embed/taaEzHI9xyY',
        lengthInSeconds: 4005,
        tutorialAssoc: 1
      }, {
        title: 'AngularJS 2.0: Overview',
        src: 'https://www.youtube.com/embed/8P8NO8X-mQ',
        lengthInSeconds: 3647,
        tutorialAssoc: 2
      },{
        title: 'Rob McDiarmid - Getting Started with Angular 2',
        src: 'https://www.youtube.com/embed/s0xootlbudI',
        lengthInSeconds: 2817,
        tutorialAssoc: 2
      },{
        title: 'What’s new in AngularJS 2.0 in 3 minutes!',
        src: 'https://www.youtube.com/embed/fBeuaDOBk3s',
        lengthInSeconds: 2817,
        tutorialAssoc: 2
      },{
        title: 'Mitosis: The Phases, Part 1 of 2, from Thinkwell Biology',
        src: 'https://www.youtube.com/embed/HnThXwKtnSE',
        lengthInSeconds: 432,
        tutorialAssoc: 3
      },{
        title: 'Mitosis: Mitosis: The Phases, Part 2 of 2 from Thinkwell Biology',
        src: 'https://www.youtube.com/embed/KRKFMbBizos',
        lengthInSeconds: 434,
        tutorialAssoc: 3
      },{
        title: 'How to Stop Puppy Biting and Don’t Do These 5 Things When Training Your Puppy',
        src: 'https://www.youtube.com/embed/1H1JGfzaW9A',
        lengthInSeconds: 623,
        tutorialAssoc: 4
      },{
        title: 'How to train your puppy not to bite',
        src: 'https://www.youtube.com/embed/c77--cCHPyU',
        lengthInSeconds: 523,
        tutorialAssoc: 4
      },{
        title: 'Beatles - Here Comes the Sun - Ukulele Tutorial',
        src: 'https://www.youtube.com/embed/dkHnjEikI_Y',
        lengthInSeconds: 549,
        tutorialAssoc: 5
      },{
        title: 'Here Comes the Sun - The Beatles: Ukulele Free Lesson with Tabs',
        src: 'https://www.youtube.com/embed/M6hlLtpXSZg',
        lengthInSeconds: 578,
        tutorialAssoc: 5
      },{
        title: 'Character Development Tips for Fiction Writers (Part 1)',
        src: 'https://www.youtube.com/embed/6YnPhR2xg_c',
        lengthInSeconds: 360,
        tutorialAssoc: 6
      },{
        title: 'How To Draw Funny Cartoon Posture (Step by Step)',
        src: 'https://www.youtube.com/embed/uCdUAvTQF2Q',
        lengthInSeconds: 301,
        tutorialAssoc: 7
      },{
        title: 'Single Malt Whiskey (for the home distiller) episode #1.mov',
        src: 'https://www.youtube.com/embed/xptvVFoZ_pE',
        lengthInSeconds: 834,
        tutorialAssoc: 8
      },{
        title: 'How Toilets Work',
        src: 'https://www.youtube.com/embed/LzFIPUJghsQ',
        lengthInSeconds: 270,
        tutorialAssoc: 9
      },{
        title: '5 Weird Ways To Start A Fire',
        src: 'https://www.youtube.com/embed/c-vUeAXjQTw',
        lengthInSeconds: 891,
        tutorialAssoc: 10
      }];

      async.eachSeries(TEST_VIDEOS, function findOrCreateEachFakeVideo(fakeVideo, next){

        Video.findOne({
          title: fakeVideo.title
        }).exec(function (err, existingVideo){

          if (err) return next(err);

          if (existingVideo) {
            return next();
          }

          Video.create({
            title: fakeVideo.title,
            src: fakeVideo.src,
            lengthInSeconds: fakeVideo.lengthInSeconds,
            tutorialAssoc: fakeVideo.tutorialAssoc
          }).exec(function (err){
            if (err) return next(err);
            return next();
          });
        });

      }, function afterwards(err) {
        if (err) return cb(err);

        return cb();
      });
    });
  });
};