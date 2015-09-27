angular.module('brushfire', ['toastr', 'compareTo'])
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