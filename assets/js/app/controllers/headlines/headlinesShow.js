PlayerTracker.controller('HeadlinesShowCtrl',['$scope','$resource','$http','$mdDialog',function($scope,$resource,$http,$mdDialog){

  var Headline = $resource('/api/headline/:id');

  $scope.news = null;

  //gets all headlines from database
  $scope.getHeadlines = function(){
    $scope.loading = true;
    Headline.query({},function(data){
      console.log('headlines:',data);
      $scope.news = data;
      $scope.loading = false;
    });
  };

  $scope.getHeadlines();

  $scope.showDialog = function($event) {
    var parentEl = angular.element(document.body);
     $mdDialog.show({
       parent: parentEl,
       // targetEvent: $event,
       templateUrl: '/views/headlines/headlineDialog.html',
       locals: {
         headline: $event
       },
       controller: 'DialogController'
    });
  };

  $http.get('/api/headline/getHeadlines').success(function(){
    console.log('headlines washed and loaded');
  });

  //calls getHeadlines() in HeadlineController


}]);
