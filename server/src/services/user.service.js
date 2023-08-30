const Joi = require('joi');
const md5 = require('md5');
const jwt = require('../utils/jwt');

const { User } = require('../database/models');

const validateData = (params) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        password: Joi.string().min(6).required(),
    });

    const { error, value } = schema.validate(params);

    if (error) return { type: 400, message: 'Invalid fields' };

    return value;
};

const login = async ({ name, password }) => {
    console.log(name, password)
    const user = await User.findOne({
        where: { name },
    });

    console.log(user, 'aqui user')

    const checkPassword = md5(password);

    if (!user || user.password !== checkPassword) {
        return null;
    }

    const { password: _, ...userWithoutPassword } = user.dataValues;

    const token = jwt.createToken(userWithoutPassword);

    const { id } = userWithoutPassword;

    return ({ id, name, token });
}

const createUser = async ({ name, password }) => {
    const passwordHash = md5(password);
    const newUser = await User.create({ name, password: passwordHash })
    const { password: _, ...userNoPassword } = newUser.dataValues;
    return { status: null, message: userNoPassword }
}

const getAll = async () => {
    const users = await User.findAll();

    return users;
};

module.exports = {
    getAll,
    validateData,
    login,
    createUser
};