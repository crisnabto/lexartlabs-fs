const ChatService = require('../services/chat.service');

const createNewChat = async (req, res) => {
    const { body } = req;
    const newChat = await ChatService.createNewChat(body);
    return res.status(201).json(newChat);
}

module.exports = { createNewChat }
