const UserService = require('../services/user.service');

const login = async (req, res) => {
    const { name, password } = req.body;

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
        res.status(500).json({ message: 'Error when returning users' });
    }
};

module.exports = {
    getAll,
    login,
    registerUser
};