angular.module('brushfire').controller('homePageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {

  $scope.me = window.SAILS_LOCALS.me;

  // set-up loading state
  $scope.loading = false;
  $scope.results = false;

  $scope.max = 5;
  $scope.isReadonly = true;

  // $scope.ratingStates = [
  //   {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
  //   {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
  //   {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
  //   {stateOn: 'glyphicon-heart'},
  //   {stateOff: 'glyphicon-off'}
  // ];
  

  $scope.search = function() {
    $scope.loading = true;

    $http.get('/tutorials/search')
    .then(function onSuccess(sailsResponse) {

      console.log('sailsResponse: ', sailsResponse);

      $scope.tutorials = sailsResponse.data.tutorials;

      $scope.results = true;

    })
    .catch(function onError(sailsResponse) {
      
      // Otherwise, this is some weird unexpected server error. 
      // Or maybe your WIFI just went out.
      console.error('sailsResponse: ', sailsResponse);
    })
    .finally(function eitherWay() {
        $scope.loading = false;
    });
  };


  }]);