// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'

import '../static/font-awesome/css/font-awesome.min.css'

Vue.config.productionTip = false
Vue.use(Vuex)


const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    projetos: [],
    tarefas: []
  },
  mutations: {

  },
  actions: {
    
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

