import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ 'views/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ 'views/Home.vue'),
    beforeEnter: (to, from, next) => {
      // 判断有没有token
      const token = window.sessionStorage.getItem('token')
      // 没有则跳转到登录页面
      if (!token) next('/login')
      next()
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
