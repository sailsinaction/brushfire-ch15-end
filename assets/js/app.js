angular.module('brushfire', ['toastr', 'compareTo', 'ui.bootstrap', 'ngPatternRestrict'])
.config(['$sceDelegateProvider', function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    'self',
    '*://www.youtube.com/**'
  ]);
}]);

angular.module('brushfire').run(['$http', function($http) {
  if (window.SAILS_LOCALS._csrf) {
    $http.defaults.headers.common['X-CSRF-Token'] = window.SAILS_LOCALS._csrf;
  }
}]);