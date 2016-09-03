import 'whatwg-fetch'
import Vue from 'vue'
import VueRouter from 'vue-router'

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

// Object.values polyfill
window.Object.values = window.Object.values || function (object) {
  return Object.keys(object)
    .filter(key => object.hasOwnProperty(key))
    .map(key => object[key])
}
