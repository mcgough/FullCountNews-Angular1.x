/**
 * UserlistController
 *
 * @description :: Server-side logic for managing userlists
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var cheerio = require("cheerio");
var request = require("request");

module.exports = {
  updateUserlistStats: function(req, res) {
    if (req.session.user) {
      Userlist.find({ userId: req.session.user.id }).then(function(data) {
        res.send(data);
      });
    }
  },

  deletePlayer: function(req, res) {
    var playerId = req.params.id,
      newList;
    Userlist.find({ userId: req.session.user.id }).then(function(data) {
      var playerList = data;
      playerList.forEach(function(object, idx) {
        var player = JSON.parse(object.player);
        if (player.id === playerId) {
          Userlist.destroy({ id: object.id }).then(function(data) {
            res.send({ status: "success", msg: "Player deleted successfully" });
          });
        }
      });
    });
  }
};
