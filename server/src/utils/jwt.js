require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const createToken = (data) => {
    const token = jwt.sign({ data }, secret, {
        algorithm: 'HS256'
    });
    return token;
}

module.exports = { createToken };
