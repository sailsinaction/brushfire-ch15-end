angular.module('brushfire').controller('homePageController', ['$location', '$scope', '$http', 'toastr', function($location, $scope, $http, toastr) {

  // set-up loading state
  $scope.loginForm = {
    loading: false
  };

  $scope.me = window.SAILS_LOCALS.me;

  }]);