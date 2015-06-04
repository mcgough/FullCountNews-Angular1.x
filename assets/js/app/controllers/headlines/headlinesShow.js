PlayerTracker.controller('HeadlinesShowCtrl',['$scope','$resource','$http',function($scope,$resource,$http){
  console.log('headlines connected');

  //gets all headlines from database
  $http.get('/api/headline').success(function(data){
    $scope.headlines = data;
  })

  //calls getHeadlines() in HeadlineController


}]);
