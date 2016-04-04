angular.module('brushfire').controller('passwordRecoveryPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

/*
   ____          _____                _           
  / __ \        |  __ \              | |          
 | |  | |_ __   | |__) |___ _ __   __| | ___ _ __ 
 | |  | | '_ \  |  _  // _ \ '_ \ / _` |/ _ \ '__|
 | |__| | | | | | | \ \  __/ | | | (_| |  __/ |   
  \____/|_| |_| |_|  \_\___|_| |_|\__,_|\___|_|   
                                                  
                                                  
*/

  $scope.passwordRecoveryForm = {
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

  $scope.recoverPassword = function() {
    
    $scope.passwordRecoveryForm.loading = true;

    $http.put('/user/generate-recovery-email', {
      email: $scope.passwordRecoveryForm.email
    })
    .then(function onSuccess(sailsResponse){

      window.location = '/password-recovery-email-sent';
    })
    .catch(function onError(sailsResponse) {

      if (sailsResponse.status === 404) {
          
        toastr.error('There isn\'t an account with that email address.', 'Error', {
          closeButton: true
        });
        return;
      }
      
      console.error(sailsResponse);

    })
    .finally(function eitherWay() {
      $scope.passwordRecoveryForm.loading = false;
    });

  };

}]);