const express = require('express')

module.exports = function (server) {

    // Definir URL bade 
    const router = express.Router()
    server.use('/api', router)

    // Rota Projetos
    const Projetos = require('../api/projetoService')
    Projetos.register(router, '/projetos')

    // Rota tarefas
    const Tarefas = require('../api/tarefaService')
    Tarefas.register(router, '/tarefas')

}