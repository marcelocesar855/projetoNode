const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = require('http').Server(app); //criação do servidor http
const io = require('socket.io')(server); //criação de sockets de comunicação

mongoose.connect('mongodb://localhost:27017/admin',{ //conexão com o banco de dados
    useNewUrlParser : true
});

//definição dos recursos e configurações a serem usadas no servidor
app.use((req, res, next) => {
    req.io = io;
    return next();
});
app.use(cors());
app.use(express.json());
app.use(require('./routes'));

//inicializando servidor
server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000 :)')
});