import VueRouter from 'vue-router'
import List from './List.vue'
import Profile from './Profile.vue'

export const routes = [
  {
    path: '/',
    component: List
  },
  {
    path: '/profile',
    component: Profile
  }
]

export default new VueRouter({
  routes
})
