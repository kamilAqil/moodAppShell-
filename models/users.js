// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "users" model that matches up with DB
var users = sequelize.define("users", {
  // the name of the user (a string)
  user_name: Sequelize.STRING,
  // email
  user_email: Sequelize.STRING,
  // hash
  user_hash:Sequelize.STRING,
  // date to enter
  date: Sequelize.STRING
});

// Syncs with DB
users.sync();

// Makes the users Model available for other files (will also create a table)
module.exports = users;