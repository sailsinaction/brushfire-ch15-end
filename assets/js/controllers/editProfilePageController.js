angular.module('brushfire').controller('editProfilePageController', ['$scope', '$http', 'toastr', function($scope, $http, toastr) {

  // Just a hack so we can type `SCOPE` in the Chrome inspector.
  SCOPE = $scope;

  $scope.me = window.SAILS_LOCALS.me;

  /////////////////////////////////////////////////////////////////////////////////
  // When HTML is rendered... (i.e. when the page loads)
  /////////////////////////////////////////////////////////////////////////////////

  // Set up initial objects
  // (kind of like our schema for the page)
  $scope.editProfile = {
    properties: {},
    errorMsg: '',
    error: false,
    saving: false,
    loading: false,
    changePassword: {}
  };

  $scope.updateProfile = function() {

    // var theRoute = 'user/updateProfile/' + $scope.me.id;

    // Submit PUT request to Sails.
      // $http.put(theRoute, {
      $http.put('/user/update-profile', {
        gravatarURL: $scope.me.gravatarURL
        // gravatarURL: $scope.editProfile.properties.gravatarURL
      })
      .then(function onSuccess(sailsResponse) {

        // Notice that the sailsResponse is an array and not a single object
        // The .update() model method returns an array and not a single record.
        window.location = '/' + sailsResponse.data[0].username;

        $scope.editProfile.loading = false;
      })
      .catch(function onError(sailsResponse) {
        // console.log(sailsResponse);
        // Otherwise, display generic error if the error is unrecognized.
        $scope.editProfile.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

      })
      .finally(function eitherWay() {
        $scope.editProfile.loading = false;
      });
  };

  $scope.restoreGravatarURL = function() {

    // Submit PUT request to Restore GravatarURL.
    $http.put('/user/restore-gravatar-URL', {
        email: $scope.me.email
      })
      .then(function onSuccess(sailsResponse) {

        // Restore the current gravatarURL
        $scope.me.gravatarURL = sailsResponse.data;

        $scope.editProfile.loading = false;
      })
      .catch(function onError(sailsResponse) {
        // console.log(sailsResponse);
        // Otherwise, display generic error if the error is unrecognized.
        $scope.editProfile.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

      })
      .finally(function eitherWay() {
        $scope.editProfile.loading = false;
      });
  };

  $scope.changeMyPassword = function() {

    $http.put('/user/change-password', {
        // id: $scope.me.id,
        password: $scope.editProfile.properties.password
      })
      .then(function onSuccess(sailsResponse) {

        // console.log('sailsResponse: ', sailsResponse);
        // $scope.userProfile.properties.gravatarURL = sailsResponse.data.gravatarURL;
        // window.location = '#/profile/' + $scope.editProfile.properties.id;
        window.location='/' + sailsResponse.data[0].username;
        // toastr.success('Password Updated!');

        $scope.editProfile.loading = false;
      })
      .catch(function onError(sailsResponse) {
        // console.log('sailsresponse: ', sailsResponse)
        // Otherwise, display generic error if the error is unrecognized.
        $scope.editProfile.changePassword.errorMsg = 'An unexpected error occurred: ' + (sailsResponse.data || sailsResponse.status);

      })
      .finally(function eitherWay() {
        $scope.editProfile.loading = false;
      });

  };

}]);