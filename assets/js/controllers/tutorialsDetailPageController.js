angular.module('brushfire').controller('tutorialsDetailPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

  // set-up loading state
  $scope.tutorialDetails = {
    loading: false
  };

$scope.me = window.SAILS_LOCALS.me;

  
}]);