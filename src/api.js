import axios from 'axios'

const URL = 'http://localhost:3003/api/'

const headers = {
    ['Content-Type']: 'application/json',
    ['Access-Control-Allow-Origin']: '*'
}

const server = axios.create({
    baseURL: URL,
    timeout: 5000,
    headers
})

const listarProjetos = () => {
    return server.get('projetos')
        .then(response => {
            const projetos = response.data.map(p => ({...p}))
            return Promise.resolve(projetos)
        })
}

const criarProjeto = (projeto) => {
    return server.post('projetos', projeto).then(p => Promise.resolve(p.data))
}

const atualizarProjeto = (projeto) => {
    return server.put(`projetos/${projeto._id}`, projeto).then(p => Promise.resolve(p.data))
}

const removerProjeto = (projeto) => {
    return server.delete(`projetos/${projeto._id}`)
}

const carregarProjeto = (id_projeto) => {
    return server.get(`projetos?_id=${id_projeto}`)
        .then(response => {
            const projeto = response.data[0]
            return Promise.resolve(projeto)
        })
}

const listarTarefas = (id_projeto) => {
    return server.get(`tarefas?id_projeto=${id_projeto}`)
        .then(response => {
            const tarefas = response.data
            return Promise.resolve(tarefas)
        })
}

const criarTarefa = (tarefa) => {
    //window.alert(tarefa.nome)
    return server.post('tarefas', tarefa).then(t => Promise.resolve(t.data))
}

const atualizarTarefa = (tarefa) => {
    return server.put(`tarefas/${tarefa._id}`, tarefa)
        .then(t => Promise.resolve(t.data))
}

const removerTarefa = (tarefa) => {
    return server.delete(`tarefas/${tarefa._id}`)
}

export default {
    listarProjetos, criarProjeto, atualizarProjeto, carregarProjeto, removerProjeto,
    listarTarefas, criarTarefa, atualizarTarefa, removerTarefa
}