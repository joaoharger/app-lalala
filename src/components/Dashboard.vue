<template>
  <div class="wrapper wrapper-content animated fadeInRight">
    <div class="row animated fadeInDown">
        <div class="col-lg-3">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>Atividades do dia selecionado</h5>
                </div>
                <div class="ibox">
                    <div class="ibox-content">
                        <ul class="sortable-list connectList agile-list" id="todo">
                            <li class="warning-element" id="task1">
                                Simply dummy text of the printing and typesetting industry.
                                <div class="agile-detail">
                                    <a href="#" class="pull-right btn btn-xs btn-white">Tag</a>
                                    <i class="fa fa-clock-o"></i> 12.10.2015
                                </div>
                            </li>
                            <li class="success-element" id="task2">
                                Many desktop publishing packages and web page editors now use Lorem Ipsum as their default.
                                <div class="agile-detail">
                                    <a href="#" class="pull-right btn btn-xs btn-white">Mark</a>
                                    <i class="fa fa-clock-o"></i> 05.04.2015
                                </div>
                            </li>
                            <li class="info-element" id="task3">
                                Sometimes by accident, sometimes on purpose (injected humour and the like).
                                <div class="agile-detail">
                                    <a href="#" class="pull-right btn btn-xs btn-white">Mark</a>
                                    <i class="fa fa-clock-o"></i> 16.11.2015
                                </div>
                            </li>
                            <li class="danger-element" id="task4">
                                All the Lorem Ipsum generators
                                <div class="agile-detail">
                                    <a href="#" class="pull-right btn btn-xs btn-primary">Done</a>
                                    <i class="fa fa-clock-o"></i> 06.10.2015
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="widget style1 navy-bg red-bg">
                <div class="row vertical-align">
                    <div class="col-xs-2">
                        <i class="fa fa-money fa-3x"></i>
                    </div>
                    <div class="col-xs-6 text-center">
                        <h3>Previsão total de custo </h3>
                    </div>
                    <div class="col-xs-4 text-right">
                        <h2 class="font-bold">XXX</h2>
                    </div>
                </div>
            </div>
            <div class="widget style1 navy-bg yellow-bg">
                <div class="row vertical-align">
                    <div class="col-xs-2">
                        <i class="fa fa-money fa-3x"></i>
                    </div>
                    <div class="col-xs-6 text-center">
                        <h3>Custo total atual </h3>
                    </div>
                    <div class="col-xs-4 text-right">
                        <h2 class="font-bold">YYY</h2>
                    </div>
                </div>
            </div>
            <div class="widget style1  navy-bg lazur-bg">
                <div class="row vertical-align">
                    <div class="col-xs-2">
                        <i class="fa fa-pause-circle fa-3x"></i>
                    </div>
                    <div class="col-xs-6 text-center">
                        <h3>Atividades pendentes</h3>
                    </div>
                    <div class="col-xs-4 text-right">
                        <h2 class="font-bold">100</h2>
                    </div>
                </div>
            </div>
            <div class="widget style1 navy-bg ">
                <div class="row vertical-align">
                    <div class="col-xs-2">
                        <i class="fa fa-play-circle fa-3x"></i>
                    </div>
                    <div class="col-xs-6 text-center">
                        <h3>Atividades em andamento </h3>
                    </div>
                    <div class="col-xs-4 text-right">
                        <h2 class="font-bold">200</h2>
                    </div>
                </div>
            </div>
            <div class="widget style1 navy-bg red-bg ">
                <div class="row vertical-align">
                    <div class="col-xs-2">
                        <i class="fa fa-warning fa-3x"></i>
                    </div>
                    <div class="col-xs-6 text-center">
                        <h3>Atividades em atraso </h3>
                    </div>
                    <div class="col-xs-4 text-right">
                        <h2 class="font-bold">200</h2>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-lg-9">
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h5>Calendário de atividades </h5>
                </div>
                <div class="ibox-content">
                    <div id="calendar"></div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    mounted(){

$('.i-checks').iCheck({
    checkboxClass: 'icheckbox_square-green',
    radioClass: 'iradio_square-green'
});

/* initialize the external events
  -----------------------------------------------------------------*/


$('#external-events div.external-event').each(function() {

    // store data so the calendar knows to render an event upon drop
    $(this).data('event', {
        title: $.trim($(this).text()), // use the element's text as the event title
        stick: true // maintain when user navigates (see docs on the renderEvent method)
    });

    // make the event draggable using jQuery UI
    $(this).draggable({
        zIndex: 1111999,
        revert: true,      // will cause the event to go back to its
        revertDuration: 0  //  original position after the drag
    });

});


/* initialize the calendar
  -----------------------------------------------------------------*/
var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();

$('#calendar').fullCalendar({
    header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
    },
    editable: true,
    droppable: true, // this allows things to be dropped onto the calendar
    drop: function() {
        // is the "remove after drop" checkbox checked?
        if ($('#drop-remove').is(':checked')) {
            // if so, remove the element from the "Draggable Events" list
            $(this).remove();
        }
    },
    events: [
        {
            title: 'All Day Event',
            start: new Date(y, m, 1)
        },
        {
            title: 'Long Event',
            start: new Date(y, m, d-5),
            end: new Date(y, m, d-2)
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: new Date(y, m, d-3, 16, 0),
            allDay: false
        },
        {
            id: 999,
            title: 'Repeating Event',
            start: new Date(y, m, d+4, 16, 0),
            allDay: false
        },
        {
            title: 'Meeting',
            start: new Date(y, m, d, 10, 30),
            allDay: false
        },
        {
            title: 'Lunch',
            start: new Date(y, m, d, 12, 0),
            end: new Date(y, m, d, 14, 0),
            allDay: false
        },
        {
            title: 'Birthday Party',
            start: new Date(y, m, d+1, 19, 0),
            end: new Date(y, m, d+1, 22, 30),
            allDay: false
        },
        {
            title: 'Click for Google',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            url: 'http://google.com/'
        }
    ]
});
    }
}
</script>

<style>

</style>
