PlayerTracker.controller('NavCtrl',['$scope','UserService','$location','$http','AlertService','$rootScope','$location','$mdDialog',function($scope,UserService,$location,$http,AlertService,$rootScope,$location,$mdDialog){


  $scope.UserService = UserService;

  $scope.$watchCollection('UserService',function(){
    $scope.currentUser = UserService.currentUser;
  })

  var ticker = function(){
    $scope.news = ['Welcome to The Feed']
    var index = 0;
    setInterval(function(){
      $http.get('/api/headline').success(function(data){
        $scope.news.push(data[index]);
        $scope.news.shift(0);
      })
      if(index <= 20){
        index++
      }else if(index === 21){
        setInterval(function(){
          $scope.news = ['Welcome to The Feed']

        },5000)
        index = 0;
      }
    },5000)
  }

  ticker();

  $scope.showDialog = function($event) {
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
  };


  $scope.logout = function(){
    UserService.logout(function(err){
      // console.log('logged out')
      $location.path('/')
      AlertService.add('danger','You are now logged out');
    })
  }



}])