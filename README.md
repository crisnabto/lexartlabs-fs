# Lexart Chatbot

This repository contains the source code for a fullstack project of a chatbot. The project involves a chatbot capable of responding to programmed commands. It is a web application developed with React and a RESTful API built with Node.js and Express. In addition, the database used is MySQL using Sequelize as ORM. This project is part of the technical challenge of the company Lexart. The chatbot application was deployed and can be found on this link: [Chatbot](https://lexartlabs-fs-rwhy.vercel.app/chatbot)

## :clipboard: Requisitos / Requirements
 `MySQL`
> Esse projeto usa MySQL / This project uses MySQL

`Node`
> Node versão 16 ou superior / Node version 16 or higher

## :wrench:  Setup

Clone o repositorio:
> Clone the repository:

```
git@github.com:crisnabto/lexartlabs-fs.git
```
Edite o arquivo .env com suas variáveis de ambiente nas pastas client e server

> Edit the .env file with your environment variables in the client and server folders

Instale as dependências em ambas as pastas:

> Install the dependencies in both folders:

```
npm install
```
Para executar a aplicação, abra dois terminais, um dentro da pasta server:

> To run the application, open two terminals, one inside the server folder:
```
npm start
```

e o outro dentro da pasta client:

> and the other inside the client folder:
```
npm start
```

## :wrench:  Instructions

- To start a conversation with the chatbot you need to type 'hello'
- After that, the bot will respond with a message requesting your username, and if you are not registered, you have the option to do so by typing 'register'
- If you enter your existing username, the bot will request your password. If your credentials match with the data stored in the database, the bot will go on and ask what you need
- If your credentials don't match, the bot will respond with an error and you can try to log in again or register
- The bot understands the word 'loan', and by typing this word it will provide you 3 options about loans, which you can click to choose
- By saying 'goodbye', the bot will store a copy of conversation on the database and provide a link to access the chat history

## :motorway:  Routes

`"/chatbot"` - homepage
`"/history"` - chat history

## :hammer_and_wrench: Tools

- [Javascript](https://javascript.com) - main language

- [MySQL](https://mysql.com) - relational database

- [Node.JS](https://nodejs.org/en/) - runtime environment

- [Express](https://expressjs.com) - Node.JS framework

- [React](https://reactjs.org/) - JavaScript framework for interactive user interface

- [Axios](https://axios-http.com/ptbr/docs/intro) - HTTP client
  
- [Sequelize](https://sequelize.org) - ORM
  
- [Railway](https://railway.app/) - Deploy Backend and Database

- [Vercel](https://vercel.com/) - Deplot Frontend

## :hammer_and_wrench: Next steps

- Refactor code by organizing it better in smaller components
- Improve login function, avoiding user to register with same name more than once

## Preview

https://github.com/crisnabto/lexartlabs-fs/assets/102383703/46f21f9e-985c-40a5-b61b-50ac0a84a5d4






