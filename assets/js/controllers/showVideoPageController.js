angular.module('brushfire').controller('showVideoPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){


/*
   ____          _____                _           
  / __ \        |  __ \              | |          
 | |  | |_ __   | |__) |___ _ __   __| | ___ _ __ 
 | |  | | '_ \  |  _  // _ \ '_ \ / _` |/ _ \ '__|
 | |__| | | | | | | \ \  __/ | | | (_| |  __/ |   
  \____/|_| |_| |_|  \_\___|_| |_|\__,_|\___|_|   
                                                                                                    
*/
 
  // set-up loading state
  $scope.showVideo = {
    loading: false
  };

  $scope.hasJoinedRoom = true;

  $scope.me = window.SAILS_LOCALS.me;

  // Get the video id form the current URL path:  /tutorials/1/videos/3/show
  $scope.fromUrlVideoId = window.location.pathname.split('/')[4];

  // Expose chats on the scope so we can render them with ng-repeat.
  $scope.chats = window.SAILS_LOCALS.chats;

/* 
  _____   ____  __  __   ______               _       
 |  __ \ / __ \|  \/  | |  ____|             | |      
 | |  | | |  | | \  / | | |____   _____ _ __ | |_ ___ 
 | |  | | |  | | |\/| | |  __\ \ / / _ \ '_ \| __/ __|
 | |__| | |__| | |  | | | |___\ V /  __/ | | | |_\__ \
 |_____/ \____/|_|  |_| |______\_/ \___|_| |_|\__|___/

*/

  // Send chat to the chat action of the video controller
  $scope.sendMessage = function() {

    $http.post('/videos/'+$scope.fromUrlVideoId+'/chat', {
      message: $scope.message
    })
    .then(function onSuccess(sailsResponse){
      console.log('sailsResponse: ', sailsResponse);
    })
    .catch(function onError(sailsResponse){
      console.error('sailsresponse: ', sailsResponse);
    })
    .finally(function eitherway(){

    });
  };
}]);