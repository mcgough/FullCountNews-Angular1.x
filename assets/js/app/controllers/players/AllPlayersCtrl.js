PlayerTracker.controller('AllPlayersCtrl',['$scope','$resource','$http',function($scope,$resource,$http){

  console.log('allplayers connected');

  $http.get('/api/playerdb/getAllPlayers').success(function(data){
    $scope.players = data;
  });

  $scope.updateDbStats = function(){
    $http.get('/api/playerdb/getPlayerStats').success(function(data){
      console.log('success');
    });
  };

  // $scope.updateDbStats();


}]);