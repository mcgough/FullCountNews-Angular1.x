PlayerTracker.controller('UserLoginCtrl',['$scope','$resource','UserService','AlertService','$location',function($scope,$resource,UserService,AlertService,$location){


  $scope.UserService = UserService;
  $scope.currentUser = UserService.currentUser;
  console.log('!!!!!!',$scope.currentUser)

  // $scope.$watchCollection('UserService',function(){
  //   console.log('user change occurred')
  //   $scope.currentUser = UserService.currentUser;
  // })

  $scope.userLogin = function(){
    console.log($scope.user)
    $scope.UserService.login($scope.user.email,$scope.user.password,function(err,data){
      console.log('call to UserService login',data)
      if(err){
        console.log(err);
        alert('unknown error');
      }else if(data && data.result){
        AlertService.add('success','You are now logged in')
      }else{
        console.log('unable to login')
      }

    })
    $location.path('/')
  }
}]);
