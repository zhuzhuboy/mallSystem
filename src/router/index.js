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
    },
    redirect:'/welcome',
    children:[
      {
        path:"/welcome",
        name: 'welcome',
        component: () => import(/* webpackChunkName: "about" */ 'views/Welcome.vue'),
      },
      {
        path:"/users",
        name: 'user',
        component: () => import(/* webpackChunkName: "about" */ 'views/user/User.vue'),
      },
      {
        path:"/rights",
        name: 'right',
        component: () => import(/* webpackChunkName: "about" */ 'views/power/Right.vue'),
      },
      {
        path:"/roles",
        name: 'role',
        component: () => import(/* webpackChunkName: "about" */ 'views/power/Role.vue'),
      },
      {
        path:"/categories",
        name: 'categories',
        component: () => import(/* webpackChunkName: "about" */ 'views/goods/category/GoodsCate.vue'),
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
