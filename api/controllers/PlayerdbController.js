/**
 * PlayerdbController
 *
 * @description :: Server-side logic for managing playerdbs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var request = require('request');
var cheerio = require('cheerio');

module.exports = {
  //gets all players from database and then scrapes and attaches their stats
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
    // Playerdb.find().then(function(data){
    //   var players = data;
    //   var count = 0;
    //   players.forEach(function(player,idx){
    //     if(player.firstName === 'jose' && player.lastName === 'abreu'){
    //       console.log('!!!!found him!!!!')
    //       request('http://www.fantasypros.com/mlb/stats/jose-dariel-abreu.php',function(error,response,data){
    //         var $ = cheerio.load(data);
    //         var img = $('.player-photo img');
    //         var headshot = img.map(function(index,element){
    //           return $(this).attr('src').trim();
    //         }).get();
    //         var results = $('.main-content .summary tr:first-child td');
    //         var stats = results.map(function(index,element){
    //           return $(this).text().trim();
    //         }).get();
    //         var playerName = $('.player-name h1');
    //         var position = playerName.map(function(index,element){
    //           return $(this).text().trim();
    //         }).get();
    //         var checkPosition = function(){
    //           if(position[0] === undefined){
    //             return false
    //           }else if(position[0].indexOf('SP') !== -1 || position[0].indexOf('RP') !== -1){
    //             console.log(position)
    //             return true
    //           }else{
    //             return false
    //           }
    //         }
    //         var past = $('.main-content .mobile-table tr td');
    //         var pastStats = past.map(function(index,element){
    //           return $(this).text().trim();
    //         }).get();
    //         var sevDayStats = stats.splice(17,6)
    //         var fiftDayStats = stats.splice(26,6)
    //         var thirDayStats = stats.splice(35,6)
    //         var lastYearStats = stats.splice(44,6)
    //         var pitcher = checkPosition();
    //         Playerdb.update({firstName:player.firstName,lastName:player.lastName},{
    //           runsK: stats[0],
    //           hrW: stats[1],
    //           rbiSv: stats[2],
    //           sbEra: stats[3],
    //           avgWhip: stats[4],
    //           alert: stats[5],
    //           img: headshot[0],
    //           pitcher: pitcher,
    //           sevRunsK: sevDayStats[1],
    //           sevHrW: sevDayStats[2],
    //           sevRbiSv: sevDayStats[3],
    //           sevSbEra: sevDayStats[4],
    //           sevAvgWhip: sevDayStats[5],
    //           fiftRunsK: fiftDayStats[1],
    //           fiftHrW: fiftDayStats[2],
    //           fiftRbiSv: fiftDayStats[3],
    //           fiftSbEra: fiftDayStats[4],
    //           fiftAvgWhip: fiftDayStats[5],
    //           thirRunsK: thirDayStats[1],
    //           thirHrW: thirDayStats[2],
    //           thirRbiSv: thirDayStats[3],
    //           thirSbEra: thirDayStats[4],
    //           thirAvgWhip: thirDayStats[5],
    //           lastYearRunsK: lastYearStats[1],
    //           lastYearHrW: lastYearStats[2],
    //           lastYearRbiSv: lastYearStats[3],
    //           lastYearSbEra: lastYearStats[4],
    //           lastYearAvgWhip: lastYearStats[5]
    //         }).exec(function(err, users) {
    //           console.log('success')
    //         })
    //       })
    //     }else{
    //       request('http://www.fantasypros.com/mlb/stats/' + player.firstName + '-' + player.lastName + '.php',function(error,response,data){
    //         var $ = cheerio.load(data);
    //         var img = $('.player-photo img');
    //         var headshot = img.map(function(index,element){
    //           return $(this).attr('src').trim();
    //         }).get();
    //         var results = $('.main-content .summary tr:first-child td');
    //         var stats = results.map(function(index,element){
    //           return $(this).text().trim();
    //         }).get();
    //         var past = $('.main-content .mobile-table tr td');
    //         var pastStats = past.map(function(index,element){
    //           return $(this).text().trim();
    //         }).get();
    //         var sevDayStats = pastStats.splice(17,6)
    //         var fiftDayStats = pastStats.splice(26,6)
    //         var thirDayStats = pastStats.splice(35,6)
    //         var lastYearStats = pastStats.splice(44,6)
    //         Playerdb.update({firstName:player.firstName,lastName:player.lastName},{
    //           runsK: stats[0],
    //           hrW: stats[1],
    //           rbiSv: stats[2],
    //           sbEra: stats[3],
    //           avgWhip: stats[4],
    //           alert: stats[5],
    //           img: headshot[0],
    //           sevRunsK: sevDayStats[1],
    //           sevHrW: sevDayStats[2],
    //           sevRbiSv: sevDayStats[3],
    //           sevSbEra: sevDayStats[4],
    //           sevAvgWhip: sevDayStats[5],
    //           fiftRunsK: fiftDayStats[1],
    //           fiftHrW: fiftDayStats[2],
    //           fiftRbiSv: fiftDayStats[3],
    //           fiftSbEra: fiftDayStats[4],
    //           fiftAvgWhip: fiftDayStats[5],
    //           thirRunsK: thirDayStats[1],
    //           thirHrW: thirDayStats[2],
    //           thirRbiSv: thirDayStats[3],
    //           thirSbEra: thirDayStats[4],
    //           thirAvgWhip: thirDayStats[5],
    //           lastYearRunsK: lastYearStats[1],
    //           lastYearHrW: lastYearStats[2],
    //           lastYearRbiSv: lastYearStats[3],
    //           lastYearSbEra: lastYearStats[4],
    //           lastYearAvgWhip: lastYearStats[5]
    //         }).exec(function(err, users) {
    //           console.log('success')
    //         });
    //       })
    //     }
    //   })
    // })

  getAllPlayers: function(req,res){
    Playerdb.find().then(function(data){
      res.send(data);
    });
  }


};



