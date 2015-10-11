angular.module('brushfire').controller('tutorialsDetailVideoNewPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

  // set-up loading state
  $scope.tutorialsDetailVideoNew = {
    iframeHide: false,
    loading: false
  };

  $scope.src = '/images/preview.jpg';

$scope.me = window.SAILS_LOCALS.me;

$scope.saveVideo = function(tutorialId) {

  $http.post('/tutorials/'+tutorialId+'/videos', {
    tutorialId: tutorialId,
    title: $scope.title,
    src: $scope.src,
    minutes: $scope.minutes,
    seconds: $scope.seconds
  })
  .then(function onSuccess(sailsResponse){

    console.log(sailsResponse);
  })
  .catch(function onError(sailsResponse){

    console.log(sailsResponse);
  })
  .finally(function eitherWay(sailsResponse){


  });

};
}]);