PlayerTracker.controller('UserPlayerShowCtrl',['$scope','$routeParams','UserService','$log','$http','$resource','$location',function($scope,$routeParams,UserService,$log,$http,$resource,$location){

  $scope.currentUser = UserService.currentUser;

  $scope.$watchCollection('UserService',function(){
    $scope.currentUser = UserService.currentUser;
    if ($scope.currentUser === false) {
      $location.path('/');
    }
  });

  var Headline = $resource('/api/headline/:id');

  $http.get('/api/playerdb/' + $routeParams.id).success(function(data){
    var player = data;

    if (player.position.indexOf('P') > -1) {
      player.pitcher = true;
    } else {
      player.pitcher = false;
    }

    $scope.player = player;

    $http.get('/api/headline/getUserPlayerSpecifcNews',{params:{
      player: player.name
    }})
    .success(function(data) {
      $scope.news = data;
    });
  });

  // $http.get('/api/headline/getUserPlayerSpecifcNews/' + $routeParams.id).success(function(data){
  //   $scope.news = data
  // })

  $scope.deletePlayer = function(playerId){
    console.log(playerId);
    $http.get('/api/userlist/deletePlayer', {params:{
      player: 'hello?'
    }})
    .success(function(data) {
      console.log(data);
      // $location.path('/following');
    });
  };




}]);