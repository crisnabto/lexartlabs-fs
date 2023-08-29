const UserChatModel = (sequelize, DataTypes) => {
    const UserChat = sequelize.define('UserChat', {
        userId: DataTypes.INTEGER,
        chatId: DataTypes.INTEGER,
        message: DataTypes.STRING,
        sender: DataTypes.STRING,
    }, {
        tableName: 'user_chat',
        underscored: true,
        timestamps: false
    });

    // UserChat.associate = (models) => {
    //     models.User.belongsToMany(models.Chat, {
    //         as: 'user',
    //         foreignKey: 'userId',
    //         otherKey: '',
    //         through: UserChat
    //     });
    // }
    UserChat.associate = (models) => {
        UserChat.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
    
        UserChat.belongsTo(models.Chat, {
            foreignKey: 'chatId',
            as: 'chat'
        });
    }

    UserChat.removeAttribute('id');

    return UserChat;
};

module.exports = UserChatModel;