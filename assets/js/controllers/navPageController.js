angular.module('brushfire').controller('navPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {

  //Set-up loading state
  $scope.loginForm = {};

  $scope.me = window.SAILS_LOCALS.me;

}]);