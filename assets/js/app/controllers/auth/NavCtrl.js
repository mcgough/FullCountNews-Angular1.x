PlayerTracker.controller('NavCtrl',['$scope','UserService','$location','$http','AlertService','$rootScope','$location','$mdDialog','$route','$mdToast',function($scope,UserService,$location,$http,AlertService,$rootScope,$location,$mdDialog,$route,$mdToast){

  $scope.UserService = UserService;
  // $scope.currentUser = UserService.currentUser

  $scope.$watchCollection('UserService',function(){
    $scope.currentUser = UserService.currentUser;
  });

  var ticker = function(){
    $scope.news = [{title:'Welcome to FullCountNews'}];
    var index = 0;
    setInterval(function(){
      $http.get('/api/headline').success(function(data){
        $scope.news.push(data[index]);
        $scope.news.shift(0);
      });
      if(index <= 29){
        index++;
      }else if(index === 30){
        $scope.news = [{title:'Welcome to FullCountNews'}];
        index = 0;
      }
    },8000);
  };

  ticker();



  $scope.showDialog = function(type,$event) {
    if(type === 'headline' && $scope.currentUser){
      var parentEl = angular.element(document.body);
      console.log(parentEl);
      console.log($event);
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
      console.log('working!!!!!');
      $mdDialog.show({
        parent: parentEl,
        templateUrl: '/views/auth/login.html',
        controller: 'UserLoginCtrl'
      })
    }
  };


  $scope.logout = function(){
    UserService.logout(function(err){
      AlertService.add('danger','You are now logged out');
      $location.path('/');
      Materialize.toast('Logged out, goodbye!', 4000,'goodbye');
    });
  };



}]);