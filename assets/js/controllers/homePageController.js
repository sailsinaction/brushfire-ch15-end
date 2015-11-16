angular.module('brushfire').controller('homePageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {

/*
   ____          _____                _           
  / __ \        |  __ \              | |          
 | |  | |_ __   | |__) |___ _ __   __| | ___ _ __ 
 | |  | | '_ \  |  _  // _ \ '_ \ / _` |/ _ \ '__|
 | |__| | | | | | | \ \  __/ | | | (_| |  __/ |   
  \____/|_| |_| |_|  \_\___|_| |_|\__,_|\___|_|   
                                                  
                                                  
*/

  // Grab the locals 
  $scope.me = window.SAILS_LOCALS.me;

  
  $scope.loading = false;
  $scope.results = false;
  $scope.noResults = false;
  $scope.noMoreTutorials = false;

  // configuration for ui-bootstrap.rating
  $scope.max = 5;
  $scope.isReadonly = true;

  // Pagination properties
  $scope.skip = 0;

/* 
  _____   ____  __  __   ______               _       
 |  __ \ / __ \|  \/  | |  ____|             | |      
 | |  | | |  | | \  / | | |____   _____ _ __ | |_ ___ 
 | |  | | |  | | |\/| | |  __\ \ / / _ \ '_ \| __/ __|
 | |__| | |__| | |  | | | |___\ V /  __/ | | | |_\__ \
 |_____/ \____/|_|  |_| |______\_/ \___|_| |_|\__|___/

*/
                                                      
  //
  $scope.searchTutorials = function() {
    $scope.loading = true;
    $scope.skip = 0;

    $http({
      url: '/tutorials/search',
      method: 'GET',
      params: {
        searchCriteria: $scope.searchCriteria,
        skip: $scope.skip
      }
    })
    .then(function onSuccess(sailsResponse) {

      $scope.tutorials = sailsResponse.data.options.updatedTutorials;
      $scope.totalTutorials = sailsResponse.data.options.totalTutorials;

      $scope.results = true;
      // Prevents showing markup with no results
      if ($scope.tutorials.length > 0) {
        $scope.noResults = false;
      } else {
        $scope.noResults = true;
        $scope.noMoreTutorials = true;
      }

      if ($scope.tutorials.length <= 10) {
        $scope.noMoreTutorials = true;
      }

      $scope.skip = $scope.skip+=10;

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

  $scope.fetchMoreTutorialsLikeThis = function() {
    $scope.loading = true;

    $http({
      url: '/tutorials/search',
      method: 'GET',
      params: {
        searchCriteria: $scope.searchCriteria,
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