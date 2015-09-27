angular.module('brushfire').controller('homePageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {

  // set-up loading state
  $scope.loginForm = {
    loading: false
  };

  $scope.me = window.SAILS_LOCALS.me;

  }]);