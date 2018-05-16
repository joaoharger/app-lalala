import axios from 'axios'

const URL = 'https://cechinel.herokuapp.com/'
const TOKEN = 'r1P3aY465LVTWw7wrgkrT9QxusQvRwtP7gKhuVZVbTsPN3w+'

<<<<<<< HEAD
const server = axios.create({
    baseURL: URL,
    timeout: 5000
})

=======
>>>>>>> 78ff7ce432453fe24508e43a582d896c67362d40
const headers = {
    ['Content-Type']: 'application/json',
    ['Access-Control-Allow-Origin']: '*',
    Authorization: TOKEN
}

<<<<<<< HEAD
=======
const server = axios.create({
    baseURL: URL,
    timeout: 5000,
    headers
})

>>>>>>> 78ff7ce432453fe24508e43a582d896c67362d40
const listarProjetos = () => {
    return server.get('projeto', headers)
        .then(response => {
            const projetos = response.data.map(p => ({
                ...p,
<<<<<<< HEAD
                porcentagem_conclusao: (p.tarefas_concluidas / p.numero_tarefas * 100).toFixed(2)
=======
                _porcentagem_conclusao: (p._tarefas_finalizadas / p._tarefas_total * 100).toFixed(2)
>>>>>>> 78ff7ce432453fe24508e43a582d896c67362d40
            }))
            return Promise.resolve(projetos)
        })
}

const criarProjeto = (projeto) => {
    return server.post('projeto', projeto)
}

const atualizarProjeto = (projeto) => {
    return server.put(`projeto/${projeto.id}`, projeto)
}

const removerProjeto = (projeto) => {
    return server.delete(`projeto/${projeto.id}`)
}

const listarTarefas = (id_projeto) => {
    return server.get(`projeto/${id_projeto}/tarefas`)
        .then(response => {
            const tarefas = response.data
            // processamentos
            return Promise.resolve(tarefas)
        })
}

const criarTarefa = (tarefa) => {
    return server.post(`projeto/${tarefa.id_projeto}/tarefas`, tarefa)
}

const atualizarTarefa = (tarefa) => {
    return server.put(`projeto/${tarefa.id_projeto}/tarefas/${tarefa.id}`, tarefa)
}

const removerTarefa = (tarefa) => {
    return server.delete(`projeto/${tarefa.id_projeto}/tarefas/${tarefa.id}`)
}

export default { 
    listarProjetos, criarProjeto, atualizarProjeto, removerProjeto,
    listarTarefas, criarTarefa, atualizarTarefa, removerTarefa
}