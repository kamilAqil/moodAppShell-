var db = require('./index.js');
module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    postID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    appMood: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    userMood: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  },
    {
      classMethods: {
        associate: function (models) {
          Post.belongsTo(models.users, {
            foreignKey: {
              allowNull: true
            }
          });
        }
      }
    });
  // Post.belongsTo(users);
  console.log(db);
  return Post;
};
