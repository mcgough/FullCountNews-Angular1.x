PlayerTracker.controller("WelcomeCtrl", [
  "$scope",
  "$resource",
  "$http",
  "UserService",
  "$mdDialog",
  "$location",
  function($scope, $resource, $http, UserService, $mdDialog, $location) {
    $scope.UserService = UserService;

    $scope.$watchCollection("UserService", function() {
      $scope.currentUser = UserService.currentUser;
      if ($scope.currentUser === false) {
        $location.path("/");
      }
    });

    $scope.showDialog = function(type, $event) {
      var parentEl;
      if (type === "headline" && $scope.currentUser) {
        parentEl = angular.element(document.body);
        $mdDialog.show({
          parent: parentEl,
          templateUrl: "/views/headlines/headlineDialog.html",
          locals: {
            headline: $event
          },
          controller: "DialogController"
        });
      } else if (type === "login" && !$scope.currentUser) {
        parentEl = angular.element(document.body);
        $mdDialog.show({
          parent: parentEl,
          templateUrl: "/views/auth/login.html",
          controller: "UserLoginCtrl"
        });
      }
    };
  }
]);
