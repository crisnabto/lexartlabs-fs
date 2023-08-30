const { Chat, UserChat } = require('../database/models');

const createNewChat = async (Data) => {
    const formatData = Data.chatData;
    const newChat = await Chat.create();

    formatData.forEach( async (data) => {
        await UserChat.create({
            userId: data.userId,
            chatId: newChat.id,
            message: Array.isArray(data.message) ? data.message.join(' ') : data.message,
            sender: data.sender,
        })
    });

    return newChat;
}

const getAllChats = async (id) => {
    const chats = await UserChat.findAll({
        where: { user_id: id}
    })

    return chats;
}

const getDate = async (id) => {
    const chat = await Chat.findByPk(id, {
        attributes: ['createdAt']
    });

    return chat;
}

module.exports = { createNewChat, getAllChats, getDate };
