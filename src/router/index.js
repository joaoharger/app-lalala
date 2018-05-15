import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import Dashboard from '@/components/Dashboard'
import Projetos from '@/components/Projetos'
import QuadroTarefas from '@/components/QuadroTarefas'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/projetos',
      name: 'Projetos',
      component: Projetos
    },
    {
      path: '/projetos/:id/quadro-tarefas',
      name: 'QuadroTarefas',
      component: QuadroTarefas
    }
  ]
})
