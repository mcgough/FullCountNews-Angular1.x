/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    userlist: {
      collection: 'Userlist',
      via: 'user'
    }
  },

  beforeCreate: function(values,callback){
    bcrypt.hash(values.password,10,function(err,hash){
      if(err) return res.send(err);
      values.password = hash;
      callback();
    })
  }



};

