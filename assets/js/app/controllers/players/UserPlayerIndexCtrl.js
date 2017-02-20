PlayerTracker.controller('UserPlayerIndexCtrl',['$scope','$resource','$http','UserService','$q','$mdDialog','$location',function($scope,$resource,$http,UserService,$q,$mdDialog,$location){

  $scope.UserService = UserService;

  $scope.currentUser = UserService.currentUser;

  $scope.$watchCollection('UserService',function(){
    $scope.currentUser = UserService.currentUser;
    if($scope.currentUser === false){
      $location.path('/');
    }
  });

  $scope.playerList = null;

  var Player = $resource('/api/userlist/:id'),
      Db = $resource('/api/playerdb/:id'),
      Headline = $resource('/api/headline/:id'),
      playerList;

  $http.get('/api/playerdb/getAllPlayers').success(function(response) {
    playerList = response;
  });

  //autocomplete function
  $scope.getMatches = function(){
    var letterCount = $scope.searchText.length,
        search = $scope.searchText,
        list = playerList,
        options = [];
    if (letterCount % 2 !== 0) {
      for (var i = 0; i < list.length; i++) {
        var name = list[i].name.slice(0,letterCount);
        if (name.toLowerCase() === search.toLowerCase()) {
          options.push(list[i]);
        }
      }
      return options;
    } else {
      return false;
    }
  };

  $scope.findPlayer = function(item) {
    if (item) {
      $scope.searchText = '';
      var player = item;
      $http.get('/api/playerdb/getPlayerStats',
        {params:{
          name: player.name,
          url: player.url
        }})
      .success(function(response) {
        var player = response,
            user = new Player();
        user.$save({userId:$scope.currentUser.id,player:player}, function(response) {
          $scope.playerList.push(player);
        });
      });
    }
  };

  //loads users players and updates their stats
  $scope.loadUserList = function() {
    $http.get('/api/userlist/updateUserlistStats')
      .success(function(response) {
        console.log(response);
        var playerList = response.map(function(obj) {
          return JSON.parse(obj.player);
        });
        $scope.playerList = playerList;

      });
  //   $scope.loading = true;
  //   $http.get('/api/userlist/updateUserlistStats').success(function(data){
  //     $scope.userPlayers = data;
  //     $scope.userPlayers.reverse();
  //     $scope.userPlayers.forEach(function(player,index){
  //       if(player.alert.indexOf('DL') !== -1){
  //         player.injured = true
  //         console.log('injured',player.lastName)
  //       }else if(player.teamPosition.indexOf('SP') === -1){
  //         if(parseFloat(player.fiftAvgWhip) > .300){
  //           console.log(player.fiftAvgWhip)
  //           player.fire = true;
  //           console.log('fire hitter',player.lastName)
  //         }else if(parseFloat(player.fiftAvgWhip) < .200){
  //           player.ice = true;
  //           console.log('ice',player.lastName)
  //         }
  //       }else if(player.teamPosition.indexOf('SP') !== -1){
  //         if(parseFloat(player.fiftSbEra) < 2.75){
  //           player.fire = true;
  //           console.log('fire pitcher',player.lastName)
  //        }else if(parseFloat(player.fiftSbEra) > 4){
  //           player.ice = true;
  //           console.log('ice',player.lastName)
  //         // }
  //       }else if(player.teamPosition.indexOf('RP') !== -1){
  //         if(parseFloat(player.fiftSbEra) < 0){
  //           player.fire = true;
  //           console.log('fire',player.lastName)
  //         }else if(parseFloat(player.fiftSbEra) > 2){
  //           player.ice = true;
  //         }

  //       }
  //     }
  //   });
  // });
};





  //****function to update stats in playerdb****

  // $scope.updateDbStats = function(){
  //   $http.get('/api/playerdb/getPlayerStats').success(function(data){
  //     console.log('success')
  //   })
  // }

  // $scope.updateDbStats();


  //finds player in db and saves to userlist


  //delete button function
  $scope.deletePlayer = function(playerId){
    $http.delete('/api/userlist/' + playerId).success(function(data){
      $scope.loadUserList();
    });
  };


  //compares headlines to user players last name
  // $scope.getHeadlines = function(){
  //   $scope.loading = true;
  //   Headline.query({},function(data){
  //     $scope.news = data;
  //   })
  //   $scope.loading = false;
  // }
  // $scope.getHeadlines();

  $scope.showDialog = function($event) {
    var parentEl = angular.element(document.body);
    console.log(parentEl);
    console.log($event);
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

  // $http.get('/api/headline/getHeadlines').success(function(){
  //   console.log('headlines washed and loaded')
  // })

  $scope.loadUserList();
}]);