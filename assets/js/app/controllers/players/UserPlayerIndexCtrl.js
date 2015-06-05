PlayerTracker.controller('UserPlayerIndexCtrl',['$scope','$resource','$http','UserService','$q','$mdDialog','$location',function($scope,$resource,$http,UserService,$q,$mdDialog,$location){

  $scope.UserService = UserService;
  $scope.currentUser = UserService.currentUser
   $scope.$watchCollection('UserService',function(){
      $scope.currentUser = UserService.currentUser;
      if($scope.currentUser==false){
        $location.path('/')
      }
    });

  var Player = $resource('/api/userlist/:id');
  var Db = $resource('/api/playerdb/:id');
  var Headline = $resource('/api/headline/:id');


  //loads users players and updates their stats
  $scope.loadUserList = function(){
    // $scope.loading = true;
    $http.get('/api/userlist/updateUserlistStats').success(function(data){
      $scope.userPlayers = data;
      $scope.userPlayers.forEach(function(player,index){
        if(player.alert.indexOf('DL') !== -1){
          player.injured = true
          console.log('injured',player.lastName)
        }else if(player.teamPosition.indexOf('SP') === -1){
          if(parseFloat(player.fiftAvgWhip) > .300){
            console.log(player.fiftAvgWhip)
            player.fire = true;
            console.log('fire hitter',player.lastName)
          }else if(parseFloat(player.fiftAvgWhip) < .200){
            player.ice = true;
            console.log('ice',player.lastName)
          }
        }else if(player.teamPosition.indexOf('SP') !== -1){
          if(parseFloat(player.fiftSbEra) < 2.75){
            player.fire = true;
            console.log('fire pitcher',player.lastName)
         }else if(parseFloat(player.fiftSbEra) > 4){
            player.ice = true;
            console.log('ice',player.lastName)
          // }
        }else if(player.teamPosition.indexOf('RP') !== -1){
          if(parseFloat(player.fiftSbEra) < 0){
            player.fire = true;
            console.log('fire',player.lastName)
          }else if(parseFloat(player.fiftSbEra) > 2){
            player.ice = true;
          }

        }
      }
      $scope.loadList = $scope.userPlayers
    })
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
      var first = $scope.searchText.split(' ')[0].toLowerCase();
      var last = $scope.searchText.split(' ')[1].toLowerCase();
      $scope.players.forEach(function(player){
        if(first=== player.firstName && last === player.lastName){
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
            $scope.getHeadlines();
            $scope.searchText = '';
            $scope.loadUserList();
            return true
          })
        }
      })
    })
    $scope.loadUserList();
  }


  //delete button function
  $scope.deletePlayer = function(playerId){
    $http.delete('/api/userlist/' + playerId).success(function(data){
      $scope.loadUserList();
    })
  }


  //compares headlines to user players last name
  $scope.getHeadlines = function(){
    $scope.loading = true;
    Headline.query({},function(data){
      $scope.news = data;
    })
    $scope.loading = false;
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