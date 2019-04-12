const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({ //criação do schema nao relacional de clientes
    nome : String,
    cpf : Number,
    telefone : Number,
    email : String,
    endereco : String,
    cep : Number,
    filmes : String,
});

module.exports = mongoose.model("Cliente", clienteSchema);