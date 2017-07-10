// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "user" model that matches up with DB
var user = sequelize.define("user", {
  // the name of the user (a string)
  user_name: Sequelize.STRING,
  // date to enter
  date: Sequelize.STRING
});

// Syncs with DB
user.sync();

// Makes the user Model available for other files (will also create a table)
module.exports = user;