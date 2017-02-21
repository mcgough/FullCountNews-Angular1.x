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
      var $ = cheerio.load(data),
          headshotImg = $('.player-photo img')[0].attribs.src,
          statsContainer = $('.nine.columns table tbody tr')[0].children;
      Playerdb.find({name: playerName})
        .then(function(response) {
          player = response[0];
          player.runsK = statsContainer[0].next.children[0].data;
          player.hrW = statsContainer[1].next.children[0].data;
          player.rbiSv = statsContainer[2].next.children[0].data;
          player.sbEra = statsContainer[3].next.children[0].data;
          player.avgWhip = statsContainer[4].next.children[0].data;
          player.alert = statsContainer[5].next.children[0].data;
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



