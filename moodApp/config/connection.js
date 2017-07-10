// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Dependencies
var Sequelize = require("sequelize");

// local environment
var sequelize = new Sequelize("burgers", "root", "Sup3rk3y710", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 1,
    min: 0,
    idle: 10000
  }
});

// // // Creates mySQL connection using Sequelize
// var sequelize = new Sequelize("heroku_78e36a8269130c6", "b212ed4c15206e", "0168844f", {
//   host: "us-cdbr-iron-east-03.cleardb.net",
//   dialect: "mysql",
//   pool: {
//     max: 1,
//     min: 0,
//     idle: 10000
//   }
// });

// Exports the connection for other files to use
module.exports = sequelize;
