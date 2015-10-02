angular.module('brushfire').controller('showVideoPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

  // set-up loading state
  $scope.showVideo = {
    loading: false
  };

$scope.me = window.SAILS_LOCALS.me;

  
}]);