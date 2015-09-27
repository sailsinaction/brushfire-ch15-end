angular.module('brushfire').controller('tutorialsListPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

  // set-up loading state
  $scope.tutorialsList = {
    loading: false
  };

$scope.me = window.SAILS_LOCALS.me;



}]);