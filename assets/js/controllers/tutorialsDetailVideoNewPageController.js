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
    iframeHide: true,
    loading: false,
    invalidUrl: false,
    hasSrc: false,
  };

  // Get the tutorial id form the current URL path:  /tutorials/1/videos/new
  $scope.fromUrlTutorialId = window.location.pathname.split('/')[2];

  // $scope.src = '/images/preview.jpg';

  $scope.me = window.SAILS_LOCALS.me;

  // Get the tutorials number of stars
  $scope.tutorial = {
    stars: window.SAILS_LOCALS.tutorial.stars
  };

  // We need a max for the stars (i.e. 1 out of 5 stars)
  $scope.max = 5;

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

    $scope.tutorialsDetailVideoNew.invalidUrl = false;

    var rawUrl = document.createElement('a');

    rawUrl.href = $scope.src;

    if (rawUrl.search.indexOf('&')>0) {

      YouTubeCode = rawUrl.search.substring(rawUrl.search.indexOf('=')+1, rawUrl.search.indexOf('&'));

      $scope.src = 'https://www.youtube.com/embed/'+ YouTubeCode;

      return;

    } else if (rawUrl.search.indexOf('=')>0) {

      var YouTubeCode = rawUrl.search.substring(rawUrl.search.indexOf("=") + 1, rawUrl.search.length);

      $scope.src = 'https://www.youtube.com/embed/'+ YouTubeCode;

      $scope.tutorialsDetailVideoNew.hasSrc = true;
      $scope.tutorialsDetailVideoNew.iframeHide = false;

      return;

    } else {

      $scope.tutorialsDetailVideoNew.invalidUrl = true;
    }

  };

  $scope.addvideo = function() {

    console.log('made it to addVideo');

    $http.post('/tutorials/'+$scope.fromUrlTutorialId+'/videos', {
      owner: $scope.fromUrlTutorialId,
      title: $scope.title,
      src: $scope.src,
      hours: $scope.hours,
      minutes: $scope.minutes,
      seconds: $scope.seconds
    })
    .then(function onSuccess(sailsResponse){

      window.location = "/tutorials/"+$scope.fromUrlTutorialId;
    })
    .catch(function onError(sailsResponse){

      console.error(sailsResponse);
    })
    .finally(function eitherWay(sailsResponse){
    });
  };
}]);