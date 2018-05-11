<template>
    <div class="row">
        <div class="col-lg-12">
            <div class="wrapper wrapper-content animated fadeInUp">
                <div class="ibox">
                    <div class="ibox-title">
                        <h5>Todos os projetos que você participa</h5>
                        <div class="ibox-tools">
                            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#criaProjeto">
                                Criar novo projeto
                            </button>
                            <div class="modal inmodal" id="criaProjeto" tabindex="-1" role="dialog" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content animated bounceInRight">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
                                            <i class="fa fa-cubes modal-icon"></i>
                                            <h4 class="modal-title">Novo projeto</h4>
                                            <p><strong>Preencha os dados do imóvel.</strong> </p>
                                        </div>
                                        <div class="modal-body text-left">
                                            <div class="form-group">
                                                <label>Nome do projeto</label>
                                                <input type="text" placeholder="Nome do projeto" class="form-control">
                                            </div>
                                            <div class="form-group">
                                                <label>Padrão do apartamento</label>
                                                <input type="text" placeholder="Descreva" class="form-control">
                                            </div>
                                            <div class="form-group">
                                                <label>Padrão do prédio</label>
                                                <input type="text" placeholder="Descreva" class="form-control">
                                            </div>
                                            <div class="form-group">
                                                <label>Perfil do cliente</label>
                                                <input type="text" placeholder="Descreva" class="form-control">
                                            </div>
                                            <div class="form-group">
                                                <label>Valor da comprea</label>
                                                <input type="number" class="form-control">
                                            </div>
                                            <div class="form-group">
                                                <label>Número de garagens</label>
                                                <input type="number" class="form-control">
                                            </div>
                                            <div class="form-group">
                                                <label>Vistas</label>
                                                <select data-placeholder="Escolha" class="chosen-select"  multiple style="width:350px;" tabindex="4">
                                                    <option value="Leste">Leste</option>
                                                    <option value="Oeste">Oeste</option>
                                                    <option value="Norte">Norte</option>
                                                    <option value="Sul">Sul</option>
                                                </select>
                                            </div>
                                            <div class="form-group">
                                                <label>Posição do sol</label>

                                                    <select data-placeholder="Escolha" class="chosen-select"  multiple style="width:350px;" tabindex="4">
                                                        <option value="Leste">Leste</option>
                                                        <option value="Oeste">Oeste</option>
                                                        <option value="Norte">Norte</option>
                                                        <option value="Sul">Sul</option>
                                                    </select>
                                            </div>
                                            <div class="form-group">
                                                <label>Observações</label>
                                                <input type="text" placeholder="Descreva" class="form-control">
                                            </div>

                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-white" data-dismiss="modal">Cancelar</button>
                                            <button type="button" class="btn btn-primary">Salvar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="ibox-content">
                        <div class="row m-b-sm m-t-sm">
                            <div class="col-md-1">
                                <button type="button" id="loading-example-btn" class="btn btn-white btn-sm" ><i class="fa fa-refresh"></i> Atualizar</button>
                            </div>
                            <div class="col-md-11">
                                <div class="input-group">
                                    <input v-model="termoPesquisa" type="text" placeholder="Pesquisar" 
                                        class="input-sm form-control"> 
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-sm btn-primary"> Ir !</button> 
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="project-list">
                            <table class="table table-hover">
                                <tbody>
                                    <tr v-for="projeto in projetosFiltrados" :key="projeto._id">
                                        <td class="project-status">
                                            <span v-if="projeto.ativo" class="label label-primary">Ativo</span>
                                            <span v-else class="label label-default">Finalizado</span>
                                        </td>
                                        <td class="project-title">
                                            <span>{{projeto.nome}}</span>
                                            <br />
                                            <small>Criado em {{ projeto.data_criacao }}</small>
                                        </td>
                                        <td class="project-completion">
                                                <small>Executado: {{ projeto.porcentagem_conclusao }}%</small>
                                                <div class="progress progress-mini">
                                                    <div :style="{ width: `${projeto.porcentagem_conclusao}%` }" 
                                                        class="progress-bar"></div>
                                                </div><br>
                                            <small class="tag label label-warning">
                                                Estimativa: R${{projeto.estimativa_custo}}
                                            </small>
                                            <br /><br />
                                            <small class="tag label label-info">
                                                Fechamento: R${{projeto.custo_atual}}
                                            </small>
                                        </td>

                                        <td class="project-actions">
                                            <a href="#" class="btn btn-white btn-sm"><i class="fa fa-folder"></i> Entrar</a>
                                            <a href="#" class="btn btn-white btn-sm"><i class="fa fa-pencil"></i> Editar</a>
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
import lista_projetos from '../listaProjetos'

export default {
    components: {},
    mounted() {
        $(".chosen-select").chosen({ width: "100%" })
        this.listarProjetos()
    },
    data: () => ({
        projetos: [],
        termoPesquisa: '',
        loading: true
    }),
    computed: {
        projetosFiltrados() {
            return this.projetos.filter(
                p => p.nome.includes(this.termoPesquisa)
            )
        }
    },
    methods: {
        listarProjetos() {
            fetch('http://www.pudim.com.br/', { mode: 'no-cors' }).then(response => {
                this.projetos = lista_projetos.map(p => ({
                    ...p, 
                    porcentagem_conclusao: (p.tarefas_concluidas / p.numero_tarefas * 100).toFixed(2)
                }))
                loading: false
            })
        }
    }
}
</script>
    
<style scoped>

</style>
