angular.module('brushfire').controller('resetPasswordPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {

/*
   ____          _____                _           
  / __ \        |  __ \              | |          
 | |  | |_ __   | |__) |___ _ __   __| | ___ _ __ 
 | |  | | '_ \  |  _  // _ \ '_ \ / _` |/ _ \ '__|
 | |__| | | | | | | \ \  __/ | | | (_| |  __/ |   
  \____/|_| |_| |_|  \_\___|_| |_|\__,_|\___|_|   
                                                                                                  
*/

  $scope.passwordRecoveryToken = window.SAILS_LOCALS.passwordRecoveryToken;

  // Set up initial dictionaries
  // (kind of like our schema for the page)
  $scope.properties = {
    loading: false
  };

/* 
  _____   ____  __  __   ______               _       
 |  __ \ / __ \|  \/  | |  ____|             | |      
 | |  | | |  | | \  / | | |____   _____ _ __ | |_ ___ 
 | |  | | |  | | |\/| | |  __\ \ / / _ \ '_ \| __/ __|
 | |__| | |__| | |  | | | |___\ V /  __/ | | | |_\__ \
 |_____/ \____/|_|  |_| |______\_/ \___|_| |_|\__|___/

*/

  $scope.resetPassword = function() {

    $scope.properties.loading = true;

    $http.put('/user/reset-password', {
      passwordRecoveryToken: $scope.passwordRecoveryToken,
      password: $scope.properties.password
    })
    .then(function onSuccess(sailsResponse) {

      $scope.properties.loading = false;

      // Password successfully changed and user is logged in!
      // Redirect them to the `/profile` page (which they'll now be able to access)
      window.location = '/' + sailsResponse.data.username;

    })
    .catch(function onError(sailsResponse) {

      $scope.properties.loading = false;

      
      // If our Sails action responds with a 404 status code (i.e. `res.notFound()`)
      // then it means the token was invalid (because no real user could be found matching it).
      if (sailsResponse.status === 404) {
        // TODO: show appropriate error message  (hit the toaster)
        console.error('invalid token!', sailsResponse);
        return;
      }

      // Otherwise, this is some weird unexpected server error. 
      // Or maybe your WIFI just went out.
      console.error('sailsResponse: ', sailsResponse);
      // TODO: handle general case error 
    });
  };

}]);