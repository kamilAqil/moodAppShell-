module.exports = function(sequelize,DataTypes){
    var users = sequelize.define("users", {




        username: {
            type: DataTypes.STRING(15),
            allowNull: false
        },

        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                isEmail: true
            }
        },

        password: {
            type: DataTypes.STRING(60),
            allowNull: false
        }


    },

        {

            classMethods: {
                associate: function(models) {

                    Customer.hasMany(models.Post, {
                        onDelete: "cascade"
                    });
                }
            }
        }
);
return users;

// Syncs with DB
//users.sync();
}
