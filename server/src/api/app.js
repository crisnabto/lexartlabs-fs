const express = require('express');
const cors = require('cors');

const User = require('../controllers/user.controller');
const Chat = require('../controllers/chat.controller');

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.static('public'));

app.post('/login', User.login);
// app.post('/chat', User.chatResponse);

app.post('/chat', Chat.createNewChat);

app.post('/register', User.registerUser)

app.get('/chat/:id', Chat.getAllChats)

app.get('/chat-date/:id', Chat.getDate)

module.exports = app;