angular.module('brushfire').controller('browseTutorialsPageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr){

  /*
   ____          _____                _           
  / __ \        |  __ \              | |          
 | |  | |_ __   | |__) |___ _ __   __| | ___ _ __ 
 | |  | | '_ \  |  _  // _ \ '_ \ / _` |/ _ \ '__|
 | |__| | | | | | | \ \  __/ | | | (_| |  __/ |   
  \____/|_| |_| |_|  \_\___|_| |_|\__,_|\___|_|   
                                                                                                    
*/

  $scope.loading = true;
  $scope.results = false;
  $scope.noMoreTutorials = false;

  // configuration for ui-bootstrap.rating
  $scope.max = 5;
  $scope.isReadonly = true;

  // Pagination properties
  $scope.skip = 0;

  $http({
      url: '/tutorials',
      method: 'GET',
      params: {
        skip: $scope.skip
      }
    })
    .then(function onSuccess(sailsResponse) {

      $scope.tutorials = sailsResponse.data.options.updatedTutorials;
      $scope.totalTutorials = sailsResponse.data.options.totalTutorials;

      // Prevent markup from being displayed if no tutorials
      if ($scope.tutorials.length > 0) {
        $scope.results = true;
      }

      // Increment the skip variable by the total possible number of tutorials on the page
      $scope.skip = $scope.skip+=10;

      // Disable the more tutorials button if there are no more tutorials.
      if ($scope.tutorials < 10  || $scope.totalTutrials - $scope.skip <= 10){
        $scope.noMoreTutorials = true;
      }

    })
    .catch(function onError(sailsResponse) {
      
      // Otherwise, this is some weird unexpected server error. 
      // Or maybe your WIFI just went out.
      console.error('sailsResponse: ', sailsResponse);
    })
    .finally(function eitherWay() {
        $scope.loading = false;
  });

/* 
  _____   ____  __  __   ______               _       
 |  __ \ / __ \|  \/  | |  ____|             | |      
 | |  | | |  | | \  / | | |____   _____ _ __ | |_ ___ 
 | |  | | |  | | |\/| | |  __\ \ / / _ \ '_ \| __/ __|
 | |__| | |__| | |  | | | |___\ V /  __/ | | | |_\__ \
 |_____/ \____/|_|  |_| |______\_/ \___|_| |_|\__|___/

*/

  $scope.fetchMoreTutorialsLikeThis = function() {
    $scope.loading = true;

    $http({
      url: '/tutorials',
      method: 'GET',
      params: {
        skip: $scope.skip
      }
    })
    .then(function onSuccess(sailsResponse) {

      // The returned tutorials
      $scope.tutorials = sailsResponse.data.options.updatedTutorials;

      // The current number of records to skip
      $scope.skip = $scope.skip+=10;

      // Disable the show more tutorials button when there are no more tutorials
      if ($scope.skip >= $scope.totalTutorials) {
        $scope.noMoreTutorials = true;
      }

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