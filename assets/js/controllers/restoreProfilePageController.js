angular.module('brushfire').controller('restoreProfilePageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

/*
   ____          _____                _           
  / __ \        |  __ \              | |          
 | |  | |_ __   | |__) |___ _ __   __| | ___ _ __ 
 | |  | | '_ \  |  _  // _ \ '_ \ / _` |/ _ \ '__|
 | |__| | | | | | | \ \  __/ | | | (_| |  __/ |   
  \____/|_| |_| |_|  \_\___|_| |_|\__,_|\___|_|   
                                                                                                  
*/

  $scope.restoreProfileForm = {
    loading: false,
    errorMsg: ''
  };

/* 
  _____   ____  __  __   ______               _       
 |  __ \ / __ \|  \/  | |  ____|             | |      
 | |  | | |  | | \  / | | |____   _____ _ __ | |_ ___ 
 | |  | | |  | | |\/| | |  __\ \ / / _ \ '_ \| __/ __|
 | |__| | |__| | |  | | | |___\ V /  __/ | | | |_\__ \
 |_____/ \____/|_|  |_| |______\_/ \___|_| |_|\__|___/

*/

  $scope.restoreProfile = function() {
    
    $scope.restoreProfileForm.loading = true;

    $http.put('/user/restore-profile', {
      email: $scope.restoreProfileForm.email,
      password: $scope.restoreProfileForm.password
    })
    .then(function onSuccess(sailsResponse){
      console.log(sailsResponse);

      window.location = '/' + sailsResponse.data.username;
    })
    .catch(function onError(sailsResponse) {
      console.error('sailsresponse: ', sailsResponse)
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