import 'whatwg-fetch'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'

import 'materialize-css'
import '../original/vendors/Materialize/dist/css/materialize.css'

import App from './App.vue'
import router from './views'

Vue.use(VueRouter)
Vue.use(VeeValidate)

/* eslint-disable no-new */
new Vue({
  el: 'app',
  router,
  render: h => h(App)
})
