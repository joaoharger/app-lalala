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
                        <strong>{{projeto.nome}}</strong>
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
                            <div class="input-group">
                                <span class="input-group-btn">
                                    <button @click="abrirCadastro" id="addTarefa" type="button"
                                        class="btn btn-sm btn-white" >
                                        <i class="fa fa-plus"></i> Adicionar nova tarefa
                                    </button>
                                </span>
                            </div>
                            <ul v-for="tarefa in tarefasAbertas" :key="tarefa._id" class="sortable-list connectList agile-list" id="todo">
                                <li  class="info-element" :id="tarefa._id">
                                    <button type="button" class="close" @click="(ev) => removerTarefa(ev, tarefa)">
                                        <span aria-hidden="true">&times;</span>
                                        <span class="sr-only">Close</span>
                                    </button>
                                    <div @click="() => abrirEdicao(tarefa)">
                                        <span>{{tarefa.nome}}</span>
                                        <span v-if="tarefa.descricao != `` "> - {{tarefa.descricao}}</span>
                                        <div class="agile-detail">
                                            <a v-for="tag in tarefa.tags" :key="tag" class="pull-right btn btn-xs btn-white">{{tag}}</a>
                                            <i class="fa fa-clock-o"></i>
                                            <span v-if="tarefa.programacao != null ">{{tarefa.programacao | formataData }}</span>
                                            <span v-else class="warning">Data não definida</span>
                                            <span v-if="tarefa.custo_estimado === null && tarefa.custo_efetivo === null ">| Custo estimado: N/A  </span>
                                            <span v-if="tarefa.custo_estimado != null && tarefa.custo_efetivo === null ">| Custo estimado: {{tarefa.custo_estimado}}  </span>
                                            <span v-if="tarefa.custo_efetivo != null">| Custo efetivo: {{tarefa.custo_efetivo}}  </span>
                                      </div>
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
                                <li class="warning-element" :id="tarefa._id">
                                    <button type="button" class="close" @click="(ev) => removerTarefa(ev, tarefa)">
                                        <span aria-hidden="true">&times;</span>
                                        <span class="sr-only">Close</span>
                                    </button>
                                    <div @click="() => abrirEdicao(tarefa)">
                                        <span>{{tarefa.nome}}</span>
                                        <span v-if="tarefa.descricao != `` "> - {{tarefa.descricao}}</span>
                                        <div class="agile-detail">
                                            <a v-for="tag in tarefa.tags" :key="tag" class="pull-right btn btn-xs btn-white">{{tag}}</a>
                                            <i class="fa fa-clock-o"></i>
                                            <span v-if="tarefa.programacao != null ">{{tarefa.programacao | formataData }}</span>
                                            <span v-else>Data não definida</span>
                                            <span v-if="tarefa.custo_estimado === null && tarefa.custo_efetivo === null ">| Custo estimado: N/A  </span>
                                            <span v-if="tarefa.custo_estimado != null && tarefa.custo_efetivo === null ">| Custo estimado: {{tarefa.custo_estimado}}  </span>
                                            <span v-if="tarefa.custo_efetivo != null">| Custo efetivo: {{tarefa.custo_efetivo}}  </span>
                                        </div>
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
                                <li class="success-element" :id="tarefa._id">
                                    <button type="button" class="close"  @click="(ev) => removerTarefa(ev, tarefa)">
                                        <span aria-hidden="true">&times;</span>
                                        <span class="sr-only">Close</span>
                                    </button>
                                    <div @click="() => abrirEdicao(tarefa)">
                                        <span>{{tarefa.nome}}</span>
                                        <span v-if="tarefa.descricao != `` "> - {{ tarefa.descricao}}</span>
                                        <div class="agile-detail">
                                            <a v-for="tag in tarefa.tags" :key="tag" class="pull-right btn btn-xs btn-white">{{tag}}</a>
                                            <i class="fa fa-clock-o"></i>
                                            <span v-if="tarefa.programacao != null ">{{tarefa.programacao | formataData }}</span>
                                            <span v-else>Data não definida</span>
                                            <span v-if="tarefa.custo_estimado === null && tarefa.custo_efetivo === null ">| Custo estimado: N/A  </span>
                                            <span v-if="tarefa.custo_estimado != null && tarefa.custo_efetivo === null ">| Custo estimado: {{tarefa.custo_estimado}}  </span>
                                            <span v-if="tarefa.custo_efetivo != null">| Custo efetivo: {{tarefa.custo_efetivo}}  </span>
                                        </div>
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
                        <h4 class="modal-title">{{ tarefa.nome ? tarefa.nome : 'Nova tarefa' }}</h4>
                    </div>
                    <div class="modal-body text-left">
                        <form id="formTarefa" @submit="salvarTarefa">
                            <div class="form-group">
                                <label>Nome da tarefa</label>
                                <input v-model="tarefa.nome" type="text" placeholder="Nome da tarefa" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Situação</label>
                                <select v-model="tarefa.situacao" class="form-control">
                                    <option value="ABERTA">Aberta</option>
                                    <option value="EM_ANDAMENTO">Em andamento</option>
                                    <option value="FINALIZADA">Finalizada</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Observações</label>
                                <input v-model="tarefa.descricao" type="text" 
                                    placeholder="Descreva qualquer informação relevante" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Custo estimado</label>
                                <input v-model="tarefa.custo_estimado" type="number" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Custo efetivo</label>
                                <input v-model="tarefa.custo_efetivo" type="number" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Pagamento em dinheiro</label>
                                <input v-model="tarefa.pagamento_dinheiro" type="number" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Condição de parcelamento</label>
                                <input v-model="tarefa.condicao_parcelamento" type="text" placeholder="Ex: 30 60 90" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Condição de pagamento</label>
                                <input v-model="tarefa.condicao_pagamento" type="text" placeholder="Ex: 500 2000 2000" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Pagamento em permuta</label>
                                <input v-model="tarefa.permuta" type="number" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Tags</label>
                                <select v-model="tarefa.tags" data-placeholder="Escolha as tags" class="form-control" multiple tabindex="4">
                                    <option value="aguardando-instalacao">Aguardando instalação</option>
                                    <option value="aguardando-entrega">Aguardando entrega</option>
                                    <option value="programado">Programado</option>
                                    <option value="urgente">Urgente</option>
                                    <option value="aguardando-decisao">Aguardando Decisão</option>
                                    <option value="andamento">Em andamento</option>
                                    <option value="pagamento-pendente">Pagamento pendente</option>
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
import api from "../api";
import moment from 'moment'

const templateTarefa = {
  nome: "",
  situacao: "ABERTA",
  descricao: "",
  custo_estimado: "",
  custo_efetivo: "",
  pgto_dinheiro: "",
  condicao_parcelamento: "",
  condicao_pgto: "",
  pgto_permuta: "",
  tags: [],
  fornecedor: "",
  programacao: ""
};

export default {
  mounted() {
    $(".chosen-select").chosen({ width: "100%" });
    const id_projeto = this.$route.params.id;
    this.carregarProjeto(id_projeto);
    this.listarTarefas(id_projeto);
  },
  data: () => ({
    projeto: {},
    tarefas: [],
    tarefa: { ...templateTarefa }
  }),
   filters:{
    formataData: function(value) {
        return moment(String(value)).format('DD-MM-YYYY')
    }
  },
  computed: {
    tarefasAbertas() {
      return this.tarefas.filter(
        p => p.situacao === null || p.situacao === "ABERTA"
      );
    },
    tarefasEmAndamento() {
      return this.tarefas.filter(p => p.situacao === "EM_ANDAMENTO");
    },
    tarefasFinalizadas() {
      return this.tarefas.filter(p => p.situacao === "FINALIZADA");
    }
  },
  methods: {
    calculaAndamento(){
        const total = 199
        const finalizada = 50
        const andamento = ( finalizada / total  * 100 ).toFixed(2)
        window.alert(andamento)
        this.projeto.andamento = andamento
        return api.atualizarProjeto(this.projeto)
    },
    carregarProjeto(id_projeto) {
      api.carregarProjeto(id_projeto).then(projeto => {
        this.projeto = projeto;
      });
    },
    listarTarefas(id_projeto) {
      api.listarTarefas(id_projeto).then(tarefas => {
        this.tarefas = tarefas || [];
      });
    },
    salvarTarefa(event) {
      event.preventDefault();
      if (!this.tarefa._id) {
        api.criarTarefa(this.tarefa).then(tarefa => {
          this.tarefas = [...this.tarefas, tarefa];
          //exibir mensagem
          $("#modalTarefa").modal("hide");
          this.tarefa = this.tarefaVazia();
        }).then(calculaAndamento());
      } else {
        api.atualizarTarefa(this.tarefa).then(tarefa => {
          const index = this.tarefas.findIndex(t => t._id === tarefa._id);
          const tarefas = this.tarefas.filter(t => t._id != tarefa._id);
          tarefas[index] = tarefa;
          //exibir mensagem
          $("#modalTarefa").modal("hide");
          this.tarefa = this.tarefaVazia();
        }).then(calculaAndamento());
      }
    },
    removerTarefa(ev, tarefa) {
      if (confirm("Deseja realmente excluir a tarefa?")) {
        api.removerTarefa(tarefa).then(() => {
          this.tarefas = this.tarefas.filter(t => t._id != tarefa._id);
        });
      }
    },
    abrirEdicao(tarefa) {
      this.tarefa = tarefa;
      $("#modalTarefa").modal("show");
    },
    abrirCadastro() {
      this.tarefa = this.tarefaVazia();
      $("#modalTarefa").modal("show");
    },
    tarefaVazia() {
      return { ...templateTarefa, id_projeto: this.projeto._id };
    }
  }
};
</script>

<style scoped>
</style>
