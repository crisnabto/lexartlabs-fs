const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        timestamps: false
    });

    User.associate = (models) => {
        User.hasMany(models.Chat, {
            as: 'user', foreignKey: 'userId'
        });
    }

    return User;
};

module.exports = UserModel;