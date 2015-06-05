var PlayerTracker = angular.module('PlayerTracker',['ngRoute','ngResource','ngAnimate','ngMaterial']);

PlayerTracker.run(['$rootScope','AlertService','UserService',function($rootScope,AlertService,UserService){
  UserService.check(function(err,data){
    console.log('user',data,err)
  })
  // $rootScope.$on('$routeChangeStart',function(event,next,current){
  //   console.log('change',event,next,current)
  //   AlertService.clear();
  // })
}])
//routing
PlayerTracker.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){

  $locationProvider.html5Mode(true);

  $routeProvider
  .when('/',{
    templateUrl: '/views/welcome.html',
    controller: 'WelcomeCtrl'
  })
  .when('/following',{
    templateUrl: '/views/userplayers/index.html',
    controller: 'UserPlayerIndexCtrl'
  })
  .when('/following/:id',{
    templateUrl: '/views/userplayers/show.html',
    controller: 'UserPlayerShowCtrl'
  })
  .when('/players',{
    templateUrl: '/views/players/index.html',
    controller: 'AllPlayersCtrl'
  })
  .when('/signup',{
    templateUrl: '/views/auth/signup.html',
    controller: 'UserCreateCtrl'
  })
  .when('/login',{
    templateUrl: '/views/auth/login.html',
    controller: 'UserLoginCtrl'
  })
  .when('/headlines',{
    templateUrl: '/views/headlines/index.html',
    controller: 'HeadlinesShowCtrl'
  })
  .otherwise({
    templateUrl:'/views/errors/404.html'
  })

}])














