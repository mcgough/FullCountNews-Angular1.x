/**
 * PagesController
 *
 * @description :: Server-side logic for managing Pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var cheerio = require("cheerio");
var chalk = require("chalk");
var request = require("request");

//Fills playerdb with all current players (ideally run once a week?)
var loadDB = function() {
  request("https://www.fantasypros.com/mlb/rankings/overall.php", function(
    error,
    response,
    data
  ) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(data),
        playerCells = $(".player-label .player-name"),
        length = playerCells.length - 1,
        players = [];

      //Run through player list and push names,team,position,stats url to array
      for (var key in playerCells) {
        var player = playerCells[key],
          name = player.children[0].data,
          teamPosition = player.parent.parent.attribs,
          url = playerCells[key].parent.children[0].attribs.href.split("?")[0];
        newUrl = url.replace("players", "stats");
        players.push({
          name: name,
          team: teamPosition["data-team"],
          position: teamPosition["data-pos"],
          url: newUrl
        });
        if (parseInt(key) === parseInt(length)) {
          break;
        }
      }

      //Insert players to db
      players.forEach(function(player, idx) {
        Playerdb.create(player).then(
          function(data) {
            console.log("success:", player.name);
          },
          function(err) {
            console.log(err);
          }
        );
      });
    } else {
      console.log(error, statusCode);
    }
  });
};

// loadDB();

module.exports = {
  index: function(req, res) {
    res.view("pages/index");
  }
};
