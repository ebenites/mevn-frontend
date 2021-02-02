import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

import store from '../store';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/notes',
    name: 'notes',
    component: () => import(/* webpackChunkName: "about" */ '../views/Notes.vue'),
    meta: { requireAuth: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  
  const rutaProtegida = to.matched.some(record => record.meta.requireAuth);

  if(rutaProtegida && store.state.token === ''){
    // console.log(store.state.token);
    // next({ name: 'login' })
    next({ path: '/login', query: { redirect: to.fullPath } })
  }else{
    next()
  }

})

export default router
