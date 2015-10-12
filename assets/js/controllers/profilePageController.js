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

  $scope.removeProfile = function() {

    // console.log('the change userprofile is: ', $scope.userProfile);

    // var theRoute = '/user/removeProfile/' + $scope.userProfile.properties.id;
    // var theRoute = '/user/removeProfile/' + $scope.me.id;
    // var theRoute = '/user/removeProfile';
    $http.put('/user/remove-profile', {
        deleted: true
      })
      .then(function onSuccess(sailsResponse) {

        // console.log('sailsResponse: ', sailsResponse);
          // $scope.userProfile.properties.gravatarURL = sailsResponse.data.gravatarURL;
          window.location = '/profile/restore';
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
}]);