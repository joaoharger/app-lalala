import Vue from 'vue'
import Router from 'vue-router'
import App from '@/App'
import Projetos from '@/components/Projetos'
import Dashboard from '@/components/Dashboard'
import QuadroProjeto from '@/components/Quadro-projeto'

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
      path: '/quadro-projeto',
      name: 'Quadro-projeto',
      component: QuadroProjeto
    }
  ]
})
