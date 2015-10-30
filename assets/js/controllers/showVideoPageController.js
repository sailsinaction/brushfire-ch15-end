angular.module('brushfire').controller('showVideoPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

  // set-up loading state
  $scope.showVideo = {
    loading: false
  };

  // Get the tutorial id form the current URL path:  /tutorials/55/videos/edit
  $scope.fromUrlTutorialId = window.location.pathname.split('/')[2];

  $scope.me = window.SAILS_LOCALS.me;
  
}]);