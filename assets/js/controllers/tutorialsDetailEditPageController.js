angular.module('brushfire').controller('tutorialsDetailEditPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

/*
   ____          _____                _           
  / __ \        |  __ \              | |          
 | |  | |_ __   | |__) |___ _ __   __| | ___ _ __ 
 | |  | | '_ \  |  _  // _ \ '_ \ / _` |/ _ \ '__|
 | |__| | | | | | | \ \  __/ | | | (_| |  __/ |   
  \____/|_| |_| |_|  \_\___|_| |_|\__,_|\___|_|   
                                                                                                  
*/

  // set-up loading state
  $scope.tutorialDetailsEdit = {
    loading: false
  };

  // Get the tutorial id form the current URL path:  /tutorials/1/edit
  $scope.fromUrlTutorialId = window.location.pathname.split('/')[2];

  $scope.me = window.SAILS_LOCALS.me;
  $scope.tutorial = window.SAILS_LOCALS.tutorial;

  $scope.tutorialDetailsEdit.title = $scope.tutorial.title;
  $scope.tutorialDetailsEdit.description = $scope.tutorial.description;
/* 
  _____   ____  __  __   ______               _       
 |  __ \ / __ \|  \/  | |  ____|             | |      
 | |  | | |  | | \  / | | |____   _____ _ __ | |_ ___ 
 | |  | | |  | | |\/| | |  __\ \ / / _ \ '_ \| __/ __|
 | |__| | |__| | |  | | | |___\ V /  __/ | | | |_\__ \
 |_____/ \____/|_|  |_| |______\_/ \___|_| |_|\__|___/

*/

  $scope.submitEditTutorialForm = function() {

    $http.put('/tutorials/'+$scope.fromUrlTutorialId, {
      title: $scope.tutorialDetailsEdit.title,
      description: $scope.tutorialDetailsEdit.description
    })
    .then(function onSuccess(sailsResponse){
      window.location="/tutorials/"+$scope.fromUrlTutorialId;
    })
    .catch(function onError(sailsResponse){
      console.error(sailsResponse);
    })
    .finally(function eitherWay(){

    });
  };
}]);