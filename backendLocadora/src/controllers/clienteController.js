const Cliente = require('../models/cliente');

module.exports = {
    async listar(req, res) { //busca todos os clientes amrmazenados
        const clientes = await Cliente.find({}).sort("-updatedAt");
        return res.json(clientes);
    },
    async cadastrar(req, res) {  //cadastra clientes no banco
        const cliente = await Cliente.create(req.body);
        req.io.emit("cadastro", cliente);
        return res.json(cliente);
    },
    async excluir(req,res) {  //exclui clientes do banco
        const cliente = await Cliente.findByIdAndDelete(req.params.id);
        req.io.emit("excluir")
        return res.json(cliente);
    },
    async atualizar(req,res) {  //atualiza dados dos clientes ja cadastrados
        await Cliente.findByIdAndUpdate(req.params.id, req.body);
        const cliente = await Cliente.findById(req.params.id);
        req.io.emit("cliente", cliente);
        return res.json(cliente);
    },
    async buscarCliente(req,res) {  //busca clientes a partir do nome
        const clientes = await Cliente.find({nome: new RegExp('^'+req.params.nome+'$', "i")});
        return res.json(clientes);
    }
};