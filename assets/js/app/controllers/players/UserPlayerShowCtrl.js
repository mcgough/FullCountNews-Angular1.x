PlayerTracker.controller("UserPlayerShowCtrl", [
  "$scope",
  "$routeParams",
  "UserService",
  "$log",
  "$http",
  "$resource",
  "$location",
  function(
    $scope,
    $routeParams,
    UserService,
    $log,
    $http,
    $resource,
    $location
  ) {
    $scope.currentUser = UserService.currentUser;

    $scope.$watchCollection("UserService", function() {
      $scope.currentUser = UserService.currentUser;
      if ($scope.currentUser === false) {
        $location.path("/");
      }
    });

    var Headline = $resource("/api/headline/:id");

    $http.get("/api/playerdb/" + $routeParams.id).success(function(data) {
      $(".loading").addClass("active");
      var player = data;
      $http
        .get("/api/playerdb/getPlayerStats", {
          params: {
            name: player.name,
            url: player.url
          }
        })
        .success(function(response) {
          var player = response;
          if (player.position.indexOf("P") > -1) {
            player.pitcher = true;
          } else {
            player.pitcher = false;
          }

          $scope.player = player;
          $(".loading").removeClass("active");
          $http
            .get("/api/headline/getUserPlayerSpecifcNews", {
              params: {
                player: player.name
              }
            })
            .success(function(data) {
              $scope.news = data;
            });
        });
    });

    // $http.get('/api/headline/getUserPlayerSpecifcNews/' + $routeParams.id).success(function(data){
    //   $scope.news = data
    // })

    $scope.deletePlayer = function(playerId, name) {
      $http
        .delete("/api/userlist/deletePlayer/" + playerId)
        .success(function(data) {
          if (data.status === "success") {
            $location.path("/following");
            Materialize.toast(name + " has been removed", 4000, "remove");
          }
        });
    };
  }
]);
