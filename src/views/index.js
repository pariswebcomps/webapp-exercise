import VueRouter from 'vue-router'
import List from './List.vue'
import Profile from './Profile.vue'
import ProfileEdit from './ProfileEdit.vue'

export const routes = [
  {
    name: 'list',
    path: '/',
    component: List
  },
  {
    name: 'profile-edit',
    path: '/profile/edit/:id',
    component: ProfileEdit
  },
  {
    name: 'profile',
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
