PlayerTracker.controller("DialogController", [
  "$scope",
  "$mdDialog",
  "headline",
  function($scope, $mdDialog, headline) {
    $scope.headline = headline;

    $scope.closeDialog = function() {
      $mdDialog.hide();
    };
  }
]);
