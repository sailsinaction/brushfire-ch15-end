angular.module('brushfire').controller('tutorialsDetailPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {

  $scope.me = window.SAILS_LOCALS.me;

  // set-up loading state
  $scope.tutorialDetails = {
    loading: false,
    tutorialLoading: false
  };

  $scope.max = 5;
  $scope.isReadonly = false;

  $scope.hoveringOver = function(value, id) {
    $scope.id = id;
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  // When the user clicks on the rating post the rating
  $scope.$watch('tutorial.stars', function(val, id) {

    function sucess(data) {

      console.log(data);

    }

    function error(response) {

      console.log(response);
      alert("Can't post " + response.data + " Error:" + response.status);
    }

    if (val) {
      console.log(val);
      console.log('the id: ', $scope.id);
      $http.put('/tutorials/' + $scope.id + '/rate', {
        rating: val,
        id: $scope.id
      })
      .then(function onSuccess(sailsResponse) {
        
        console.log(sailsResponse);
        $scope.isReadonly = true;
      })
      .catch(function onError(sailsResponse) {

        console.log(sailsResponse);

      })
      .finally(function eitherWay() {
        $scope.tutorialDetails.loading = false;
      });
    }
  });

  $scope.editVideo = function() {

    // Redirect to the edit action
    window.location = "/tutorials/1/videos/edit";
  };

  // Simulate deleting a tutorial
  $scope.deleteTutorial = function() {

    $scope.tutorialDetails.tutorialLoading = true;

    setTimeout(function() {

      $scope.tutorialDetails.tutorialLoading = false;
      window.location = "/tutorials/1";

    }, 1000);
  };

  // Simulate deleting a video
  $scope.deleteVideo = function() {

    $scope.tutorialDetails.loading = true;

    setTimeout(function() {

      $scope.tutorialDetails.loading = false;
      window.location = "/tutorials/1";

    }, 1000);
  };
}]);