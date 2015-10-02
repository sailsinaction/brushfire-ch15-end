angular.module('brushfire').controller('tutorialsDetailPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

  $scope.me = window.SAILS_LOCALS.me;
  
  // set-up loading state
  $scope.tutorialDetails = {
    loading: false,
    tutorialLoading: false
  };

  $scope.editVideo = function() {

    // Redirect to the edit action
    window.location="/tutorials/1/videos/edit";
  };

  // Simulate deleting a tutorial
  $scope.deleteTutorial = function() {

    $scope.tutorialDetails.tutorialLoading = true;

    setTimeout(function(){

      $scope.tutorialDetails.tutorialLoading = false;
      window.location="/tutorials/1";

     }, 1000);
  };

    // Simulate deleting a video
  $scope.deleteVideo = function() {

    $scope.tutorialDetails.loading = true;

    setTimeout(function(){

      $scope.tutorialDetails.loading = false;
      window.location="/tutorials/1";

     }, 1000);
  };
}]);