
/*

  FightMatrix API in NodeJS
  -------------------------
  Crawler and Parser for FightMatrix.com 

  Copyright: (c) 2015 Andrew Valish
  License: MIT, see LICENSE for more details

*/

var request = require("request");
var cheerio = require("cheerio");

//-------------------------------------------------------+
//  Get Fighter Profile Data
//  fightMatrix.get(url, callback(data));
//-------------------------------------------------------+

module.exports.getFighter = function(url, callback) {
  request(url, function(error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);

      //----------------------------------+
      //  JSON object for Fighter
      //----------------------------------+
      var fighter = {
        name: "",
        age: "",
        association: "",
        pro_debut_date: "",
        pro_record: "",
        ufc_record: "",
        big_20_record: "",
        title_bouts: "",
        octagon_time: "",
        longest_win_streak: "",
        rank_state: "",
        rankings: {
          current: [],
          highest_quarterly: [],
          all_time: "",
          historical: []
        },
        stats: {
          win_finish_pct: "",
          quality_perf_pct: "",
          combat_age: "",
          last_quality_perf: "",
          rating_points: ""
        }
      };

      // common elements
      var mainTable = $('table.tblRank').first();
      
      // Name
      $(mainTable.find('td.tdRankHead a').first()).filter(function() {
        var el = $(this);
        name = el.text();
        fighter.name = name;
      })

      // Age
      $(mainTable.find('tr:nth-child(2) table tr:nth-child(2) td:nth-child(2)')).filter(function() {
        var el = $(this);
        age = el.text();
        fighter.age = age;
      });
      
      // Rank State
      $(mainTable.find('tr:nth-child(2) table tr:first-child td:nth-child(2)')).filter(function() {
        var el = $(this);
        rank_state = el.text();
        fighter.rank_state = rank_state;
      });

      // Historical Rankings
      /*$("tr[onmouseover='TagToTip(\'hist\')'] table tr").each(function() {
        var el = $(this);
        date = el.find('td:first-child a').text();
        rank = "#" + el.find('td:nth-child(3)').text().split('#')[1];
        var ranking = {
          date: date,
          rank: rank
        };
        fighter.rankings.historical.push(ranking);
      });*/
      
      callback(fighter);
      
    }
  });
}
