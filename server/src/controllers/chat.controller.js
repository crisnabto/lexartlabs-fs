const ChatService = require('../services/chat.service');

const createNewChat = async (req, res) => {
    const { body } = req;
    const newChat = await ChatService.createNewChat(body);
    return res.status(201).json(newChat);
};

const getAllChats = async (req, res) => {
    const { id } = req.params;
    const chat = await ChatService.getAllChats(id);
    return res.status(200).json(chat);
};

const getDate = async (req, res) => {
    const { id } = req.params;
    const chat = await ChatService.getDate(id);
    return res.status(200).json(chat);
}

module.exports = { createNewChat, getAllChats, getDate }
