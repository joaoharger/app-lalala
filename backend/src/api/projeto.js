const restful = require('node-restful')
const mongoose = restful.mongoose

const tarefasSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    situacao: { type: String, required: false, uppercase: true,
        enum: ['ABERTA', 'EM_ANDAMENTO', 'FINALIZADA'] },
    descricao: { type: String},
    custo_estimado: { type: Number },
    custo_efetivo: { type: Number },
    pgto_dinheiro: { type: Number },
    condicao_parcelamento: { type: String},
    condicao_pgto: { type: String},
    pgto_permuta: { type: Number },
    tags: { type: String },
    fornecedor: { type: String },
    programacao: { type: Date }
})

const projetoSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    padrao_apto: { type: String },
    padrao_predio: { type: String },
    perfil_cliente: { type: String },
    valor_compra: { type: Number, min: 0 },
    numero_garagens: { type: Number, min: 0 },
    vistas: { type: String },
    posicao_sol: { type: String },
    observacoes: { type: String },
    tarefas: [tarefasSchema]
})

module.exports = restful.model('Projetos', projetoSchema)