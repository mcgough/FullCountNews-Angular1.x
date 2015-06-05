PlayerTracker.controller('WelcomeCtrl',['$scope','$resource','$http','UserService','$mdDialog','$location',function($scope,$resource,$http,UserService,$mdDialog,$location){
  console.log('connnected')

  $scope.UserService = UserService;

   $scope.$watchCollection('UserService',function(){
      $scope.currentUser = UserService.currentUser;
      if($scope.currentUser==false){
        $location.path('/')
      }
    });

  $scope.showDialog = function(type,$event) {
    if(type === 'headline' && $scope.currentUser){
      var parentEl = angular.element(document.body);
      console.log(parentEl)
      console.log($event)
       $mdDialog.show({
         parent: parentEl,
         // targetEvent: $event,
         templateUrl: '/views/headlines/headlineDialog.html',
         locals: {
           headline: $event
         },
         controller: 'DialogController'
      })
    }else if(type === 'login' && !$scope.currentUser){
      var parentEl = angular.element(document.body);
      console.log('working!!!!!')
      $mdDialog.show({
        parent: parentEl,
        templateUrl: '/views/auth/login.html',
        controller: 'UserLoginCtrl'
      })
    }
  };

}])