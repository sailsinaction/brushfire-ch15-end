angular.module('brushfire').controller('resetPasswordPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {

  $scope.passwordRecoveryToken = window.SAILS_LOCALS.passwordRecoveryToken;

  /////////////////////////////////////////////////////////////////////////////////
  // When HTML is rendered... (i.e. when the page loads)
  /////////////////////////////////////////////////////////////////////////////////

  // Set up initial dictionaries
  // (kind of like our schema for the page)
  $scope.properties = {};

  $scope.resetPassword = function() {

    $http.put('/user/reset-password', {
      passwordRecoveryToken: $scope.passwordRecoveryToken,
      password: $scope.properties.password
    })
    .then(function onSuccess(sailsResponse) {

      // Password successfully changed and user is logged in!
      // Redirect them to the `/profile` page (which they'll now be able to access)
      window.location='/profile';

    })
    .catch(function onError(sailsResponse) {
      
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