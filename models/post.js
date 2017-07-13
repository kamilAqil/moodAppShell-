module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    authorId: {
      type: DataTypes.INT,
      allowNull: false,
    }
  ,
  appMood: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
  },
  userMood: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
  },
    
      classMethods: {
        associate: function(models) {
          Post.belongsTo(models.user, {
            foreignKey: {
              allowNull: false
            }
          });
        }
      }
  }  
  );
  return Post;
};
