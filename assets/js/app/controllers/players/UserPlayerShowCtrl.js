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

    // Headline.query({},function(data){
    //   var headlines = data;
    //   for(var j = 0; j < headlines.length; j++){
    //     if(headlines[j].title.toLowerCase().indexOf($scope.player.lastName) !== -1){
    //       $scope.news.push(headlines[j]);
    //     }
    //   }
    // });
  });

  // $http.get('/api/headline/getUserPlayerSpecifcNews/' + $routeParams.id).success(function(data){
  //   $scope.news = data
  // })

  $scope.deletePlayer = function(playerId){
    $http.delete('/api/userlist/' + playerId).success(function(data){
      $location.path('/following');
    });
  };




}]);