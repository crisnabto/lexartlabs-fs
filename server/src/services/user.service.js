const Joi = require('joi');
const md5 = require('md5');
const jwt = require('../utils/jwt');

const { User } = require('../database/models');

const validateData = (params) => {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
    });

    const { error, value } = schema.validate(params);

    if (error) return { type: 400, message: 'Invalid fields' };

    return value;
};

const login = async ({ email, password }) => {
    const user = await User.findOne({
        where: { email },
    });

    const checkPassword = md5(password);

    if (!user || user.password !== checkPassword) {
        return null;
    }

    const { password: _, ...userWithoutPassword } = user.dataValues;

    const token = jwt.createToken(userWithoutPassword);

    const { name, id } = userWithoutPassword;

    return ({ id, email, name, token });
}

const getAll = async () => {
    const users = await User.findAll();

    return users;
};

module.exports = {
    getAll,
    validateData,
    login
};