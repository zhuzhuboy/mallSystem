import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'assets/css/global.css'
import 'assets/iconfont/iconfont.css'
// 这里按需引用组件
import './plugin/elementUI'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
