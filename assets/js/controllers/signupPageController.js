angular.module('brushfire').controller('signupPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

/*
   ____          _____                _           
  / __ \        |  __ \              | |          
 | |  | |_ __   | |__) |___ _ __   __| | ___ _ __ 
 | |  | | '_ \  |  _  // _ \ '_ \ / _` |/ _ \ '__|
 | |__| | | | | | | \ \  __/ | | | (_| |  __/ |   
  \____/|_| |_| |_|  \_\___|_| |_|\__,_|\___|_|   
                                                                                                  
*/

  // set-up loading state
  $scope.signupForm = {
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

  $scope.submitSignupForm = function(){

    // Set the loading state (i.e. show loading spinner)
    $scope.signupForm.loading = true;

    // Submit a POST request to /user [This is using blueprints.]
    // $http.post('/user', {

    // Submit a POST request to Sails. [The signup action has been created.]
    $http.post('/user/signup', {
      email: $scope.signupForm.email,
      username: $scope.signupForm.username.replace(/\s+/g, '-'),
      password: $scope.signupForm.password
    })
    .then(function onSuccess(sailsResponse){

      // Redirect to the profile page [This is after we have a profile page built]
      window.location = '/'+sailsResponse.data.username;
      
      // Redirect to the user blueprint record [This is before we have the profile page built]
      // window.location = '/user/' + sailsResponse.data.id;
    })
    .catch(function onError(sailsResponse){

    // Handle known error type(s).
    if (sailsResponse.status == 409) {
      toastr.error(sailsResponse.data);
      $scope.signupForm.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);
      return;
    }

    // Handle unknown error type(s).
    $scope.signupForm.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

    })
    .finally(function eitherWay(){
      $scope.signupForm.loading = false;
    });
  };

}]);
