<template>
          <div class="modal inmodal" tabindex="-1" role="dialog" aria-hidden="true" id="show-modal" @click="showModal = true">
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
</template>

<script>
export default {
    name: 'tarefa',
    data: {
        showModal
    },
    props: [
        'id',
        'nome',
        'observacoes',
        'custo_estimado',
        'custo_efetivo',
        'pagamento_dinheiro',
        'condicao_pgto',
        'condicao_parcelamento',
        'pagamento_permuta',
        'tags',
        'fornecedor',
        'data_entrega'
    ]
}
</script>
