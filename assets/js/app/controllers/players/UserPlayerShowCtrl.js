PlayerTracker.controller('UserPlayerShowCtrl',['$scope','$routeParams','UserService','$log','$http','$resource','$location',function($scope,$routeParams,UserService,$log,$http,$resource,$location){

  $scope.currentUser = UserService.currentUser;

  console.log($routeParams);

   $scope.$watchCollection('UserService',function(){
      $scope.currentUser = UserService.currentUser;
      if($scope.currentUser==false){
        $location.path('/')
      }
    });

  $log.info('params!!!!',$routeParams.id);

  // var Player = $resource('/api/userlist/:id');
  // var Db = $resource('/api/playerdb/:id');
  var Headline = $resource('/api/headline/:id');

  $http.get('/api/userlist/' + $routeParams.id).success(function(data){
    $scope.player = data
    // $scope.newds = [];
    Headline.query({},function(data){
    var headlines = data;
      for(var j = 0; j < headlines.length; j++){
        if(headlines[j].title.toLowerCase().indexOf($scope.player.lastName) !== -1){
          $scope.news.push(headlines[j]);
        }
      }
    })
  })

  $http.get('/api/headline/getUserPlayerSpecifcNews/' + $routeParams.id).success(function(data){
    $scope.news = data
  })

  $scope.deletePlayer = function(playerId){
    $http.delete('/api/userlist/' + playerId).success(function(data){
      $location.path('/following')
    })
  }




}])