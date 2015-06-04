PlayerTracker.controller('DialogController',['$scope','$mdDialog','headline',function($scope,$mdDialog,headline){
  console.log(headline);
  $scope.headline = headline;

  $scope.closeDialog = function() {
    $mdDialog.hide();
  }
}])