import Vue from 'vue'
import VueRouter from 'vue-router'

// TODO is jquery imported by materialize ?
// import 'jquery'
import 'materialize-css'
import '../original/vendors/Materialize/dist/css/materialize.css'
import App from './App.vue'

import router from './views'

Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
  el: 'app',
  router,
  render: h => h(App)
})
