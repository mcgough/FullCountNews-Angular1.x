PlayerTracker.factory('UserService', ['$http', function($http){

  return {

    login: function(email, password, callback) {

      var self = this;

      $http.post('/api/auth',{email:email,password:password})
      .success(function(data){
        if(data && data.result && data.user) {
          self.currentUser = data.user;
        } else {
          self.currentUser = false;
        }
        callback(null, data);
      })
      .error(function(err){
        callback(err);
      });
    },

    check: function(callback) {

     var self = this;

      $http.get('/api/auth')
      .success(function(data){
        if(data && data.user) {
          self.currentUser = data.user;
        } else {
          self.currentUser = false;
        }
        callback(null, data);
      })
      .error(function(err){
        callback(err);
      });

    },

    logout: function(callback) {
      this.currentUser = false;
      $http.delete('/api/auth')
      .success(function(data){
        console.log('delete',data);
        callback(null, data);
      })
      .error(function(err){
        callback(err);
      });
    }

  };

}]);