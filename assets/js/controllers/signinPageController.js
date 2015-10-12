angular.module('brushfire').controller('signinPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {

/*
   ____          _____                _           
  / __ \        |  __ \              | |          
 | |  | |_ __   | |__) |___ _ __   __| | ___ _ __ 
 | |  | | '_ \  |  _  // _ \ '_ \ / _` |/ _ \ '__|
 | |__| | | | | | | \ \  __/ | | | (_| |  __/ |   
  \____/|_| |_| |_|  \_\___|_| |_|\__,_|\___|_|   
                                                                                                  
*/

  //Set-up loading state
  $scope.loginForm = {};

  $scope.me = window.SAILS_LOCALS.me;

  // Set the loading state (i.e. show loading spinner)
    $scope.loginForm.loading = false;  

/* 
  _____   ____  __  __   ______               _       
 |  __ \ / __ \|  \/  | |  ____|             | |      
 | |  | | |  | | \  / | | |____   _____ _ __ | |_ ___ 
 | |  | | |  | | |\/| | |  __\ \ / / _ \ '_ \| __/ __|
 | |__| | |__| | |  | | | |___\ V /  __/ | | | |_\__ \
 |_____/ \____/|_|  |_| |______\_/ \___|_| |_|\__|___/

*/

  $scope.submitLoginForm = function() {

    // Set the loading state (i.e. show loading spinner)
    $scope.loginForm.loading = true;

    // Submit request to Sails.
    $http.put('/login', {
        email: $scope.loginForm.login,
        username: $scope.loginForm.login,
        password: $scope.loginForm.password
      })
      .then(function onSuccess() {
        // Redierct the page now that we've been logged in.
        window.location = '/';
        // window.location = '/';
        // toastr.success('We have a match!', 'Success', {closeButton: true});
      })
      .catch(function onError(sailsResponse) {

        // if (sailsResponse.status === 403) {
        //   // toastr.error('Removed', 'Error', {
        //   //   closeButton: true
        //   // });
        //   window.location = '/restore';
        //   return;
        // }

        // Handle known error type(s).
        // Invalid username / password combination.
        if (sailsResponse.status === 400 || 404) {
          // $scope.loginForm.topLevelErrorMessage = 'Invalid email/password combination.';
          //
          toastr.error('Invalid email or username/password combination.', 'Error', {
            closeButton: true
          });
          return;
        }

        toastr.error('An unexpected error occurred, please try again.', 'Error', {
          closeButton: true
        });
        return;

      })
      .finally(function eitherWay() {
        $scope.loginForm.loading = false;
      });
  };

}]);