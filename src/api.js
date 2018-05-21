import axios from 'axios'

const URL = 'https://cechinel.herokuapp.com/'
const URL_LOCAL = 'http://localhost:3000/'
const TOKEN = 'r1P3aY465LVTWw7wrgkrT9QxusQvRwtP7gKhuVZVbTsPN3w+'

const headers = {
    ['Content-Type']: 'application/json',
    ['Access-Control-Allow-Origin']: '*',
    Authorization: TOKEN
}
const headers_local = {
    ['Content-Type']: 'application/json',
    ['Access-Control-Allow-Origin']: '*',criarTarefa
}

const server = axios.create({
    baseURL: URL,
    timeout: 5000,
    headers
})
const serverLocal = axios.create({
    baseURL: URL_LOCAL,
    timeout: 5000,
    headers_local
})

const listarProjetos = () => {
    return server.get('projeto', headers)
        .then(response => {
            const projetos = response.data.map(p => ({
                ...p,
                _porcentagem_conclusao: (p._tarefas_finalizadas / p._tarefas_total * 100).toFixed(2)
            }))
            return Promise.resolve(projetos)
        })
}

const criarProjeto = (projeto) => {
    return server.post('projeto', projeto).then(p => Promise.resolve(p.data))
}

const atualizarProjeto = (projeto) => {
    return server.put(`projeto/${projeto.id}`, projeto).then(p => Promise.resolve(p.data))
}

const removerProjeto = (projeto) => {
    return server.delete(`projeto/${projeto.id}`)
}

const carregarProjeto = (id_projeto) => {
    return server.get(`projeto/${id_projeto}`)
        .then(response => {
            const projeto = response.data[0]
            return Promise.resolve(projeto)
        })
}

const arrayReducer = (acc, item) => {
    return acc === '' ? item : `${acc},${item}`
} 

const listarTarefas = (id_projeto) => {
    return server.get(`projeto/${id_projeto}/tarefas`)
        .then(response => {
            const tarefas = response.data.map(t => ({
                ...t,
                condicao_pagamento: t.condicao_pagamento.reduce(arrayReducer, ''),
                condicao_parcelamento: t.condicao_pagamento.reduce(arrayReducer, '')
            }))
            // processamentos
            return Promise.resolve(tarefas)
        })
}

const criarTarefa = (tarefa) => {
    return server.post(`projeto/${tarefa.id_projeto}/tarefas`, {
       ...tarefa,
       tags: tarefa.tags.reduce(arrayReducer, '')
    })
    .then(t => Promise.resolve(t.data))
}

const atualizarTarefa = (tarefa) => {
    return server.put(`projeto/${tarefa.id_projeto}/tarefas/${tarefa.id}`, {
        ...tarefa,
        tags: tarefa.tags.reduce(arrayReducer, '')
     })
     .then(t => Promise.resolve(t.data))
}

const removerTarefa = (tarefa) => {
    return server.delete(`projeto/${tarefa.id_projeto}/tarefas/${tarefa.id}`)
}

// const criarTarefa = (tarefa) => {
//     return serverLocal.post(tarefas)
// }

// const atualizarTarefa = (tarefa) => {
//     return serverLocal.patch(`tarefas/${tarefa.id}`)
// }

// const removerTarefa = (tarefa) => {
//     return serverLocal.delete(`tarefas/${tarefa.id}`)
// }

export default { 
    listarProjetos, criarProjeto, atualizarProjeto, carregarProjeto, removerProjeto,
    listarTarefas, criarTarefa, atualizarTarefa, removerTarefa
}