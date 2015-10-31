angular.module('brushfire').controller('tutorialsDetailNewPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

/*
   ____          _____                _           
  / __ \        |  __ \              | |          
 | |  | |_ __   | |__) |___ _ __   __| | ___ _ __ 
 | |  | | '_ \  |  _  // _ \ '_ \ / _` |/ _ \ '__|
 | |__| | | | | | | \ \  __/ | | | (_| |  __/ |   
  \____/|_| |_| |_|  \_\___|_| |_|\__,_|\___|_|   
                                                                                                  
*/

  // set-up loading state
  $scope.tutorialDetailsNew = {
    loading: false
  };

  $scope.me = window.SAILS_LOCALS.me;

/* 
  _____   ____  __  __   ______               _       
 |  __ \ / __ \|  \/  | |  ____|             | |      
 | |  | | |  | | \  / | | |____   _____ _ __ | |_ ___ 
 | |  | | |  | | |\/| | |  __\ \ / / _ \ '_ \| __/ __|
 | |__| | |__| | |  | | | |___\ V /  __/ | | | |_\__ \
 |_____/ \____/|_|  |_| |______\_/ \___|_| |_|\__|___/

*/

  $scope.createTutorial = function() {

    $scope.tutorialDetailsNew.loading = true;

    $http.post('/tutorials', {
      title: $scope.tutorialDetailsNew.title,
      description: $scope.tutorialDetailsNew.description
    })
    .then(function onSuccess(sailsResponse){

      window.location='/tutorials/'+sailsResponse.data.id;

    })
    .catch(function onError(sailsResponse){
      console.error(sailsResponse);
    })
    .finally(function eitherWay(){
      $scope.tutorialDetailsNew.loading = false;
    });
  };
}]);