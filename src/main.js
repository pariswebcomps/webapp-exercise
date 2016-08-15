import Vue from 'vue'
// TODO is jquery imported by materialize ?
// import 'jquery'
import 'materialize-css'
import App from './App.vue'

import '../original/vendors/Materialize/dist/css/materialize.css'

/* eslint-disable no-new */
new Vue({
  el: 'app',
  render: h => h(App)
})
