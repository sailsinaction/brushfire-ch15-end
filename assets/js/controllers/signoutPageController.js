angular.module('brushfire').controller('signoutPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {

  /* 
  _____   ____  __  __   ______               _       
 |  __ \ / __ \|  \/  | |  ____|             | |      
 | |  | | |  | | \  / | | |____   _____ _ __ | |_ ___ 
 | |  | | |  | | |\/| | |  __\ \ / / _ \ '_ \| __/ __|
 | |__| | |__| | |  | | | |___\ V /  __/ | | | |_\__ \
 |_____/ \____/|_|  |_| |______\_/ \___|_| |_|\__|___/

*/

  $scope.signout = function() {
    $http.post('/logout')
    .then(function onSuccess(sailsReponse){

      window.location = '/';

    })
    .catch (function onError(sailsResponse){
      console.error(sailsResponse);
    })
    .finally(function eitherWay(){

    });
  };
}]);