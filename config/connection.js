// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Dependencies
var Sequelize = require("sequelize");

// // local environment
// var sequelize = new Sequelize("burgers", "root", "Sup3rk3y710", {
//   host: "localhost",
//   dialect: "mysql",
//   pool: {
//     max: 1,
//     min: 0,
//     idle: 10000
//   }
// });

// // Creates mySQL connection using Sequelize
var sequelize = new Sequelize("heroku_a9c3b7ff3b5f692", "babbe505ecfb1b", "84f122c8", {
  host: "us-cdbr-iron-east-03.cleardb.net",
  dialect: "mysql",
  pool: {
    max: 1,
    min: 0,
    idle: 10000
  }
});

// Exports the connection for other files to use
module.exports = sequelize;
