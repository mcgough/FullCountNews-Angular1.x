PlayerTracker.controller('UserPlayerIndexCtrl',['$scope','$resource','$http','UserService','$q','$mdDialog',function($scope,$resource,$http,UserService,$q,$mdDialog){

  $scope.currentUser = UserService.currentUser;

  $scope.$watchCollection('UserService',function(){
    console.log('a change occurred with the user')
    $scope.currentUser = UserService.currentUser;
  })

  var Player = $resource('/api/userlist/:id');
  var Db = $resource('/api/playerdb/:id');
  var Headline = $resource('/api/headline/:id');


  //loads users players and updates their stats
  $scope.loadUserList = function(){
    $http.get('/api/userlist/updateUserlistStats').success(function(data){
      $scope.userPlayers = data;
      // console.log(data)
    })
  }

  $scope.loadUserList();

  //autocomplete function
  $scope.getMatches = function(){
    var deferred = $q.defer();
    $http.get('/api/playerdb').success(function(data){
      var results = data;
      var names = [];
      for(var i = 0; i < results.length; i++){
        if(results[i].firstName.slice(0,$scope.searchText.length) === $scope.searchText){
          names.push(results[i])
        }
      }
      deferred.resolve(names);
    })
      return deferred.promise
  }


  //****function to update stats in playerdb****

  // $scope.updateDbStats = function(){
  //   $http.get('/api/playerdb/getPlayerStats').success(function(data){
  //     console.log('success')
  //   })
  // }

  // $scope.updateDbStats();


  //finds player in db and saves to userlist
  $scope.findPlayer = function(){
    $http.get('/api/playerdb/getAllPlayers').success(function(data){
      $scope.players = data;
      // var first = $scope.searchText.split(' ')[0].toLowerCase();
      // var last = $scope.searchText.split(' ')[1].toLowerCase();
      $scope.players.forEach(function(player){
        if($scope.searchText.firstName === player.firstName && $scope.searchText.lastName === player.lastName){
          var newPlayer = new Player();
          newPlayer.firstName = player.firstName;
          newPlayer.lastName = player.lastName;
          newPlayer.teamPosition = player.teamPosition;
          newPlayer.runsK = player.runsK;
          newPlayer.hrW = player.hrW;
          newPlayer.rbiSv = player.rbiSv;
          newPlayer.sbEra = player.sbEra;
          newPlayer.avgWhip = player.avgWhip;
          newPlayer.alert = player.alert;
          newPlayer.pitcher = player.pitcher;
          newPlayer.img = player.img;
          newPlayer.$save({userId:$scope.currentUser.id},function(){
            $scope.loadUserList();
            $scope.getHeadlines();
            $scope.searchText = '';
            return true
          })
        }
      })
    })
  }


  //delete button function
  $scope.deletePlayer = function(playerId){
    $http.delete('/api/userlist/' + playerId).success(function(data){
      $scope.loadUserList();
    })
  }


  //compares headlines to user players last name
  $scope.getHeadlines = function(){
    Headline.query({},function(data){
      $scope.news = data;
    })
  }
  $scope.getHeadlines();

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

  $http.get('/api/headline/getHeadlines').success(function(){
    console.log('headlines washed and loaded')
  })
}])