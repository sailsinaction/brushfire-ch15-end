angular.module('brushfire').controller('tutorialsDetailVideoNewPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

/*
   ____          _____                _           
  / __ \        |  __ \              | |          
 | |  | |_ __   | |__) |___ _ __   __| | ___ _ __ 
 | |  | | '_ \  |  _  // _ \ '_ \ / _` |/ _ \ '__|
 | |__| | | | | | | \ \  __/ | | | (_| |  __/ |   
  \____/|_| |_| |_|  \_\___|_| |_|\__,_|\___|_|   
                                                                                                    
*/

  // set-up loading state
  $scope.tutorialsDetailVideoNew = {
    iframeHide: false,
    loading: false
  };

  $scope.src = '/images/preview.jpg';

  $scope.me = window.SAILS_LOCALS.me;

/* 
  _____   ____  __  __   ______               _       
 |  __ \ / __ \|  \/  | |  ____|             | |      
 | |  | | |  | | \  / | | |____   _____ _ __ | |_ ___ 
 | |  | | |  | | |\/| | |  __\ \ / / _ \ '_ \| __/ __|
 | |__| | |__| | |  | | | |___\ V /  __/ | | | |_\__ \
 |_____/ \____/|_|  |_| |______\_/ \___|_| |_|\__|___/

*/

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