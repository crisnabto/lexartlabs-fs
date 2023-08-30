'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_chat', {
      user_id: {
        allowNull: false,
        // primaryKey: true,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'users',
          key: 'id'
        }
      },
      chat_id: {
        allowNull: false,
        // primaryKey: true,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: 'chats',
          key: 'id'
        }
      },
      message: {
        allowNull: false,
        type: Sequelize.TEXT('long')
      },
      sender: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_chat');
  }
};
