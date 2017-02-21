/**
 * HeadlineController
 *
 * @description :: Server-side logic for managing headlines
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var cheerio = require('cheerio');
var chalk = require('chalk');
var request = require('request');

module.exports = {

  getHeadlines: function(req,res){
    // Headline.find({}).then(function(data) {
    //   var olderThanTwelve = ((new Date().getTime() / 1000 / 3600 * 60) - (Date.parse(data[0].updatedAt) / 1000 / 3600 * 60)) / 60 > 12;
    //   if (olderThanTwelve) {
        Headline.destroy().exec(function(err){
          if(err) {
            console.log('error',err);
          } else {
            console.log('deleted');
            request('http://www.fantasypros.com/mlb/player-news.php',function(error,response,data){
              if(!error && response.statusCode == 200){

                var $ = cheerio.load(data);

                //gets headlines
                var results = $('.player-news-header span a');
                var headlines = results.map(function(index,element){
                  var headline = $(this).text().split(' ');
                  if (headline.length > 2) {
                    return $(this).text();
                  }
                }).get();
                //gets main text of headlines
                var newsContent = $('.main-content .player-news-content > p');
                var mainText = newsContent.map(function(index,element){
                  return $(this).text();
                }).get();
                console.log('fantasypros:',headlines);
                // combines headlines with bodies as objects
                var counter = 0;
                for(var i = 0; i < headlines.length; i++){
                  if(i % 2 === 0){
                    Headline.create({title:headlines[i],body:mainText[counter] + '\n' + mainText[counter + 1]}).then(function(data){
                    });
                    counter += 2;
                  }
                }
              }
            });
            request('http://www.rotoworld.com/playernews/mlb/baseball',function(error,response,data){
              var $ = cheerio.load(data);
              var sec1 = $('.pb .report');
              var report = sec1.map(function(index,element){
                return $(this).text().trim();
              }).get();
              var sec2 = $('.pb .impact');
              var impact = sec2.map(function(index,element){
                return $(this).text().trim();
              }).get();
              console.log('roto:',report);
              for(var i = 0; i < report.length; i++){
                Headline.create({title:report[i],body:impact[i]}).then(function(data){

                });
              }
              res.send({status:'cleanded'});
            });
          }
        });
    //   } else {
    //     res.send({status:'still valid'});
    //   }
    // });
  },

  getUserPlayerSpecifcNews: function(req,res){
    var player = req.query.player,
        playerName = player.split(' ')[1];
    Headline.find({body:{contains: playerName}})
    .exec(function(err,data) {
      res.send(data);
    });
  }

};


