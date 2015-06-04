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
    Headline.destroy().exec(function(err){
      if(err) {
        console.log('error',err);
      }else {
        console.log('deleted');
      }
    });
    request('http://www.fantasypros.com/mlb/player-news.php',function(error,response,data){
      if(!error && response.statusCode == 200){

        var $ = cheerio.load(data);

        //gets headlines
        var results = $('.player-news-header a');
        var headlines = results.map(function(index,element){
          return $(this).text();
        }).get();
        console.log(headlines)
        //gets main text of headlines
        var data = $('.main-content .player-news-content > p')
        var mainText = data.map(function(index,element){
          return $(this).text();
        }).get();

        // combines headlines with bodies as objects
        var counter = 0;
        for(var i = 0; i < headlines.length; i++){
          if(i % 3 === 0){
            Headline.create({title:headlines[i],body:mainText[counter] + '\n' + mainText[counter + 1]}).then(function(data){
              console.log('headline saved');
            })
            counter += 2;
          }
        }
      }
    })
    request('http://www.rotoworld.com/playernews/mlb/baseball',function(error,response,data){
      var $ = cheerio.load(data);
      var sec1 = $('.pb .report');
      var report = sec1.map(function(index,element){
        return $(this).text().trim();
      }).get()
      var sec2 = $('.pb .impact');
      var impact = sec2.map(function(index,element){
        return $(this).text().trim();
      }).get();
      for(var i = 0; i < report.length; i++){
        Headline.create({title:report[i],body:impact[i]}).then(function(data){
          console.log('roto headline saved');
        })
      }
    })
    Headline.query(function(data){
      res.send(data);
    })
  },

  getUserPlayerSpecifcNews: function(req,res){
    Userlist.find({id:req.params.id}).then(function(data){
      request('http://www.fantasypros.com/mlb/news/' + data[0].firstName + '-' + data[0].lastName + '.php',function(error,response,data){
        var $ = cheerio.load(data);
        var results = $('.player-news-header a');
        var headlinesPlayer = results.map(function(index,element){
          return $(this).text();
        }).get();
        var data = $('.player-news-content > p')

        var mainText = data.map(function(index,element){
          return $(this).text();
        }).get();
        // console.log('results!!!!!!!!!!!',headlinesPlayer)
        // console.log('maintext!!!!!!!!!!!!!',mainText)
        playerNews = [];
        var counter = 0;
        for(var i = 0; i < headlinesPlayer.length; i++){
          if(i % 2 === 0){
            playerNews.push({title:headlinesPlayer[i],body:mainText[counter] + '\n' + mainText[counter + 1]});
            counter += 2;
          }
        }
        // console.log('!!!!!!!!!!!!!!!!!!!!!',playerNews)
        res.send(playerNews)
      })
    })
  }



};


