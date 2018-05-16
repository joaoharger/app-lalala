<template>
    <div class="row">
        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2>Quadro de tarefas</h2>
                <ol class="breadcrumb">
                    <li>
                        <router-link to="/">Home</router-link>
                    </li>
                    <li>
                        <router-link to="/projetos">Projetos</router-link>
                    </li>
                    <li class="active">
                        <strong>{{projeto[0].nome}}</strong>
                    </li>
                </ol>
            </div>
        </div>
        <div class="wrapper wrapper-content  animated fadeInRight">
            <div class="row">
                <div class="col-lg-4">
                    <div class="ibox">
                        <div class="ibox-content">
                            <h3>Pendente</h3>
                            <p class="small">
                                <i class="fa fa-hand-o-up"></i> Arraste a tarefa entre as listas ou posições</p>
                            <div class="input-group">
                                <input v-model="nomeNovaTarefa" type="text" placeholder="Título da nova tarefa. " 
                                    class="input input-sm form-control" />
                                <span class="input-group-btn">
                                    <button id="addTarefa" type="button" class="btn btn-sm btn-white" >
                                        <i class="fa fa-plus" @click="abrirTarefa"></i> Adicionar nova terefa
                                    </button>
                                </span>
                            </div>
                            <ul v-for="tarefa in tarefasAbertas" :key="tarefa._id" class="sortable-list connectList agile-list" id="todo">
                                <li class="warning-element" :id="tarefa._id" @click="() => abrirEdicao(tarefa)">
                                    <span>{{tarefa.nome}}</span>
                                    <span> - {{tarefa.descricao}}</span>
                                    <div class="agile-detail">
                                        <a v-if="tarefa.tags[0] != null" class="pull-right btn btn-xs btn-white">{{tarefa.tags[0]}}</a>
                                        <a v-if="tarefa.tags[1] != null" class="pull-right btn btn-xs btn-white">{{tarefa.tags[1]}}</a>
                                        <a v-if="tarefa.tags[2] != null" class="pull-right btn btn-xs btn-white">{{tarefa.tags[2]}}</a>
                                        <i class="fa fa-clock-o"></i>
                                        <span v-if="tarefa.programacao != null ">{{tarefa.programacao}}</span>
                                        <span v-else class="warning">Data não definida</span>
                                        <span>| Custo efetivo: {{tarefa.custo_efetivo}} </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="ibox">
                        <div class="ibox-content">
                            <h3>Executando</h3>
                            <ul v-for="tarefa in tarefasEmAndamento" :key="tarefa._id" class="sortable-list connectList agile-list" id="inprogress">
                                <li class="warning-element" :id="tarefa._id" @click="() => abrirEdicao(tarefa)">
                                    <span>{{tarefa.nome}}</span>
                                    <span> - {{tarefa.descricao}}</span>
                                    <div class="agile-detail">
                                        <a v-if="tarefa.tags[0] != null" class="pull-right btn btn-xs btn-white">{{tarefa.tags[0]}}</a>
                                        <a v-if="tarefa.tags[1] != null" class="pull-right btn btn-xs btn-white">{{tarefa.tags[1]}}</a>
                                        <a v-if="tarefa.tags[2] != null" class="pull-right btn btn-xs btn-white">{{tarefa.tags[2]}}</a>
                                        <i class="fa fa-clock-o"></i>
                                        <span v-if="tarefa.programacao != null ">{{tarefa.programacao}}</span>
                                        <span v-else>Data não definida</span>
                                        <span>| Custo efetivo: {{tarefa.custo_efetivo}} </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="ibox">
                        <div class="ibox-content">
                            <h3>Finalizada</h3>
                            <ul v-for="tarefa in tarefasFinalizadas" :key="tarefa._id" class="sortable-list connectList agile-list" id="completed">
                                <li class="warning-element" :id="tarefa._id" @click="() => abrirEdicao(tarefa)">
                                    <span>{{tarefa.nome}}</span>
                                    <span> - {{tarefa.descricao}}</span>
                                    <div class="agile-detail">
                                        <a v-if="tarefa.tags[0] != null" class="pull-right btn btn-xs btn-white">{{tarefa.tags[0]}}</a>
                                        <a v-if="tarefa.tags[1] != null" class="pull-right btn btn-xs btn-white">{{tarefa.tags[1]}}</a>
                                        <a v-if="tarefa.tags[2] != null" class="pull-right btn btn-xs btn-white">{{tarefa.tags[2]}}</a>
                                        <i class="fa fa-clock-o"></i>
                                        <span v-if="tarefa.programacao != null ">{{tarefa.programacao}}</span>
                                        <span v-else>Data não definida</span>
                                        <span>| Custo efetivo: {{tarefa.custo_efetivo}} </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal inmodal" id="modalTarefa" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content animated bounceInRight">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <i class="fa fa-cubes modal-icon"></i>
                        <h4 class="modal-title">Nova tarefa -
                            <span>{{this.nomeNovaTarefa}}</span>
                        </h4>
                    </div>
                    <div class="modal-body text-left">
                        <form id="formTarefa" @submit="salvarTarefa()">
                            <div class="form-group">
                                <label>Nome da tarefa</label>
                                <input v-model="tarefa.nome" type="text" placeholder="Nome da tarefa" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Observações</label>
                                <input v-model="tarefa.descricao" type="text" placeholder="Descreva qualquer informação relevante" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Custo estimado</label>
                                <input v-model="tarefa.custo_estimado" type="number" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Custo efetivo</label>
                                <input v-model="tarefa.custo_efetivo" type="number" class="form-control">
                            </div>
                            <div class="form-group col-lg-4">
                                <label>Pagamento em dinheiro</label>
                                <input v-model="tarefa.pagamento_dinheiro" type="number" class="form-control">
                            </div>
                            <div class="form-group col-lg-4">
                                <label>Condição de parcelamento</label>
                                <input v-model="tarefa.condicao_parcelamento" type="text" placeholder="Ex: 30 60 90" class="form-control">
                            </div>
                            <div class="form-group col-lg-4">
                                <label>Condição de pagamento</label>
                                <input v-model="tarefa.condicao_pgto" type="text" placeholder="Ex: 500 2000 2000" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Pagamento em permuta</label>
                                <input v-model="tarefa.permuta" type="number" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Tags</label>
                                <select v-model="tarefa.tags" data-placeholder="Escolha as tags" class="chosen-select form-control" multiple tabindex="4">
                                    <option value="aguardando-instalacao">Aguardando instalação</option>
                                    <option value="aguardando-entrega">Aguardando etrega</option>
                                    <option value="programado">Programado</option>
                                    <option value="urgente">Urgente</option>
                                    <option value="aguardando-decisao">Aguardando Decisão</option>
                                    <option value="andamento">Em andamento</option>
                                    <option value="pgto-pendente">Pgto pendente</option>
                                    <option value="aguardando-orcamento">Aguardando orçamento</option>
                                    <option value="interrompido">Interrompido</option>
                                    <option value="concluido">Concluído</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Fornecedor</label>
                                <input v-model="tarefa.fornecedor" type="text" placeholder="Nome do fornecedor" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Data da entrega</label>
                                <input v-model="tarefa.programacao" type="date" class="form-control">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Cancelar</button>
                        <button form="formTarefa" type="submit" class="btn btn-primary">Salvar</button>
                    </div>
                </div>
            </div>
        </div>
    
    </div>
</template>

<script>
import api from '../api'

export default {
  mounted() {
    $(".chosen-select").chosen({ width: "100%" });

    const id_projeto = this.$route.params.id

    this.carregarProjeto(id_projeto)
    this.listarTarefas(id_projeto)    


    $("#todo, #inprogress, #completed")
      .sortable({
        connectWith: ".connectList",
        update: function(event, ui) {
          var todo = $("#todo").sortable("toArray");
          var inprogress = $("#inprogress").sortable("toArray");
          var completed = $("#completed").sortable("toArray");
          $(".output").html(
            "ToDo: " +
              window.JSON.stringify(todo) +
              "<br/>" +
              "In Progress: " +
              window.JSON.stringify(inprogress) +
              "<br/>" +
              "Completed: " +
              window.JSON.stringify(completed)
          );
        }
      })
      .disableSelection();
  },
  data: () => ({
    projeto: null,
    tarefas: [],
    termoPesquisa: "",
    nomeNovaTarefa: "",
    tarefa: {}
  }),
  computed: {
    tarefasAbertas() {
      return this.tarefas.filter(p => p.situacao === "ABERTA")
    },
    tarefasEmAndamento() {
      return this.tarefas.filter(p => p.situacao === 'EM_ANDAMENTO')
    },
    tarefasFinalizadas() {
      return this.tarefas.filter(p => p.situacao === 'FINALIZADA')
    }
  },
  methods: {
    carregarProjeto(id_projeto) {
        api.carregarProjeto(id_projeto).then(projeto => {
            this.projeto = projeto
        })
    },
    listarTarefas(id_projeto) {
        api.listarTarefas(id_projeto).then(tarefas => {
            this.tarefas = tarefas || [] //retorna array vazio caso problema ocorra
        })
    },
    salvarTarefa(event) {
        event.preventDefault()
        if (this.tarefa.id === null) {
            api.criarTarefa(this.tarefa).then(tarefa => {
                this.tarefas.post(this.tarefa)
                //exibir mensagem
                $("#modalTarefa").modal('hide')
                this.tarefa = this.tarefaVazia()
                
            })
        } else {
            api.atualizarTarefa(this.tarefa).then(tarefa => {
                const index = this.tarefa.findIndex(p => p.id === tarefa.id)
                this.tarefas[index] = tarefa
                //exibir mensagem
                console.log(this.tarefa)
                $("#modalTarefa").modal('hide')
                this.tarefa = this.tarefaVazia()
            })
        }
    },
    abrirEdicao(tarefa) {
        this.tarefa = tarefa
        $("#modalTarefa").modal('show')
    },
    abrirTarefa(){
        this.tarefa = tarefaVazia()
        $("#modalTarefa").modal('show')
    },
    tarefaVazia() {
        return {
            "_id": null,
            "id_projeto": null,
            "nome": "",
            "descricao": "",
            "custo_estimado": "",
            "custo_efetivo": "",
            "pagamento_dinheiro": "",
            "condicao_pgto": [],
            "condicao_parcelamento": [],
            "pagamento_permuta": "",
            "tags": "",
            "fornecedor": "",
            "programacao": "",
            "tipo_servico_compra": "",
            "situacao": ""
        }
    }
  }
};
</script>

<style scoped>

</style>
