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

  $scope.me = window.SAILS_LOCALS.me;

  // Get the video id form the current URL path:  /tutorials/1/videos/3/show
  $scope.fromUrlVideoId = window.location.pathname.split('/')[4];

  // Expose chats on the scope so we can render them with ng-repeat.
  $scope.chats = window.SAILS_LOCALS.chats;

  // Until we've officially joined the chat room, don't allow chats to be sent.
  $scope.hasJoinedRoom = false;

  // Send a socket request to join the chat room.
  io.socket.put('/videos/'+ $scope.fromUrlVideoId + '/join', function (data, JWR) {
    // If something went wrong, handle the error.
    if (JWR.statusCode !== 200) {
      console.error(JWR);
      // TODO
      return;
    }

    // If the server gave us its blessing and indicated that we were
    // able to successfully join the room, then we'll set that on the
    // scope to allow the user to start sending chats.
    // 
    // Note that, at this point, we'll also be able to start _receiving_ chats.
    $scope.hasJoinedRoom = true;
    // Because io.socket.get() is not an angular thing, we have to call $scope.$apply()
    // in this callback in order for our changes to the scope to actually take effect.
    $scope.$apply();
  });

  // Handle socket events that are fired when a new chat event is sent (.broadcast)
  io.socket.on('video', function (e) {

    // Append the chat we just received    
    $scope.chats.push({
      created: e.data.created,
      username: e.data.username,
      message: e.data.message,
      gravatarURL: e.data.gravatarURL
    });

    // Because io.socket.on() is not an angular thing, we have to call $scope.$apply() in
    // this event handler in order for our changes to the scope to actually take effect.
    $scope.$apply();
  });

  io.socket.on('typing', function (e) {
    console.log('typing!', e);

    $scope.usernameTyping = e.username;
    $scope.typing = true;

    // Because io.socket.on() is not an angular thing, we have to call $scope.$apply()
    // in this event handler in order for our changes to the scope to actually take effect.
    $scope.$apply();
  });

  io.socket.on('stoppedTyping', function (e) {
    console.log('stoppedTyping!', e);

    $scope.typing = false;

    // Because io.socket.on() is not an angular thing, we have to call $scope.$apply()
    // in this event handler in order for our changes to the scope to actually take effect.
    $scope.$apply();
  });

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

    io.socket.post('/videos/'+$scope.fromUrlVideoId+'/chat', {
      message: $scope.message
    }, function (data, JWR){

      // If something went wrong, handle the error.
      if (JWR.statusCode !== 200) {
        console.error(JWR);
        return;
      }

      // Clear out the chat message field.
      // (but rescue its contents first so we can append them)
      var messageWeJustChatted = $scope.message;
      $scope.message = '';

      $scope.$apply();
    });
  };//</sendMessage>

  $scope.whenTyping = function (event) {

    io.socket.request({
      url: '/videos/'+$scope.fromUrlVideoId+'/typing',
      method: 'put'
    }, function (data, JWR){
        // If something went wrong, handle the error.
        if (JWR.statusCode !== 200) {
          console.error(JWR);
          return;
        }
    });
  };//</whenTyping>

  $scope.whenNotTyping = function (event) {

    console.log('ya')

    io.socket.request({
      url: '/videos/'+$scope.fromUrlVideoId+'/stoppedTyping',
      method: 'put'
    }, function (data, JWR){
        // If something went wrong, handle the error.
        if (JWR.statusCode !== 200) {
          console.error(JWR);
          return;
        }
    });
  };//</whenNotTyping>
}]);