const express = require('express');

const routes = express.Router();

const clienteController = require('./controllers/clienteController');

+//definição das rotas para acesso mediado ao banco de dados mongoDB

routes.get("/lista", clienteController.listar);
routes.post("/cadastro", clienteController.cadastrar);
routes.post("/excluir/:id", clienteController.excluir);
routes.post("/atualizar/:id", clienteController.atualizar);
routes.get("/cliente/:nome", clienteController.buscarCliente);

module.exports = routes;