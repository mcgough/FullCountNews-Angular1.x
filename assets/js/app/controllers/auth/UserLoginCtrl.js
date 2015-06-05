PlayerTracker.controller('UserLoginCtrl',['$scope','$resource','UserService','AlertService','$location','$mdDialog','$mdToast',function($scope,$resource,UserService,AlertService,$location,$mdDialog,$mdToast){


  $scope.UserService = UserService;

  $scope.currentUser = UserService.currentUser;

  $scope.userLogin = function(){
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
    $mdDialog.hide();
    Materialize.toast('Hello, you are now logged in!', 4000,'hello')
  }
  $scope.$watchCollection('UserService',function(){
    console.log('user change occurred')
    $scope.currentUser = UserService.currentUser;
  })
}]);
