





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
            type: DataTypes.STRING.BINARY(60),
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

// Makes the users Model available for other files (will also create a table)
module.exports = users;