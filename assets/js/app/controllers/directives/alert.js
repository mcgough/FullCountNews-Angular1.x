PlayerTracker.directive("alerts", function() {
  return {
    restrict: "E",
    scope: {},
    controller: [
      "$scope",
      "AlertService",
      function($scope, AlertService) {
        $scope.getAlerts = function() {
          return AlertService.get();
        };

        $scope.closeAlert = function(index) {
          AlertService.remove(index);
        };
      }
    ],
    replace: true,
    template:
      '<ul ng-repeat="alert in getAlerts()" type="{{alert.type}}" close="$parent.closeAlert($index)" class="card"><li class="center card-content z-depth-3" style="height: 25px; font-size: 20px">{{alert.text}}</li></ul>'
  };
});
