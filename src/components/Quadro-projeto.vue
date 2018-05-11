<template>
    <div class="row">
        <div class="row wrapper border-bottom white-bg page-heading">
            <div class="col-lg-10">
                <h2>Quadro de tarefas</h2>
                <ol class="breadcrumb">
                    <li>
                        <a href="index.html">Home</a>
                    </li>
                    <li>
                        <a>Projetos</a>
                    </li>
                    <li class="active">
                        <strong>Projeto X</strong>
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
                                <input v-model="nomeNovaTarefa" type="text" placeholder="Título da nova tarefa. " class="input input-sm form-control">
                                <span class="input-group-btn">
                                    <button id="addTarefa" type="button" class="btn btn-sm btn-white" data-toggle="modal" data-target="#criaTarefa">
                                        <i class="fa fa-plus"></i> Adicionar nova terefa</button>
                                </span>
                            </div>

                            <ul v-for="tarefa in tarefasFiltradas" :key="tarefa._id" class="sortable-list connectList agile-list" id="todo">
                                <li class="warning-element" id="task1" @click="abreTarefa(tarefa)">
                                    <span>{{tarefa.nome}}</span>
                                    <span> - {{tarefa.descricao}}</span>
                                    <div class="agile-detail">
                                        <a v-if="tarefa.tags[0] != null" class="pull-right btn btn-xs btn-white">{{tarefa.tags[0]}}</a>
                                        <a v-if="tarefa.tags[1] != null" class="pull-right btn btn-xs btn-white">{{tarefa.tags[1]}}</a>
                                        <a v-if="tarefa.tags[2] != null" class="pull-right btn btn-xs btn-white">{{tarefa.tags[2]}}</a>
                                        <i class="fa fa-clock-o"></i>
                                        <span v-if="tarefa.data_entrega != null ">{{tarefa.data_entrega}}</span>
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
                            <h3>Executando</h3>

                            <ul class="sortable-list connectList agile-list" id="inprogress">
                                <li class="success-element" id="task9">
                                    Quisque venenatis ante in porta suscipit.
                                    <div class="agile-detail">
                                        <a href="#" class="pull-right btn btn-xs btn-white">Tag</a>
                                        <i class="fa fa-clock-o"></i> 12.10.2015
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

                            <ul class="sortable-list connectList agile-list" id="completed">
                                <li class="info-element" id="task16">
                                    Sometimes by accident, sometimes on purpose (injected humour and the like).
                                    <div class="agile-detail">
                                        <a href="#" class="pull-right btn btn-xs btn-white">Mark</a>
                                        <i class="fa fa-clock-o"></i> 16.11.2015
                                    </div>
                                </li>
                            
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-lg-12">
                    <h4>Serialised Output</h4>
                    <p>Serializes the sortable's item id's into an array of string.</p>
                    <div class="output p-m m white-bg"></div>
                </div>
            </div>
        </div>
        <div class="modal inmodal" id="criaTarefa" tabindex="-1" role="dialog" aria-hidden="true">
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
                        <div class="form-group">
                            <label>Observações</label>
                            <input type="text" placeholder="Descreva qualquer informação relevante" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Custo estimado</label>
                            <input type="number" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Custo efetivo</label>
                            <input type="number" class="form-control">
                        </div>
                        <div class="form-group col-lg-4">
                            <label>Pagamento em dinheiro</label>
                            <input type="number" class="form-control">
                        </div>
                        <div class="form-group col-lg-4">
                            <label>Condição de parcelamento</label>
                            <input type="text" placeholder="Ex: 30 60 90" class="form-control">
                        </div>
                        <div class="form-group col-lg-4">
                            <label>Condição de parcelamento</label>
                            <input type="text" placeholder="Ex: 500 2000 2000" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Pagamento em permuta</label>
                            <input type="number" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Tags</label>
                            <select data-placeholder="Escolha as tags" class="chosen-select form-control" multiple tabindex="4">
                                <option value="aguardando-instalacao" class="bg-info">Aguardando instalação</option>
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
                            <input type="text" placeholder="Nome do fornecedor" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Data da entrega</label>
                            <input type="date" class="form-control">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-primary">Salvar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal inmodal" id="abreTarefa" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content animated bounceInRight">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <i class="fa fa-cubes modal-icon"></i>
                        <h4 class="modal-title">TarefaX
                        </h4>
                    </div>
                    <div class="modal-body text-left">
                        <div class="form-group">
                            <label>Observações</label>
                            <input type="text" placeholder="Descreva qualquer informação relevante" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Custo estimado</label>
                            <input type="number" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Custo efetivo</label>
                            <input type="number" class="form-control">
                        </div>
                        <div class="form-group col-lg-4">
                            <label>Pagamento em dinheiro</label>
                            <input type="number" class="form-control">
                        </div>
                        <div class="form-group col-lg-4">
                            <label>Condição de parcelamento</label>
                            <input type="text" placeholder="Ex: 30 60 90" class="form-control">
                        </div>
                        <div class="form-group col-lg-4">
                            <label>Condição de parcelamento</label>
                            <input type="text" placeholder="Ex: 500 2000 2000" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Pagamento em permuta</label>
                            <input type="number" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Tags</label>
                            <select data-placeholder="Escolha as tags" class="chosen-select form-control" multiple tabindex="4">
                                <option value="aguardando-instalacao" class="bg-info">Aguardando instalação</option>
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
                            <input type="text" placeholder="Nome do fornecedor" class="form-control">
                        </div>
                        <div class="form-group">
                            <label>Data da entrega</label>
                            <input type="date" class="form-control">
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
</template>

<script>
import lista_tarefas from "../listaTarefas";

export default {
  mounted() {
    $(".chosen-select").chosen({ width: "100%" });

    this.listarTarefas();

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
    tarefas: [],
    termoPesquisa: "",
    nomeNovaTarefa: "",
    loading: true
  }),
  computed: {
    tarefasFiltradas() {
      return this.tarefas.filter(p => p.nome.includes(this.termoPesquisa));
    }
  },
  methods: {
    listarTarefas() {
      fetch("http://www.pudim.com.br/", { mode: "no-cors" }).then(response => {
        this.tarefas = lista_tarefas.map(p => ({
          ...p
        }));
        loading: false;
      });
    },
    abreTarefa(tarefa) {
      console.log(tarefa.nome);
      $('#abreTarefa').dialog()
    }
  }
};
</script>

<style scoped>

</style>
