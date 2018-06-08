const restful = require('node-restful')
const mongoose = restful.mongoose

const projetoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    padrao_apto: { type: String },
    padrao_predio: { type: String },
    perfil_cliente: { type: String },
    numero_garagens: { type: Number, min: 0 },
    vistas: { type: String },
    posicao_sol: { type: String },
    observacoes: { type: String },
    estimativa_custo: { type: Number },
    custo_atual: { type: Number },
    andamento: { type: Number },
    data_criacao: { type: Date}
})

module.exports = restful.model('Projetos', projetoSchema)