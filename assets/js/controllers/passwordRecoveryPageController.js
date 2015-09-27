angular.module('brushfire').controller('passwordRecoveryPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

  $scope.passwordRecoveryForm = {
    loading: false,
    errorMsg: ''
  };

  $scope.recoverPassword = function() {
    
    $scope.passwordRecoveryForm.loading = true;

    $http.put('/user/recover-password', {
      email: $scope.passwordRecoveryForm.email
    })
    .then(function onSuccess(sailsResponse){
      console.log(sailsResponse);

      window.location = '/password-recovery-email-sent';
    })
    .catch(function onError(sailsResponse) {
      
      console.log(sailsResponse);

    })
    .finally(function eitherWay() {
      $scope.passwordRecoveryForm.loading = false;
    });

  };

}]);