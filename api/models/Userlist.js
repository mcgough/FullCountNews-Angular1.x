/**
* Userlist.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    url: 'string',
    name: 'string',
    team: 'string',
    position: 'string',
    runsK: 'string',
    hrW: 'string',
    rbiSv: 'string',
    sbEra: 'string',
    avgWhip: 'string',
    alert: 'string',
    pitcher: 'boolean',
    img: 'string',
    sevRunsK: 'string',
    sevHrW: 'string',
    sevRbiSv: 'string',
    sevSbEra: 'string',
    sevAvgWhip: 'string',
    fiftRunsK: 'string',
    fiftHrW: 'string',
    fiftRbiSv: 'string',
    fiftSbEra: 'string',
    fiftAvgWhip: 'string',
    thirRunsK: 'string',
    thirHrW: 'string',
    thirRbiSv: 'string',
    thirSbEra: 'string',
    thirAvgWhip: 'string',
    lastYearRunsK: 'string',
    lastYearHrW: 'string',
    lastYearRbiSv: 'string',
    lastYearSbEra: 'string',
    lastYearAvgWhip: 'string',
    user: {
      model: 'User'
    }
  },

};

