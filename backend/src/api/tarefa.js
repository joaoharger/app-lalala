const restful = require('node-restful')
const mongoose = restful.mongoose

const tarefaSchema = new mongoose.Schema({
    id_projeto: { type: String, required: true  },
    nome: { type: String, required: true },
    situacao: { type: String },
    descricao: { type: String},
    custo_estimado: { type: Number },
    custo_efetivo: { type: Number },
    pgto_dinheiro: { type: Number },
    condicao_parcelamento: { type: String},
    condicao_pgto: { type: String},
    pgto_permuta: { type: Number },
    tags: { type: Array },
    fornecedor: { type: String },
    programacao: { type: Date }
})


module.exports = restful.model('Tarefas', tarefaSchema)