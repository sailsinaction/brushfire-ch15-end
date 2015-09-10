angular.module('brushfire').controller('profilePageController', ['$location', '$routeParams', '$scope', '$http', function($location, $routeParams, $scope, $http){

  // Just a hack so we can type `SCOPE` in the Chrome inspector.
  SCOPE=$scope;

  $scope.me = window.SAILS_LOCALS.me;

  /////////////////////////////////////////////////////////////////////////////////
  // When HTML is rendered... (i.e. when the page loads)
  /////////////////////////////////////////////////////////////////////////////////

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

  // Build up route
  // var theRoute = '/user/profile/' +  $routeParams.id;

  // // Submit GET request to /user/profile/:id
  // $http.get(theRoute)
  // .then(function onSuccess(sailsResponse){
  //   // console.log('sailsResponse.data.deleted: ', sailsResponse.data.deleted);
  //   // console.log('sailsResponse: ', sailsResponse);

  //   // If deleted profile remove interface and show message.
  //   if (sailsResponse.data.deleted === true) {
  //     $scope.userProfile.errorMsg = 'No profile found.';
  //     return $scope.userProfile.noProfile = true;
  //   }
  //   // console.log(sailsResponse.data.id);
  //   // window.location = '#/profile/' + sailsResponse.data.id;
  //   // console.log('The response is: ', sailsResponse);
  //   $scope.userProfile.properties.email = sailsResponse.data.email;
  //   $scope.userProfile.properties.username = sailsResponse.data.username;
  //   $scope.userProfile.properties.admin = sailsResponse.data.admin;
  //   $scope.userProfile.properties.banned = sailsResponse.data.banned;
  //   $scope.userProfile.properties.gravatarURL = sailsResponse.data.gravatarURL;
  //   $scope.userProfile.properties.id = sailsResponse.data.id;

  //   $scope.userProfile.loading = false;
  // })
  // .catch(function onError(sailsResponse){
  //   // console.log(sailsResponse);

  //   // If no profile found remove interface and show error message.    
  //   if(sailsResponse.status === 404) {
  //     $scope.userProfile.noProfile = true;
  //     $scope.userProfile.errorMsg = 'No profile found.';
  //     return;
  //   }

  //   // Handle all other errors
  //   $scope.userProfile.errorMsg = 'An unexpected error occurred: '+(sailsResponse.data||sailsResponse.status);

  // })
  // .finally(function eitherWay(){
  //   $scope.userProfile.loading = false;
  // });

  $scope.removeProfile = function() {

    // console.log('the change userprofile is: ', $scope.userProfile);

    // var theRoute = '/user/removeProfile/' + $scope.userProfile.properties.id;
    // var theRoute = '/user/removeProfile/' + $scope.me.id;
    // var theRoute = '/user/removeProfile';
    $http.put('/user/removeProfile', {
        deleted: true
      })
      .then(function onSuccess(sailsResponse) {

        // console.log('sailsResponse: ', sailsResponse);
          // $scope.userProfile.properties.gravatarURL = sailsResponse.data.gravatarURL;
          window.location = '/signup';
          // 
          // toastr.success('Password Updated!');

        $scope.userProfile.loading = false;
      })
      .catch(function onError(sailsResponse) {
        // console.log('sailsresponse: ', sailsResponse)
        // Otherwise, display generic error if the error is unrecognized.
        $scope.userProfile.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

      })
      .finally(function eitherWay() {
        $scope.loading = false;
      });
  };

  $scope.deleteProfile = function() {

    var theRoute = 'user/delete/' + $routeParams.id;

    $http.delete(theRoute)
    .then(function onSuccess(deletedProfile){
      window.location = '#/signup';
    })
    .catch(function onError(err){
      $scope.userProfile.errorMsg = 'An unexpected error occurred: ' + err;
    });
  };

}]);