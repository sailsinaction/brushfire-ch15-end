angular.module('brushfire').controller('tutorialsDetailPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

  // set-up loading state
  $scope.tutorialDetails = {
    loading: false
  };

  $scope.editVideo = function() {
    window.location="/tutorial/1/video/edit";
  }

$scope.me = window.SAILS_LOCALS.me;

  
}]);