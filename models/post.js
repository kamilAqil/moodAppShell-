
module.exports = function (sequelize, DataTypes) {
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
      allowNull: true,
    },
    userMood: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    }
  });

  Post.associate = function (models) {

    Post.belongsTo(models.users, {
      foreignKey: {
        allowNull: false
      }
    });
    
};



    // {
    //   // We're saying that we want our Author to have Posts
    //   classMethods: {
    //     associate: function(models) {
    //       // An Author (foreignKey) is required or a Post can't be made
    //       Post.belongsTo(models.users, {
    //         foreignKey: {
    //           allowNull: false
    //         }
    //       });
    //     }
    //   }
    // }
 
  return Post;
};
