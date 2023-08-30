const UserService = require('../services/user.service');

const login = async (req, res) => {
    // const { name, password, message } = await UserService.validateData(req.body);
    const { name, password } = req.body;
    console.log(req.body)

    // if (message) return res.status(400).json({ message });

    const token = await UserService.login({ name, password });

    if (token === null) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(token);
}

const registerUser = async (req, res) => {
    const { name, password } = req.body;
    const { status, message } = await UserService.createUser({ name, password });
    if (status) return res.status(status).json({ message });

    return res.status(201).json(message);
}

const getAll = async (_req, res) => {
    try {
        const users = await UserService.getAll();
        return res.status(200).json(users);
    } catch (e) {
        console.log(e.message);
        res.status(500).json({ message: 'Error when returning users' });
    }
};

const chatResponse = async (req, res) => {
    const inputMessage = req.body.message;

    let response;

    if (inputMessage.toLowerCase().includes('hello')) {
        response = {
            type: 'firstMessage',
            text: 'Hello! You must log in to start a conversation. Please, tell me your username:  '
        };
    } else if (inputMessage.toLowerCase().includes('goodbye')) {
        response = {
            type: 'text',
            text: 'See you! I hope my assistance has been helpful.'};
    } else if (inputMessage.toLowerCase().includes('loan')) {
        response = {
            type: 'options',
            text: ['Do you want to apply for a loan?', 'Loan conditions', 'Help']};
    } else {
        response = 'Sorry, I didn\'t understand your message.';
    }

    // Envia a resposta como JSON
    res.json({ response });
}

module.exports = {
    getAll,
    login,
    chatResponse,
    registerUser
};