/**
 * PagesController
 *
 * @description :: Server-side logic for managing Pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


//var loadDb = require('./lib/loadDb');

/*

setInterval(function(){

  //find one player in db that hasn't been updated yet
  // updatedAt

},5000);

*/

var cheerio = require('cheerio');
var chalk = require('chalk');
var request = require('request');



//Fills playerdb with all current players (ideally run once a week?)
var loadDB = function(){
  request('http://www.fantasypros.com/mlb/top-players-cheatsheet.php?range=ros',function(error,response,data){
    if(!error && response.statusCode == 200){

      var $ = cheerio.load(data);
      var results = $('.mpb-available');
      var players = results.map(function(index,element){
        return $(this).text().trim();
      }).get();
      players.forEach(function(player,idx){
        // console.log(player.toLowerCase().split(' ')[0].split('.').slice(1,3)[0].trim() + player.toLowerCase().split(' ')[0].split('.').slice(1,3)[1].trim());
        if(player.indexOf('SP') !== -1 && player.toLowerCase().split(' ')[0].split('.').length === 2){
          Playerdb.create({
            firstName:player.toLowerCase().split(' ')[0].split('.')[1].trim(),
            lastName:player.toLowerCase().split(' ')[1],
            teamPosition:player.split(' ')[2] + ' ' + player.split(' ')[3],
            pitcher:true
          }).then(function(data){
            // console.log(data);
          })
        }else if(player.indexOf('SP') !== -1 && player.toLowerCase().split(' ')[0].split('.').length === 4){
          Playerdb.create({
            firstName:player.toLowerCase().split(' ')[0].split('.').slice(1,3)[0].trim() + player.toLowerCase().split(' ')[0].split('.').slice(1,3)[1].trim(),
            lastName:player.toLowerCase().split(' ')[1],
            teamPosition:player.split(' ')[2] + ' ' + player.split(' ')[3],
            pitcher:true
          }).then(function(data){
            console.log(data)
          })
        }else if(player.indexOf('RP') !== -1 && player.toLowerCase().split(' ')[0].split('.').length === 2){
          Playerdb.create({
            firstName:player.toLowerCase().split(' ')[0].split('.')[1].trim(),
            lastName:player.toLowerCase().split(' ')[1],
            teamPosition:player.split(' ')[2] + ' ' + player.split(' ')[3],
            pitcher:true
          }).then(function(data){
            // console.log(data);
          })
        }else if(player.indexOf('RP') !== -1 && player.toLowerCase().split(' ')[0].split('.').length === 4){
          Playerdb.create({
            firstName:player.toLowerCase().split(' ')[0].split('.').slice(1,3)[0].trim() + player.toLowerCase().split(' ')[0].split('.').slice(1,3)[1].trim(),
            lastName:player.toLowerCase().split(' ')[1],
            teamPosition:player.split(' ')[2] + ' ' + player.split(' ')[3],
            pitcher:true
          }).then(function(data){
            console.log(data);
          })
        }else if(player.indexOf('RP') === -1 && player.indexOf('SP') === -1 && player.toLowerCase().split(' ')[0].split('.').length === 2){
          Playerdb.create({
            firstName:player.toLowerCase().split(' ')[0].split('.')[1].trim(),
            lastName:player.toLowerCase().split(' ')[1],
            teamPosition:player.split(' ')[2] + ' ' + player.split(' ')[3],
            pitcher:false
          }).then(function(data){
            // console.log(data);
          })
        }else if(player.indexOf('RP') === -1 && player.indexOf('SP') === -1 && player.toLowerCase().split(' ')[0].split('.').length === 4){
          Playerdb.create({
            firstName:player.toLowerCase().split(' ')[0].split('.').slice(1,3)[0].trim() + player.toLowerCase().split(' ')[0].split('.').slice(1,3)[1].trim(),
            lastName:player.toLowerCase().split(' ')[1],
            teamPosition:player.split(' ')[2] + ' ' + player.split(' ')[3],
            pitcher:false
          }).then(function(data){
            console.log(data);
          })
        }
      })
    }
  })
}

loadDB();


module.exports = {
	index: function(req,res){
    res.view('pages/index')
  }
};

