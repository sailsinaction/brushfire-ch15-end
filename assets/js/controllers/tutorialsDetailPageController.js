angular.module('brushfire').controller('tutorialsDetailPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {

/*
   ____          _____                _           
  / __ \        |  __ \              | |          
 | |  | |_ __   | |__) |___ _ __   __| | ___ _ __ 
 | |  | | '_ \  |  _  // _ \ '_ \ / _` |/ _ \ '__|
 | |__| | | | | | | \ \  __/ | | | (_| |  __/ |   
  \____/|_| |_| |_|  \_\___|_| |_|\__,_|\___|_|   
                                                                                                    
*/

  // Grab any locals from the me property on the windows object
  $scope.me = window.SAILS_LOCALS.me;

  // Get the tutorial id form the current URL path:  /tutorials/1
  $scope.fromUrlTutorialId = window.location.pathname.split('/')[2];

  // Grab the number of stars (in a local) for this tutorial from the stars
  // property of the window object
  $scope.tutorial = window.SAILS_LOCALS.tutorial;

  // set-up loading state
  $scope.tutorialDetails = {
    loading: false,

    // This is a separate loading state for the delete button
    deleteTutorialLoading: false,
    deleteVideoLoading: false
  };

  // We need a max for the stars (i.e. 1 out of 5 stars)
  $scope.max = 5;

  // Initial state for the rating directives.
  // Show change rating button initially

  
  // $scope.myRating = 4;
  $scope.myRating = $scope.tutorial.myRating;
  // $scope.averageRating = 4;
  $scope.averageRating = $scope.tutorial.averageRating;  // TODO: use window.SAILS_LOCALS... instead of sailsResponse.data.averageStars;

  if ($scope.myRating) {
    $scope.hideChangeRating = false;
    $scope.isReadonly = true;
  } else {
    $scope.hideChangeRating = true;
    $scope.isReadonly = false;
  }


/* 
  _____   ____  __  __   ______               _       
 |  __ \ / __ \|  \/  | |  ____|             | |      
 | |  | | |  | | \  / | | |____   _____ _ __ | |_ ___ 
 | |  | | |  | | |\/| | |  __\ \ / / _ \ '_ \| __/ __|
 | |__| | |__| | |  | | | |___\ V /  __/ | | | |_\__ \
 |_____/ \____/|_|  |_| |______\_/ \___|_| |_|\__|___/

*/

  // When you click the "Change" button for your rating...
  $scope.changeRating = function() {
    // (sets myRating to editable mode)
    $scope.isReadonly = false;
    $scope.hideChangeRating=true;
  };

  // When you hover over "My stars" in edit mode....
  // $scope.hoveringOver = function(rating, tutorialId) {

  //   // The `id` of the tutorial, we'll need it for the $watch below because
  //   // we can't pass the `id` in the $watch function
  //   $scope.tutorialId = tutorialId;

  //   // The number of stars currently being hovered over
  //   $scope.overStar = rating;
  // };

var origRating = $scope.myRating;
  // When the user changes their rating or sets their initial rating by
  // clicking on the stars in our fancy directive, it changes the `myRating` property
  // on our $scope (which is an ng-model or something) so this watch function fires...
  $scope.$watch('myRating', function(rating) {

    // This disables the rating element between AJAX PUT requests (e.g. double posting)
    if ($scope.tutorialDetails.loading) {
      return;
    }
    
    if (rating !== origRating) {
      $scope.tutorialDetails.loading = true;
      $http.put('/tutorials/' + $scope.fromUrlTutorialId + '/rate', {
        stars: rating
      })
      .then(function onSuccess(sailsResponse) {

        toastr.success('Your rating has been saved', 'Rating', {
          closeButton: true
        });

        // Sets myRating to read-only
        $scope.isReadonly = true;
        $scope.hideChangeRating = false;


        // Now, also update the average rating.
        $scope.averageRating = sailsResponse.data.averageRating;

      })
      .catch(function onError(sailsResponse) {
        console.error(sailsResponse);
      })
      .finally(function eitherWay() {
        $scope.tutorialDetails.loading = false;
      });
    }
  });

  // When you click on a video...
  $scope.editVideo = function(e, videoId) {

    e.preventDefault();

    // Redirect to the edit page using the tutorial `id` and the video `id`
    window.location = '/tutorials/' + $scope.fromUrlTutorialId + '/videos/' + videoId + '/edit';
  };

  // When you click the "Delete tutorial" button...
  $scope.deleteTutorial = function(id) {

    $scope.tutorialDetails.deleteTutorialLoading = true;

    $http.delete('/tutorials/'+id)
    .then(function onSuccess(sailsResponse){

      window.location = "/" + sailsResponse.data.username;

    })
    .catch(function onError(sailsResponse){
      console.error(sailsResponse);
    })
    .finally(function eitherWay(){
      
    });

  };

  // When you click the up arrow next to a video...
  $scope.moveVideoUp = function(e, videoId) {

    e.preventDefault();
    e.stopPropagation();

    // With refresh:
    // 
    // TODO: lock UI
    // TODO: show loading state
    $http.post('/videos/'+videoId+'/up')
    .then(function (sailsResponse) {
      console.log('moved video up!');
      console.log(sailsResponse);

      // Refresh the page
      location.reload();
    })
    .catch(function (sailsResponse) {
      console.error(sailsResponse);
    });

  };

  // When you click the down arrow next to a video...
  $scope.moveVideoDown = function(e, videoId) {

    e.preventDefault();
    e.stopPropagation();

    // With refresh:
    // 
    // TODO: lock UI
    // TODO: show loading state
    $http.post('/videos/'+videoId+'/down')
    .then(function (sailsResponse) {
      console.log('moved video down!');

      // Refresh the page
      location.reload();
    })
    .catch(function (sailsResponse) {
      console.error(sailsResponse);
    });

  };

  // When you click the delete button next to a video...
  $scope.deleteVideo = function(e, videoId, index) {

    e.preventDefault();
    e.stopPropagation();

    $scope.tutorialDetails.deleteVideoLoading = index;

    $http.delete('/videos/'+videoId+'?tutorialId='+$scope.fromUrlTutorialId)
    .then(function onSuccess(sailsResponse){

      $scope.tutorialDetails.deleteVideoLoading = false;

      // Head back to the profile that is editing the tutorial
      // Simulated for now.
      window.location = '/tutorials/' + $scope.fromUrlTutorialId;
      
    })
    .catch(function onError(sailsResponse){
      console.error(sailsResponse);
    })
    .finally(function eitherWay(){
      
    });
  };
}]);