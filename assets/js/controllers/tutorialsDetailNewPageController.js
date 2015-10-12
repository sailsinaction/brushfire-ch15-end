angular.module('brushfire').controller('tutorialsDetailNewPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

  // set-up loading state
  $scope.tutorialDetailsNew = {
    loading: false
  };

  $scope.me = window.SAILS_LOCALS.me;

  $scope.createTutorial = function(username) {

    $http.post('/tutorials/new', {
      username: username,
      title: $scope.tutorialDetailsNew.title,
      description: $scope.tutorialDetailsNew.description
    })
    .then(function onSuccess(sailsResponse){

      window.location='/tutorials/'+sailsResponse.data.id;

    })
    .catch(function onError(sailsResponse){
      console.log(sailsResponse);
    })
    .finally(function eitherWay(){

    });
  };

  
}]);