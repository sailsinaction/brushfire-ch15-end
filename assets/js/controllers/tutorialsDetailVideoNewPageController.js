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
    loading: false,
    invalidUrl: false
  };

  $scope.src = '/images/preview.jpg';

  $scope.me = window.SAILS_LOCALS.me;

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

$scope.parseUrl = function(){

  $scope.tutorialsDetailVideoNew.invalidUrl = false;

  var rawUrl = document.createElement('a');

  rawUrl.href = $scope.src;

  console.log(rawUrl.search.indexOf('&'))

  if (rawUrl.search.indexOf('&')>0) {

    YouTubeCode = rawUrl.search.substring(rawUrl.search.indexOf('=')+1, rawUrl.search.indexOf('&'));

    $scope.src = 'https://www.youtube.com/embed/'+ YouTubeCode;

    return;

  } else if (rawUrl.search.indexOf('=')>0) {

    var YouTubeCode = rawUrl.search.substring(rawUrl.search.indexOf("=") + 1, rawUrl.search.length);

    $scope.src = 'https://www.youtube.com/embed/'+ YouTubeCode;

    return;

  } else {

    console.log('made it here');

    $scope.tutorialsDetailVideoNew.invalidUrl = true;
  }

};

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