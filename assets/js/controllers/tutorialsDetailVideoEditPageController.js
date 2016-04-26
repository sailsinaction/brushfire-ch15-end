angular.module('brushfire').controller('tutorialsDetailVideoEditPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

/*
   ____          _____                _           
  / __ \        |  __ \              | |          
 | |  | |_ __   | |__) |___ _ __   __| | ___ _ __ 
 | |  | | '_ \  |  _  // _ \ '_ \ / _` |/ _ \ '__|
 | |__| | | | | | | \ \  __/ | | | (_| |  __/ |   
  \____/|_| |_| |_|  \_\___|_| |_|\__,_|\___|_|   
                                                                                                    
*/

  // set-up loading state
  $scope.tutorialsDetailVideoEdit = {
    loading: false,
    invalidUrl: false,
  };


  // Get the tutorial id form the current URL path:  /tutorials/55/videos/edit
  $scope.fromUrlTutorialId = window.location.pathname.split('/')[2];

  $scope.me = window.SAILS_LOCALS.me;

  $scope.tutorial = window.SAILS_LOCALS.tutorial;

  // We need a max for the stars (i.e. 1 out of 5 stars)
  $scope.max = 5;

  $scope.id = $scope.tutorial.video.id;
  $scope.title = $scope.tutorial.video.title;
  $scope.src = $scope.tutorial.video.src;
  $scope.hours = $scope.tutorial.video.hours;
  $scope.minutes = $scope.tutorial.video.minutes;
  $scope.seconds = $scope.tutorial.video.seconds;

  // Check to see if there's a video src and display it if there is if not display preview image
  if ($scope.src) {
    $scope.tutorialsDetailVideoEdit.hasSrc = true;
    $scope.tutorialsDetailVideoEdit.iframeHide = false;
  } else {
    $scope.tutorialsDetailVideoEdit.hasSrc = false;
    $scope.src = "/images/preview.jpg";
    $scope.tutorialsDetailVideoEdit.iframeHide = true;
  }
/* 
  _____   ____  __  __   ______               _       
 |  __ \ / __ \|  \/  | |  ____|             | |      
 | |  | | |  | | \  / | | |____   _____ _ __ | |_ ___ 
 | |  | | |  | | |\/| | |  __\ \ / / _ \ '_ \| __/ __|
 | |__| | |__| | |  | | | |___\ V /  __/ | | | |_\__ \
 |_____/ \____/|_|  |_| |______\_/ \___|_| |_|\__|___/

*/

  $scope.parseUrl = function(e){

    e.preventDefault();

    $scope.tutorialsDetailVideoEdit.invalidUrl = false;

    var rawUrl = document.createElement('a');

    rawUrl.href = $scope.src;

    if (rawUrl.search.indexOf('&')>0) {

      YouTubeCode = rawUrl.search.substring(rawUrl.search.indexOf('=')+1, rawUrl.search.indexOf('&'));

      $scope.src = 'https://www.youtube.com/embed/'+ YouTubeCode;

      return;

    } else if (rawUrl.search.indexOf('=')>0) {

      var YouTubeCode = rawUrl.search.substring(rawUrl.search.indexOf("=") + 1, rawUrl.search.length);

      $scope.src = 'https://www.youtube.com/embed/'+ YouTubeCode;

      return;

    } else {

      $scope.tutorialsDetailVideoEdit.invalidUrl = true;
    }

  };

  $scope.submitEditVideoForm = function() {

    $http.put('/videos/'+$scope.id, {
      title: $scope.title,
      src: $scope.src,
      hours: $scope.hours,
      minutes: $scope.minutes,
      seconds: $scope.seconds
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