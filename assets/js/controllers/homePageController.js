angular.module('brushfire').controller('homePageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {

  $scope.me = window.SAILS_LOCALS.me;

  // set-up loading state
  $scope.loginForm = {
    loading: false
  };

  $scope.search = function() {

    window.location="/search/demo"
  }


  }]);