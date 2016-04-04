angular.module('brushfire', ['toastr', 'compareTo', 'ui.bootstrap', 'ngPatternRestrict'])
  .config(['$sceDelegateProvider', function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      '*://www.youtube.com/**'
    ]);
  }])