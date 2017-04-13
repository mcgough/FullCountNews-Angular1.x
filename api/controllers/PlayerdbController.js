/**
 * PlayerdbController
 *
 * @description :: Server-side logic for managing playerdbs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');
var cheerio = require('cheerio');

module.exports = {

  getPlayerStats: function(req,res){
    var playerName = req.query.name,
        url = req.query.url,
        player;
    request('http://www.fantasypros.com' + url, function(error,response,data) {
      if (error) {
        console.log(error);
      }
      var $ = cheerio.load(data),
          statsContainer = $('.feature-stretch table tbody tr').last().children();
          headshotImg = $('.side-nav img')[0].attribs.src;
      Playerdb.find({name: playerName})
        .then(function(response) {
          player = response[0];
          player.runsK = statsContainer[4].children[0].data;
          player.hrW = statsContainer[8].children[0].data;
          player.rbiSv = statsContainer[9].children[0].data;
          player.sbEra = statsContainer[15].children[0].data;
          player.avgWhip = statsContainer[16].children[0].data;
          player.alert = '';
          player.img  = headshotImg;
          Playerdb.update({id: player.id},player)
            .exec(function(err,player) {
              res.send(player[0]);
            });
        });
    });
  },

  getAllPlayers: function(req,res){
    Playerdb.find().then(function(data){
      res.send(data);
    });
  }

};



