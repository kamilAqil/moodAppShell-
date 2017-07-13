var db = require('./index.js');
module.exports = function(sequelize, DataTypes){
  var Post = sequelize.define("Post", {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
  appMood: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
  },
  userMood: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
  }
      // classMethods: {
      //   associate: function(models) {
      //     Post.belongsTo(models.user, {
      //       foreignKey: {
      //         allowNull: false
      //       }
      //     });
      //   }
      // }
  }
  );
  // Post.belongsTo(users);
  console.log(db.users);
  return Post;
};
