const express = require('express')

module.exports = function(server){
        
    // Definir URL bade 
    const router = express.Router()
    server.use('/api', router)

    // Rotas de Cliclos de PGTO
    const BillingCycle = require('../api/billingCycle/billingCycleService')
    BillingCycle.register(router, '/billingCycles')

    // Rota Projetos
    const Projetos = require('../api/projetoService')
    Projetos.register(router, '/projetos')

    const Tarefas = require('../api/tarefaService')
    Projetos.register(router, '/tarefas')

}