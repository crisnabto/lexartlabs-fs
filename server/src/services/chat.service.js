const { Chat, UserChat } = require('../database/models');

const createNewChat = async (Data) => {
    console.log(Data.chatData);
    const formatData = Data.chatData;
    const newChat = await Chat.create();
    formatData.forEach( async (data) => {
        await UserChat.create({
            userId: data.userId,
            chatId: newChat.id,
            message: data.message,
            sender: data.sender,
        })
    });

    return newChat;
}

module.exports = { createNewChat };
