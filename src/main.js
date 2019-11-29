import Vue from 'vue'

import infiniteScroll from 'vue-infinite-scroll'

import App from './App.vue'
import router from './router'
import store from './store'
import _ from 'lodash'

Vue.use(infiniteScroll)


Vue.config.productionTip = false
Vue.prototype._ = _

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
