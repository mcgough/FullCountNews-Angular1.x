PlayerTracker.controller('UserCreateCtrl',['$scope','$resource','$location',function($scope,$resource,$location){
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
    Materialize.toast('Your are signed up! Now login to enjoy the news', 4000,'signup')
  }
  $location.path('/')
}])