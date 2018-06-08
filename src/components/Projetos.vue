<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="wrapper wrapper-content animated fadeInUp">
                <div class="ibox">
                    <div class="ibox-title">
                        <h5>Histórico de Projetos</h5>
                        <div class="ibox-tools">
                            <button type="button" class="btn btn-primary" @click="abrirCadastro" data-target="#criaProjeto">
                                Criar novo projeto
                            </button>
                            <div class="modal inmodal" id="criaProjeto" tabindex="-1" role="dialog" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content animated bounceInRight">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal">
                                                <span aria-hidden="true">&times;</span>
                                                <span class="sr-only">Close</span>
                                            </button>
                                            <i class="fa fa-cubes modal-icon"></i>
                                            <h4 class="modal-title">Novo projeto</h4>
                                            <p><strong>Preencha os dados do imóvel.</strong> </p>
                                        </div>
                                        <div class="modal-body text-left">
                                            <form id="formProjeto" @submit="salvarProjeto">
                                                <div class="form-group">
                                                    <label>Nome do projeto</label>
                                                    <input v-model="projeto.nome" type="text" placeholder="Nome do projeto" class="form-control">
                                                </div>
                                                <div class="form-group">
                                                    <label>Padrão do apartamento</label>
                                                    <input v-model="projeto.padrao_apto" type="text" placeholder="Descreva" class="form-control">
                                                </div>
                                                <div class="form-group">
                                                    <label>Padrão do prédio</label>
                                                    <input v-model="projeto.padrao_predio" type="text" placeholder="Descreva" class="form-control">
                                                </div>
                                                <div class="form-group">
                                                    <label>Perfil do cliente</label>
                                                    <input v-model="projeto.perfil_cliente" type="text" placeholder="Descreva" class="form-control">
                                                </div>
                                                <div class="form-group">
                                                    <label>Número de garagens</label>
                                                    <input v-model="projeto.garagens" type="number" class="form-control">
                                                </div>
                                                <div class="form-group">
                                                    <label>Vistas</label>
                                                    <input v-model="projeto.vista" type="text" class="form-control">
                                                </div>
                                                <div class="form-group">
                                                    <label>Posição do sol</label>
                                                    <input v-model="projeto.posicao_sol" type="text" class="form-control">
                                                </div>
                                                <div class="form-group">
                                                    <label>Observações</label>
                                                    <input v-model="projeto.observacao" placeholder="Descreva" class="form-control">
                                                </div>
                                            </form>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-white" data-dismiss="modal">Cancelar</button>
                                            <button form="formProjeto" type="submit" class="btn btn-primary">Salvar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ibox-content">
                        <div class="row m-b-sm m-t-sm">
                            <div class="col-md-12">
                                <div class="input-group">
                                    <input v-model="termoPesquisa" type="text" placeholder="Pesquisar" 
                                        class="input-sm form-control"> 
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-sm btn-primary">Buscar</button> 
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="project-list">
                            <table class="table table-hover">
                                <tbody>
                                    <tr v-for="projeto in projetosFiltrados" :key="projeto._id">
                                        <td class="project-status">
                                            <span v-if="projeto.em_andamento" class="label label-primary">Em andamento</span>
                                            <span v-else class="label label-default">Finalizado</span>
                                        </td>
                                        <td class="project-title">
                                            <span>{{ projeto.nome }}</span>
                                            <br />
                                            <small>Criado em {{ projeto.data_criacao }}</small>
                                        </td>
                                        <td class="project-completion">
                                            <small>Executado: {{ projeto._porcentagem_conclusao }}%</small>
                                            <div class="progress progress-mini">
                                                <div :style="{ width: `${projeto._porcentagem_conclusao }%` }" 
                                                    class="progress-bar">
                                                </div>
                                            </div>
                                            <br />
                                            <small class="tag label label-warning">
                                                Estimativa: R${{ projeto._estimativa_total || ' ?'}}
                                            </small>
                                            <br /><br />
                                            <small class="tag label label-info">
                                                Fechamento: R${{ projeto._fechamento_total || ' ?'}}
                                            </small>
                                            <br /><br />
                                            <small class="tag label label-danger">
                                                Custo Atual: R${{ projeto._custo_atual || ' ?'}}
                                            </small>
                                        </td>
                                        <td class="project-actions">
                                            <router-link :to="`/projetos/${projeto._id}/quadro-tarefas`" 
                                                class="btn btn-white btn-sm">
                                                <i class="fa fa-folder"></i> Entrar
                                            </router-link>
                                            <button type="button" @click="() => abrirEdicao(projeto)" 
                                                class="btn btn-white btn-sm">
                                                <i class="fa fa-pencil"></i> Editar
                                            </button>
                                            <button type="button" @click="() => removerProjeto(projeto)" 
                                                class="btn btn-white btn-sm">
                                                <i class="fa fa-delete"></i> Excluir
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../api'

const templateProjeto = {
    _id: null,
    nome: "",
    descricao: "",
    localizacao: "",
    vista: "",
    perfil_cliente: "",
    padrao_predio: "",
    garagens: 0,
    valor_compra: 0,
    padrao_apto: "",
    observacao: "",
    posicao_sol: "",
    valor_venda: 0
}

export default {
    components: {},
    mounted() {
        $(".chosen-select").chosen({ width: "100%" })
        this.listarProjetos()
        this.projeto = this.projetoVazio()
        
    },
    data: () => ({
        projetos: [],
        termoPesquisa: '',
        loading: true,
        projeto: { ...templateProjeto }
    }),
    computed: {
        projetosFiltrados() {
            return this.projetos.filter(
                p => p.nome && p.nome.toUpperCase().includes(this.termoPesquisa.toUpperCase())
            )
        }
    },
    methods: {
        listarProjetos() {
            api.listarProjetos().then(projetos => {
                this.projetos = projetos || []
                this.loading = false
            })
        },
        abrirCadastro() {
            this.projeto = this.projetoVazio()
            $("#criaProjeto").modal('show')
        },
        abrirEdicao(projeto) {
            this.projeto = projeto
            $("#criaProjeto").modal('show')
        },
        salvarProjeto(event) {
            event.preventDefault()
            if (this.projeto._id === null) {
                api.criarProjeto(this.projeto).then(projeto => {
                    this.projetos.push(projeto)
                    //exibir mensagem
                    $("#criaProjeto").modal('hide')
                    this.projeto = this.projetoVazio()
                })
            } else {
                api.atualizarProjeto(this.projeto).then(projeto => {
                    const index = this.projetos.findIndex(p => p._id === projeto._id)
                    this.projetos[index] = projeto
                    //exibir mensagem
                    $("#criaProjeto").modal('hide')
                    this.projeto = this.projetoVazio()
                    
                })
            }
        },
        removerProjeto(projeto) {
            if (confirm('Tem certeza? O projeto e suas tarefas serão excluídos permanentemente')) {
                api.removerProjeto(projeto).then(_ => {
                    this.projetos = this.projetos.filter(p => p._id !== projeto._id)
                    //exibir mensagem
                })
            }
        },
        projetoVazio() {
            return { ...templateProjeto }
        }
    }
}
</script>
    
<style scoped>

</style>
