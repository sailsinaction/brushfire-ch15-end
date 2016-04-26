/**
 * grunt/pipeline.js
 *
 * The order in which your css, javascript, and template files should be
 * compiled and linked from your views and static HTML files.
 *
 * (Note that you can take advantage of Grunt-style wildcard/glob/splat expressions
 * for matching multiple files.)
 */



// CSS files to inject in order
//
// (if you're using LESS with the built-in default config, you'll want
//  to change `assets/styles/importer.less` instead.)
var cssFilesToInject = [
  'styles/**/*.css'
];


// Client-side javascript files to inject in order
// (uses Grunt-style wildcard/glob/splat expressions)
var jsFilesToInject = [

  // Don't load sails.io.js dependency here
  // (because we use HTML attributes to configure it)

  // Inject all of the rest of our dependencies one by one here:
  'js/dependencies/angular.js',
  'js/dependencies/jquery.min.js',
  'js/dependencies/lodash.js',
  'js/dependencies/angular-toastr.js',
  'js/dependencies/bootstrap.js',
  'js/dependencies/compareTo.module.js',
  'js/dependencies/ui-bootstrap.js',
  'js/dependencies/ui-bootstrap-tpls.js',
  'js/dependencies/angular-toastr.tpls.js',
  'js/dependencies/ng-pattern-restrict.js',

  // Inject our angular module definition file here
  // so that it's available for our UI controller
  // scripts below.
  'js/app.js',

  // All of the rest of our controllers
  // will be injected here in no particular order.
  'js/controllers/**/*.js',
];


// Client-side HTML templates are injected using the sources below
// The ordering of these templates shouldn't matter.
// (uses Grunt-style wildcard/glob/splat expressions)
//
// By default, Sails uses JST templates and precompiles them into
// functions for you.  If you want to use jade, handlebars, dust, etc.,
// with the linker, no problem-- you'll just want to make sure the precompiled
// templates get spit out to the same file.  Be sure and check out `tasks/README.md`
// for information on customizing and installing new tasks.
var templateFilesToInject = [
  'templates/**/*.html'
];



// Prefix relative paths to source files so they point to the proper locations
// (i.e. where the other Grunt tasks spit them out, or in some cases, where
// they reside in the first place)
module.exports.cssFilesToInject = cssFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.jsFilesToInject = jsFilesToInject.map(function(path) {
  return '.tmp/public/' + path;
});
module.exports.templateFilesToInject = templateFilesToInject.map(function(path) {
  return 'assets/' + path;
});
