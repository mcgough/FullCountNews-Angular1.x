PlayerTracker.controller('UserCreateCtrl',['$scope','$resource',function($scope,$resource){
  console.log('user ctrl connected');
  var User = $resource('/api/user/:id');
  $scope.userCreate = function(){
    var user = new User();
    user.email = $scope.email;
    user.password = $scope.password;
    user.$save(function(){
      $scope.email = '';
      $scope.password = '';
    })
  }
}])