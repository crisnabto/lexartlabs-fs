const ChatModel = (sequelize, DataTypes) => {
    const Chat = sequelize.define('Chat', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        createdAt: {
            field: 'createdAt',
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        }
    }, {
        tableName: 'Chats',
        underscored: true,
        updatedAt: false,
        // createdAt: false,
        timestamps: false
    });

    Chat.associate = (models) => {
        models.Chat.belongsTo(models.User, {
            as: 'user', foreignKey: 'userId'
        });
    }

    return Chat;
};

module.exports = ChatModel;