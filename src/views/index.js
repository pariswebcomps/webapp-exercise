import VueRouter from 'vue-router'
import List from './List.vue'
import Profile from './Profile.vue'

export const routes = [
  {
    path: '/',
    component: List
  },
  {
    path: '/profile/:id',
    component: Profile
  },
  {
    path: '/search',
    redirect: '/'
  },
  {
    path: '/list',
    redirect: '/'
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})
