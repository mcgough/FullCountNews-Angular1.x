PlayerTracker.factory('AlertService',[function(){
  var alerts = [];

  return {
    clear: function(){
      alerts = [];
    },
    add: function(type,text){
      alerts.push({type:type,text:text});
    },
    get: function(){
      return alerts;
    },
    remove: function(index){
      alerts.splice(index,1);
    }
  }
}])