import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'assets/css/global.css'
import 'assets/css/resetEleUI.css'
import 'assets/iconfont/iconfont.css'

// 这里按需引用组件
import './plugin/elementUI'
// 这里倒入vue-table-width-tree-grid库
import ZkTable from 'vue-table-with-tree-grid'
Vue.component('TreeTable', ZkTable)
Vue.config.productionTip = false
Vue.prototype.$eventBus = new Vue()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
