angular.module('brushfire').controller('restoreProfilePageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

  $scope.restoreProfileForm = {
    loading: false,
    errorMsg: ''
  };

  $scope.restoreProfile = function() {
    
    $scope.restoreProfileForm.loading = true;

    $http.put('/user/restore-profile', {
      email: $scope.restoreProfileForm.email,
      password: $scope.restoreProfileForm.password
    })
    .then(function onSuccess(sailsResponse){
      console.log(sailsResponse);

      window.location = '/' + sailsResponse.data[0].username;
    })
    .catch(function onError(sailsResponse) {
      console.log('sailsresponse: ', sailsResponse)
      // Otherwise, display generic error if the error is unrecognized.
      // $scope.restoreProfileForm.errorMsg = 'Email/Password combination does not match profile';
      if (sailsResponse.data.status >= 400 < 404) {
        $scope.restoreProfileForm.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);
        toastr.error('The email/password combination did not match a user profile.','', { timeOut: 1000 });
        return;
      }

    })
    .finally(function eitherWay() {
      $scope.restoreProfileForm.loading = false;
    });

  };

}]);