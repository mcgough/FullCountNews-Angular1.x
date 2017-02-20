/**
 * UserlistController
 *
 * @description :: Server-side logic for managing userlists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var cheerio = require('cheerio');
var request = require('request');

module.exports = {

  updateUserlistStats: function(req,res){
    if (req.session.user) {
      Userlist.find({userId: req.session.user.id})
        .then(function(data){
          res.send(data);
        });
    }

    //   var lists = data;
    //   console.log('list', lists);
    //   var count = 0;
    //   lists.forEach(function(list,idx){
    //     if(list.firstName === 'jose' && list.lastName === 'abreu'){
    //       request('http://www.fantasypros.com/mlb/stats/jose-dariel-abreu.php',function(error,response,data){
    //         var $ = cheerio.load(data);
    //         var img = $('.player-photo img');
    //         var headshot = img.map(function(index,element){
    //           return $(this).attr('src').trim();
    //         }).get();
    //         var playerName = $('.player-name h1');
    //         var position = playerName.map(function(index,element){
    //           return $(this).text().trim();
    //         }).get();
    //         var checkPosition = function(){
    //           if(position[0] === undefined){
    //             return false
    //           }else if(position[0].indexOf('SP') !== -1 || position[0].indexOf('RP') !== -1){
    //             return true
    //           }else{
    //             return false
    //           }
    //         }
    //         var pitcher = checkPosition();
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
    //         console.log(playerName,stats)
    //         Userlist.update({firstName:list.firstName,lastName:list.lastName},{
    //           runsK: stats[0],
    //           hrW: stats[1],
    //           rbiSv: stats[2],
    //           sbEra: stats[3],
    //           avgWhip: stats[4],
    //           alert: stats[5],
    //           pitcher: pitcher,
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
    //         }).exec(function(err, users){
    //           if(err){
    //             console.log('error',err)
    //           }else {
    //             console.log(list.lastName, 'updated',stats,pitcher)
    //           }
    //         });
    //       })

    //     }else{
    //       request('http://www.fantasypros.com/mlb/stats/' + list.firstName + '-' + list.lastName + '.php',function(error,response,data){
    //         var $ = cheerio.load(data);
    //         var img = $('.player-photo img');
    //         var headshot = img.map(function(index,element){
    //           return $(this).attr('src').trim();
    //         }).get();
    //         var playerName = $('.player-name h1');
    //         var position = playerName.map(function(index,element){
    //           return $(this).text().trim();
    //         }).get();
    //         var checkPosition = function(){
    //           if(position[0] === undefined){
    //             return false
    //           }else if(position[0].indexOf('SP') !== -1 || position[0].indexOf('RP') !== -1){
    //             return true
    //           }else{
    //             return false
    //           }
    //         }
    //         var pitcher = checkPosition();
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
    //         console.log(playerName,stats)
    //         Userlist.update({firstName:list.firstName,lastName:list.lastName},{
    //           runsK: stats[0],
    //           hrW: stats[1],
    //           rbiSv: stats[2],
    //           sbEra: stats[3],
    //           avgWhip: stats[4],
    //           alert: stats[5],
    //           pitcher: pitcher,
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
    //         }).exec(function(err, users){
    //           if(err){
    //             console.log('error',err)
    //           }else {
    //             console.log(list.lastName, 'updated',stats,pitcher)
    //           }
    //         });
    //       })
    //     }
    //   })
      // Userlist.find({userId: req.session.user.id}).then(function(data){
      //   res.send(data);

      // });
    // });
  },
  deletePlayer: function(req,res) {
    console.log('!!!!',req.params);
  }
};


