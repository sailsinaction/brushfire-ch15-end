angular.module('brushfire', ['toastr', 'compareTo', 'ui.bootstrap'])
  .config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'self',
      '*://www.youtube.com/**'
    ]);
  })

.filter('spaceless', function() {
  return function(input) {
    if (input) {
      return input.replace(/\s+/g, '-');
    }
  };
});