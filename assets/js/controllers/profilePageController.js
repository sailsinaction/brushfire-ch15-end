angular.module('brushfire').controller('profilePageController', ['$scope', '$http', function($scope, $http){

/*
   ____          _____                _           
  / __ \        |  __ \              | |          
 | |  | |_ __   | |__) |___ _ __   __| | ___ _ __ 
 | |  | | '_ \  |  _  // _ \ '_ \ / _` |/ _ \ '__|
 | |__| | | | | | | \ \  __/ | | | (_| |  __/ |   
  \____/|_| |_| |_|  \_\___|_| |_|\__,_|\___|_|   
                                                  
                                                  
*/

  // Just a hack so we can type `SCOPE` in the Chrome inspector.
  SCOPE=$scope;

  $scope.me = window.SAILS_LOCALS.me;
  $scope.frontEnd = window.SAILS_LOCALS.frontEnd;

  $scope.numOfTutorials = $scope.frontEnd.numOfTutorials;
  $scope.numOfFollowers = $scope.frontEnd.numOfFollowers;
  $scope.numOfFollowing = $scope.frontEnd.numOfFollowing;
  $scope.followedByLoggedInUser = $scope.frontEnd.followedByLoggedInUser;

  // Get the tutorial id form the current URL path:  /tutorials/1
  $scope.fromUrlTutorialId = window.location.pathname.split('/')[1];

  // Set up initial objects
  // (kind of like our schema for the page)
  $scope.userProfile = {
    properties: {},
    errorMsg: '',
    saving: false,
    loading: false,
    noProfile: false
  };

  $scope.userProfile.loading = true;

/* 
  _____   ____  __  __   ______               _       
 |  __ \ / __ \|  \/  | |  ____|             | |      
 | |  | | |  | | \  / | | |____   _____ _ __ | |_ ___ 
 | |  | | |  | | |\/| | |  __\ \ / / _ \ '_ \| __/ __|
 | |__| | |__| | |  | | | |___\ V /  __/ | | | |_\__ \
 |_____/ \____/|_|  |_| |______\_/ \___|_| |_|\__|___/

*/

  $scope.followOrUnfollow = function() {

    $scope.userProfile.loading = true;

    if ($scope.followedByLoggedInUser) {
      $http.put('/user/unfollow/', {
        username: $scope.fromUrlTutorialId
      })
      .then(function success(sailsResponse){
        $scope.followedByLoggedInUser = false;
        $scope.userProfile.loading = false;
        $scope.numOfFollowers = sailsResponse.data.numOfFollowers;
        $scope.numOfFollowing = sailsResponse.data.numOfFollowing;
      })
      .catch(function onError(sailsResponse){
        console.error(sailsResponse);

      })
      .finally(function eitherWay(){
        $scope.userProfile.loading = false;
      });

    }

    if (!$scope.followedByLoggedInUser) {
      $http.put('/user/follow/', {
        username: $scope.fromUrlTutorialId
      })
      .then(function success(sailsResponse){
        console.log(sailsResponse);
        console.log('hit follow')
        $scope.followedByLoggedInUser = true;
        $scope.userProfile.loading = false;
        $scope.numOfFollowers = sailsResponse.data.numOfFollowers;
        $scope.numOfFollowing = sailsResponse.data.numOfFollowing;
      })
      .catch(function onError(sailsResponse){
        console.error(sailsResponse);

      })
      .finally(function eitherWay(){
        $scope.userProfile.loading = false;
      });
    }
  };

  $scope.removeProfile = function() {

    $scope.userProfile.loading = true;

    // var theRoute = '/user/removeProfile/' + $scope.userProfile.properties.id;
    // var theRoute = '/user/removeProfile/' + $scope.me.id;
    // var theRoute = '/user/removeProfile';
    $http.put('/user/remove-profile', {
      deleted: true
    })
    .then(function onSuccess(sailsResponse) {
      // $scope.userProfile.properties.gravatarURL = sailsResponse.data.gravatarURL;
      window.location = '/profile/restore';
      // 
      // toastr.success('Password Updated!');
    })
    .catch(function onError(sailsResponse) {
      // Otherwise, display generic error if the error is unrecognized.
      $scope.userProfile.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

    })
    .finally(function eitherWay() {
      $scope.userProfile.loading = false;
    });
  };

}]);