PlayerTracker.controller("UserLoginCtrl", [
  "$scope",
  "$resource",
  "UserService",
  "AlertService",
  "$location",
  "$mdDialog",
  "$mdToast",
  function(
    $scope,
    $resource,
    UserService,
    AlertService,
    $location,
    $mdDialog,
    $mdToast
  ) {
    $scope.UserService = UserService;

    $scope.currentUser = UserService.currentUser;

    $scope.userLogin = function() {
      $scope.UserService.login(
        $scope.user.email,
        $scope.user.password,
        function(err, data) {
          if (err) {
            console.log(err);
            alert("unknown error");
          } else if (data && data.result) {
            AlertService.add("success", "You are now logged in");
            $location.path("/following");
          } else {
            console.log("unable to login");
          }
        }
      );
      Materialize.toast("Hello, you are now logged in!", 4000, "hello");
    };
    $scope.$watchCollection("UserService", function() {
      $scope.currentUser = UserService.currentUser;
    });
  }
]);
