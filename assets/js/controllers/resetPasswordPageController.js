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

      window.location='/profile';

    })
    .catch(function onError(sailsResponse) {

      console.log('sailsResponse: ', sailsResponse);

    });
  };

}]);